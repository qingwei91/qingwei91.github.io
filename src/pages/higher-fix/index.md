---
title: Fix point type for GADT (Scala)
date: "2019-02-08"
---

## Prerequisite
This article assumes reader already know about

* Higher Kinded type (HKT)
* Fix point type

Fix point type is a type that describes recursive data in a generic way. By abstracting over recursive data structure, we can define generic operation that works on any recursive data structure.

To learn more about HKT and Fix point type, check these links

* [Typelevel blogs for HKT](https://typelevel.org/blog/2016/08/21/hkts-moving-forward.html)
* [Rob Norris's awesome video about Fix Point Type and more](https://www.youtube.com/watch?v=7xSfLPD6tiQ)
* [Recursion Schemes in Scala](https://free.cofree.io/2017/11/13/recursion/)


## Setup

All code snippets can be run in [ammonite-repl](https://ammonite.io), for ADT definition, you need to enclose them in curly brace like `{ ...adt definiteion }` before pasting to ammonite repl.

## What this post is about?

All code in this post can be found [here](https://gist.github.com/qingwei91/8079d8c731d352259e2d6334b2135300)

This post aims to document how to retain type information of Generalized Algebraic Data Type (GADT) with Fix point type. I will illustrate by refactoring a GADT with direct recursion into another GADT without recursion, and implement `catamorphism` method for it.

This technique can be useful when the type param of your original recursive GADT needs to be propagated through the layers of your recursive data structure. It might not makes sense now, I suggest carry on reading :)

The following code snippet shows a GADT that describes how to query a recursive data (eg. JSON). It is super simple, it can only query String or Boolean by path, but we can add things like QueryByWithCondition later (not in the scope of this article).

```scala

// simplified

sealed trait Query[A]
case object QueryString extends Query[String]
case object QueryBool extends Query[Boolean]
case class QueryPath[A](path: String, next: Query[A]) extends Query[A]

// sample data

// {
//   "oh": {
//     "my": "zsh"
//   }
// }


// expression to query _.oh.my from JSON above

val expression = QueryPath("oh", QueryPath("my", QueryString))

```

As you might have notice, the `Query` ADT is recursive, and the type param `A` is recursive too, when constructing `QueryPath` which extends `Query`, the type param is determined by the `next` argument of `QueryPath`.

```scala

def typeMatch[A, B](a: A, b: B)(implicit eq: A=:=B) = ()

val queryString = QueryPath("my", QueryString)
val queryNestedString = QueryPath("my", QueryPath("oh", QueryString))

typeMatch(queryString, queryNestedString)   // compiles
```

Having a type param is useful because for any recursive query, we can know the result type statically without traversing the tree, which is a runtime property.

To apply recursion scheme, it's typical to follow the following steps

1. Refactor Recursive ADT to abstract recursion away
2. Construct recursive data structure using Fix Point Type
3. Define a Functor instance for the new Non-Recursive ADT
4. Implement (or use them from library) operations like `catamorphism` and `anamorphism` on our recursive data structure

(For common use case, we can use operations from recursion schemes library, eg. [Matryoshka](https://github.com/slamdata/matryoshka))

We are going to follow the same steps here.

### Step 1: Refactor GADT to remove recursion

The goal of this step is to remove recursion from our ADT, in our case, `QueryPath` should no longer refer to `Query` in it's definition

```scala
sealed trait QueryF[+F[_], A]
case object QueryStringF extends QueryF[Nothing, String]
case object QueryBoolF extends QueryF[Nothing, Boolean]
case class QueryPathF[F[_], A](path: String, next: F[A]) extends QueryF[F, A]
```

Above is the GADT after transformation, they are suffixed by `F` to differentiate with the previous GADT, few things to note

1. We added a Higher Kinded Type (HKT) param `F[_]` to `Query` base trait, and make it a covariant
2. On `QueryStringF`, we specify `Nothing` on the `F[_]` position, so that `QueryStringF` is a subtype of `QueryF`, same for `QueryBoolF`
3. We removed the recursion on `QueryPathF`, by abstracting `next: QueryF[A]` into `next: F[A]`, this is why we have to introduce `F[_]` on `QueryF`, so that we can abstract over the original `Query[A]` which is a HKT.

Now let's see how to form a query using the new ADT

```scala
// compiles with `-Ypartial-unification` compiler flag
val expression = QueryPathF("oh", QueryPathF("my", QueryStringF))

```

As you can see, it's similar with our previous example, which is a hint that our new generic representation is as powerful as the previous, more concrete representation in terms of expressivity.

### Step 2: Construct recursive data structure using Fix Point Type

Let's revise what Fix Point Type is, `fix` is a structure that conforms to the following rule:

`fix(f) = f(fix(f)) for all f`

The rule above is abstract, in the sense that it can apply to different domain, for example when `f` is function, then `fix` is commonly known as `Y-combinator` which describes recursive function, when `f` is a type then we get `Fix Point Type` which describe recursive type.

Below is a straight forward way to define `Fix point type` in scala:

```scala
case class Fix[F[_]](unfix: F[Fix[F]])
```

It follows the rule above in that every `Fix[F]` is equivalent to `F[Fix[F]]` for all F.

Unfortunately, we cannot use this definition of `Fix` to construct a recursive version of `QueryF`

```scala
// does not compile
Fix(QueryPathF("key", Fix(QueryStringF))
```

Because the type signature does not match, `Fix` constructor takes a type param with `* -> *` kind (commonly pronounce as Star to Star), encoded as `F[_]` in Scala, but `QueryF` has kind of `(* -> *) -> * -> *`, as it takes a `F[_]` and `A` and returns a proper type (ie. a Star type)

The solution for this problem is to create a new `HFix` type that matches the type signature of `QueryF`

```scala
case class HFix[F[_[_], _], A](unfix: F[HFix[F, ?], A])
```

This looks a bit scary, let's try to break it down

* the 1st type param `F[_[_], _]` is a type constructor that takes 2 type params, a HKT `* -> *` and a proper type `*`
* 2nd type param is just a proper type, bind to symbol `A`
* `unfix` becomes `F[HFix[F, ?], A]`, remember `F` takes a `* -> *` on 1st type param, which is the kind of `HFix[F, ?]`, the 2nd type param would then be `A` so that we propagate it across layers of recursion

I think it's worth to emphasis 2 points

1. It allows us to relate an extra type param between layers, ie. both `HFix[F[_[_], _], A]` and `F[HFix[F, ?], A]` contains type `A`
2. It abstracts over a type with this shape `(* -> *) -> * -> *`, encoded as `F[_[_], _]`, which match our `QueryF` type

Sample usage of `HFix`

```scala

def queryString = HFix(QueryStringF: QueryF[HFix[Query,?], String])
def queryBool = HFix(QueryBoolF: Query[HFix[QueryF,?], Boolean])
def queryPath[A](p: String, next: HFix[QueryF, A]) = HFix(QueryPathF(p, HFix(next)))

queryPath(
  "oh",
  queryPath(
    "my",
    queryString
  )
)

res32: HFix[QueryF, String] = HFix(QueryPathF("oh", HFix(QueryPathF("my", HFix(QueryStringF)))))

```

Cool, so we are able to create a recursive structure that express querying a string at path `oh.my`, note the type of this structure is `HFix[QueryF, String]`, which is great because we retain the knowledge that it will result in a `String`.

### Step 3: Define Functor instance for GADT

Defining a Functor instance is essential, it describe how to transform recursive data structure. Unfortunately, due to usage of GADT, a normal Functor wouldn't work, it's similar to the issue with normal `Fix`

```scala
trait Functor[F[_]]
```

Above is the interface of Functor, we can define `Functor` for any type with kind `* -> *`, but Query has a type of `(* -> *) -> * -> *` as we've seen earlier.

The solution is similar to how to solve issue with Fix, we need to define another Functor like structure that fit our type.

When using common ADT, we want a Functor instance so that we can transform the type param of our ADT, eg. `F[A] => F[B]`, but now we have `QueryF[F[_], A]`, which contains 2 type params, what should we tranform?

The most generic way would be to transform both type params, but to simplify the problem, we will only transform the 1st type param, eg. `QueryF[F[_], A] => QueryF[G[_], A]`

```scala

import $ivy.`org.typelevel::cats-core:1.6.0`

import cats.~>

trait HFunctor[F[_[_], _]] {
  def hmap[I[_], J[_]](nt: I ~> J): F[I, ?] ~> F[J, ?]
}
```

This typeclass describes the ability transform the 1st type param of an arbitrary type F, where F has kind of `(* -> *) -> * -> *`, which is what we need.

Next we need to implement an instance of `HFunctor` for `QueryF`

```scala
implicit val queryHFunctor: HFunctor[QueryF] = new HFunctor[QueryF] {
    def hmap[I[_], J[_]](nt: I ~> J): QueryF[I, ?] ~> QueryF[J, ?] = {
      new (QueryF[I, ?] ~> QueryF[J, ?]) {
        def apply[A](a: QueryF[I, A]): QueryF[J, A] = {
          a match {
            case QueryStringF            => QueryStringF
            case QueryBoolF              => QueryBoolF
            case query: QueryPathF[I, A] => QueryPathF(query.path, nt(query.next))
          }
        }
      }
    }
}
```
The implementation is relatively straight-forward, basically we try to handle every case of GADT and change the `F[_]` type param, for bottom type (ie. when F is Nothing), we dont have to change anything because we define F as covariant.

### Step 4: Implement catamorphism

Finally, after all the ceremony, we are in the position to define `catamorphism`

On a high level view, `catamorphism` is an operation that collapse a recursive structure into a single value by collapsing each layer of the data structure recursively.

It is generic in that user can define how to collapse each layer.

It looks like this

```scala

type HAlgebra[F[_[_], _], G[_]] = F[G, ?] ~> G

def hCata[F[_[_], _], G[_], I](alg: HAlgebra[F, G],hfix: HFix[F, I])(implicit F: HFunctor[F]): G[I] = {
  val inner = hfix.unfix
  val nt = F.hmap(
    new (HFix[F, ?] ~> G) {
      def apply[A](fa: HFix[F, A]): G[A] = hCata(alg, fa)
    }
  )(inner)
  alg(nt)
}

```

The flow of `hCata` is similar to normal `cata` method, by trying to peel off the outer layer of `HFix[F, I]`, we recursively dive into the inner-most layer of the recursive structure, then we apply `HAlgebra` while traversing back to the top layer.

Note: You can try to implement anamorphism and other operations :D

Now that we've define everything we need, let's try to use it.

We'll go through 2 examples, using the query we created earlier.

a) Print recursive query in a human-readable format
```scala
val nestedQuery = queryPath(
                    "oh",
                    queryPath(
                      "my",
                      queryString
                    )
                  )

// a trick to fold into String, this is interesting as it shows that
// generalized type constructor is super powerful, it can be changed into a
// more specialized type easily

type JustString[A] = String

// important part: convert each layer of query into a string
val print: HAlgebra[QueryF, JustString] = new HAlgebra[QueryF, JustString] {
  override def apply[A](fa: QueryF[JustString, A]): JustString[A] = {
    fa match {
      case QueryStringF                 => "as[String]"
      case QueryBoolF                   => "as[Bool]"
      case q: QueryPathF[JustString, A] => s"${q.path}.${q.next}"
    }
  }
}

hCata(print, nestedQuery)

// res44: JustString[String] = "oh.my.as[String]"
```

b) Convert our query description a circe Decoder

```scala

import $ivy.`io.circe::circe-parser:0.10.0`

import io.circe.Decoder

val toDecoder: HAlgebra[QueryF, Decoder] = new HAlgebra[QueryF, Decoder] {
  override def apply[A](fa: QueryF[Decoder, A]): Decoder[A] = fa match {
    case QueryBoolF   => Decoder.decodeBoolean
    case QueryStringF => Decoder.decodeString
    case q: QueryPathF[Decoder, A] =>
      Decoder.instance { cursor =>
        cursor.get(q.path)(q.next)
      }
  }
}

val decoder = hCata(toDecoder, nestedQuery)

val json = parse("""
    {
      "oh": {
        "my": "20202"
      }
    }
""").right.get

decoder.decode(json) // Right("20202")

```

I tried to use simpler examples, for more complicated examples, check these projects:

* [Xenomorph](https://github.com/nuttycom/xenomorph/blob/master/modules/argonaut/src/main/scala/xenomorph/argonaut/FromJson.scala#L51)
* [Basil](https://github.com/qingwei91/basil/blob/master/core/src/main/scala/basil/parser/JsonParse.scala#L447)

## Conclusion:

So we've gone through how to apply recursion schemes on GADT, the basic idea is similar when applying recursion schemes on ADT, the main difference is that we need to operate on higher order, eg.

* `Functor` that takes a function (`* -> *`) becomes HFunctor that takes natural transformation `(* -> *) -> (* -> *)`
* `Fix` with shape `(* -> *) -> *` becomes `HFix` with shape `((* -> *) -> (* -> *)) -> (* -> *)`
* `Algebra` with `(* -> *) -> * -> *` becomes HAlgebra `(* -> *) -> * -> * -> * -> * -> * -> *`

Notice there's a common theme, the number of star doubled in the process, I have to admit I haven't fully understand why but I hope this article is still useful.

## Credit

I learn most of the techniques described here from [Xenomorph](https://github.com/nuttycom/xenomorph) by Nuttycom, I find it interesting and thought would be good to write it down.

Thanks Nuttycomb for sharing his idea with the open source world! I also wish to thanks my coworker [Olivier](https://github.com/Baccata/) for introducing the idea of recursion scheme to me.

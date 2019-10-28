### What is Fix point combinator ?

According to wikipedia, `fix` is a higher order function that takes an input `f` and satisfy the following rule:

> fix(f) == f(fix(f))

the `f` can be a value level function, which is known as `Y-combinator`

```scala

// we cannot use `f(fix(f))` directly as it will expand infinitely
def fix[A, B](f: (A=>B)=>(A=>B)): A=>B = a => f(fix(f))(a)
```

We can use this `fix` method to factor out recursion from recursive function, below is an example of fibonacci sequence, implemented with self-recursion and `fix` respectively.

```scala

// self recursive function
def fib(n: Int): Int = {
  n match {
    case 0 => 0
    case 1 => 1
    case x => fib(n-1) + fib(n-2)
  }
}

fib(8) // 21

// this function does not contain recursion
def fibConstructor(fib: Int => Int): Int => Int = {
  n =>
    n match {
      case 0 => 0
      case 1 => 1
      case x => fib(n-1) + fib(n-2)
    }
}

val fib = fix(fibConstructor)

fib(8) // 21

```

As you can see, we can define `fibonacci` in a way that recursion only happens by `fix`.

So far, it's not clear why this is useful, I will try to answer this question in next section.

### Fix for recursive Type

As you can see, `fix` is a concept that captures recursion in isolation, it builds recursive function without knowing how the function works internally, the only constraint is that the type has to match, in earlier example, all it takes is a higher order function with `(A => B) => (A => B)` signature.

If you've programmed in Scala extensively, you will notice recursion does not only happens with functions, it is also common in Algebraic Data Type a.k.a ADT.

BinaryTree and List are 2 common examples:

```scala
sealed trait Tree
case class Leaf(v: String) extends Tree
case class Node(left: Option[Tree], right: Option[Tree]) extends Tree

sealed trait List[+A]
case object Nil extends List[Nothing]
final case class ::[A](head: A, tail: List[A]) extends List[A]
```

Note `Tree` is not a generic type but `List` is, they both represent recursive data structure by referring to itself

It's natural to ask if we could define Fix for recursive type? The answer is **Yes!**

```scala
case class Fix[F[_]](unfix: F[Fix[F]])
```

Credit: [Matryoshka](https://github.com/slamdata/matryoshka/blob/master/core/shared/src/main/scala/matryoshka/data/Fix.scala#L27)

Note that this definition of `Fix` does not fit with our recursive data type directly, to use `Fix` class, we need to change our ADT (similarly we had to change `fibonacci` function in order to use the `fix` function.

```scala
sealed trait ListR[+A, +R]
case object NilR extends ListR[Nothing, Nothing]
final case class ConsR[A, R](head: A, tail: ListR[A, R]) extends ListR[A, R]

Fix(ConsR(3, ConsR(3, ConsR(3, NilR))))
```

### Why do I need to know this ?

As it turns out, `fix` is a way to represent recursion generically, for example, below is a recursive function implemented using self recursion and `fix` respectively:

```scala

// self recursive function
def fib(n: Int): Int = {
  n match {
    case 0 => 0
    case 1 => 1
    case x => fib(n-1) + fib(n-2)
  }
}

// reuse the definition earlier
def fix[A, B](f: (A=>B)=>(A=>B)): A=>B = a => f(fix(f))(a)

def fibConstructor(fib: Int => Int): Int => Int = {
  n =>
    n match {
      case 0 => 0
      case 1 => 1
      case x => fib(n-1) + fib(n-2)
    }
}
```

Back to the original question: Why is this useful ?

Being able to represent recursion in isolation (ie. without know the function we want to recurse), means that we can define operations related to recursion in isolation, and that is useful in programming because we can abstract them into common abstractions and reuse in a more principled way.

## Fix for higher order type function

function has shape of * -> *
Higher order function **typically** has shape of (* -> *) -> (* -> *)  

Fix is a value of domain of a function where fix(f) == f(fix(f))

if f is higher order function, then the fix point has shape of (* -> *)

let hfix be a function that returns fixed point of higher order function 

hfix(hf) == hf(hfix(hf)) where

hfix: (* -> *) -> (* -> *) -> (* -> *)
hf: (* -> *) -> (* -> *)

type HFix[HF[_[_], _], A] = HF[HFix[HF, ?], A] 

---
title: "Understanding Free Monad"
date: "2019-07-14"
---

## Understanding Free Monad

I recently find out I dont really understand Free Monad, I have some high level understanding about Free Monad:

1. Free monad allow you to convert a Higher Kinded type `F[_]` to Monad for free if there exists a `Functor[F]` instance.
2. Free monad allow us to build a program as tree-like recursive data structure, when can then be interpreted into runtime effect.

but I never really understand why Free Monad (aka Free in the rest of this post) is the way it is, so I when on to read and this post is to write down what I've learned.

### How you might have re-invent Free Monad

Our goal is to figure out a way to represent program as data structure, let's use a ~simple~ cool example: `Making a half boiled egg`  

Here's a recipe to make 3 [half boiled eggs](https://www.malaysianchinesekitchen.com/half-boiled-eggs/)

1. Pour 700ml of water into a sauce pan
2. Heat the saucepan
3. Wait until water is boiled
5. Turn off the stove and put 3 eggs into the saucepan 
6. Wait for 7 minutes

Let's try to create a type to represent this process

```scala
// version 1
sealed trait HalfBoiledEgg
case object PourWaterIntoPan extends HalfBoiledEgg
case object TurnOnTheGas extends HalfBoiledEgg
case object CheckIfBoiled extends HalfBoiledEgg
case object TurnOffTheGas extends HalfBoiledEgg
case class PlaceEggInPan(quantity: Int) extends HalfBoiledEgg
case class WaitFor(minute: Int) extends HalfBoiledEgg
``` 

We converted the english instructions in recipe into an ADT in Scala, and we want to create a program by running these instructions 1 by 1.

Can we put instructions into a List? then they will express the idea of one followed by another.

```scala
List(
  PourWaterIntoPan,
  TurnOnTheGas,
  CheckIfBoiled,
  ???
)
```  

Nope, it does not work, we are stuck on step 4, because we wanted to check if the water is boiled, and react on it conditionally, meaning we need to get the result of `CheckIfBoiled` query, and make decision accordingly.

Let's try to model the idea of query, ie. to run a command and get a result back, we can specify the return type as a type parameter, when interpreted will return a value of the type. 

```scala
// version 2

sealed trait HalfBoiledEgg[A]
case object PourWaterIntoPan extends HalfBoiledEgg[Unit]
case object TurnOnTheGas extends HalfBoiledEgg[Unit]
case object CheckIfBoiled extends HalfBoiledEgg[Boolean]
case object TurnOffTheGas extends HalfBoiledEgg[Unit]
case class PlaceEggInPan(quantity: Int) extends HalfBoiledEgg[Unit]
case class WaitFor(minute: Int) extends HalfBoiledEgg[Unit]
```
Hmm, this looks neat, it captures the essence of our domain, it uses the type param to communicate return type of each operation.

Except that it lacks the ability to describe branching logic. We want to express something like this

```
  PourWaterIntoPan then 
  TurnOnTheGas then
  CheckIfBoiled then 
    if boiled do TurnOffTheGas
    else WaitFor(1) then CheckIfBoiled ...
```

We need a way to express the idea of `if Boiled do X, else do Y`, one can think of it as some form of continuation, let's model the idea of continuation into our tiny HalfBoiledEgg language.

```scala
sealed trait HalfBoiledEgg[A]
case class PourWaterIntoPan[A](next: HalfBoiledEgg[A]) extends HalfBoiledEgg[A]
case class TurnOnTheGas[A](next: HalfBoiledEgg[A]) extends HalfBoiledEgg[Unit]
case class CheckIfBoiled[A](next: Boolean => HalfBoiledEgg[A]) extends HalfBoiledEgg[A]
case class TurnOffTheGas[A](next: HalfBoiledEgg[A]) extends HalfBoiledEgg[A]
case class PlaceEggInPan[A](quantity: Int, next: HalfBoiledEgg[A]) extends HalfBoiledEgg[A]
case class WaitFor[A](minute: Int, next: HalfBoiledEgg[A]) extends HalfBoiledEgg[A]
case class Finished[A](endWith: A) extends HalfBoiledEgg[A]
```

This time we add a `next: HalfBoiledEgg[A]` to all of our previous commands, to model the idea of continuation. We can keep continuing, since that would use up too much gas and eggs, so we introduce a `Finished` type to indicate reaching an end, and we might want to end our egg cooking process differently (maybe end it with a song?) so `Finished` takes a generic parameter.

Now let's try to write our egg boiling program to see if it works

```scala
def checkUntilBoiled[A](next: HalfBoiledEgg[A]): HalfBoiledEgg[A] = CheckIfBoiled(
  boiled => if (boiled) next else {
    WaitFor(1, checkUntilBoiled(next))
  } 
) 

PourWaterIntoPan(
  TurnOnTheGas(
    checkUntilBoiled(
      TurnOffTheGas(
        PlaceEggInPan(3,
          WaitFor(7, Finished(""))
        )
      )
    )
  )
)
```

Voila, we are able to form a program that not just does `if else` branch, but we are also able to express loop by creating recursion data.

It seems like such a structure is not unique to our problem, there should be other problem domain that can be expressed in similar structure, eg. grill a burger, make a pizza etc :D

Are we able to refactor common components out into reusable pieces? 

Let's revise what we have
a) A `Finished` type to indicate the end of the program and returns a value
b) A few types that allow expressing continuation via `next`
c) A `CheckIfBoiled` type that express branching via `a:A => next`

Is there a way to define a structure that provides all 3 capabilities in a generic way, so that we can apply it to a different domain?

Ideally we wish to only write our domain language like how we did with `HalfBoiledEgg version 2`.

So we have a `F[_]` which has the kind of `* => *`, and we wish to create a construct that can convert a `F[_]` into a domain language that support the 3 capabilities mentioned.

Assuming our generic construct is called `Program`, we want a `F[_] => Program`, but we dont know what `Program` should looks like yet, let's get started

Describing the end of a program is straightforward

```scala
sealed trait Program
case class TheEnd[A](a: A) extends Program 
case class Continue[F[_], A, B](a: A, cont: A => F[B]) extends Program
case class Start[F[_], A](fa: F[A]) extends Program
```

Here's my first try

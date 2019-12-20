---
title: How to make a loop cancellable? (Scala)
date: "2019-12-08"
---

### Problem: 

I have a long running loop that I wish to cancelled if it does not finished after X seconds.

### Solution 1: Bake termination condition into our loop

It turns out to be an interesting problem for me, as I never had such need until recently.
  
The simplest solution would be to code the logic into the loop, eg.

```scala

def loop(stopsAfter: Duration) = {
  val start: Instant = Instant.now()
  while (true) {
    if (start.after(stopsAfter) < Instant.now()) {
      throw new NonTerminatingError()
    } else {
      // do your thing
    }
  }
}

```

In each loop, we can check if loop had run too long, and terminates if it had executed for too long. Below are some pros and cons of the approach

**Pros**
* Flexible on termination condition, as you can do whatever you want in your loop

**Cons**
* This is not a generic solution, for every loop that you want to cancel, you have to make similar ad-hoc change to you loop
* This is not really cancellation/interruption, as there is no way to signal the loop to stop after the loop has started

This is not as flexible as I would like it to be, let see how we can do better.

### Solution 2: Leverage IO which are cancellable 

The 1st approach isn't great, we want something more general.

It turns out some Effect types in Scala support cancellation, we will leverage [IO from cats-effect](https://typelevel.org/cats-effect/datatypes/io.html) in this article. 

IO monad has auto-cancellable `flatMap` chain if there's a logical fork in your IO, for example:

```scala
def retryIfNone(innerIO: IO[Option[Int]]): IO[Int] = {
  innerIO.flatMap {
    case Some(i) => 
      println("something") // used to show some output when testing 
      IO.pure(i)
    case None => 
      println("nothing")  // used to show some output when testing
      retryIfNone(innerIO)
  }
}
```

The method above call itself until `innerIO` return a result, this is what I meant by `flatMap` chain, it can potentially creates an infinite loop if `innerIO` never return a result.

We can then cancel an infinite loop like the following
```scala
import cats.effect._
import scala.concurrent.ExecutionContext.global

// needed to perform logical fork
implicit val cs = IO.contextShift(global)

// an infinite `flatMap` chain as the innerIO always return None
val myIO = retryIfNone(IO(None))

// perform a logical fork using `.start`, this to allow cancellation
val fiber: Fiber[IO, Int] = myIO.start.unsafeRunSync

// cancel the forked fiber
fiber.cancel.unsafeRunSync


```

With this approach, to make any arbitrary loop cancellable, we need to convert the loop into a recursive loop, and wrap each step in an IO, then we are able to cancel the loop using the approach shown above. 

**Pros**
* Applicable to all recursion loops
* Does not requires cancellation specific logic in loop

**Cons**
* Incurs non-trivial overheads, every `flatMap` incurs some cost
* It is less readable that regular loop due to the addition `flatMap` and `IO` wrapping 

This approach is suitable if you dont need great performance or if each step of your loop is already effectful to begin with, eg. a loop that repeated hit an api is a good fit 

### Custom cancellable loop

The loop I wish to cancel isn't effectful and it should be fast, thus the approach above is not sufficient, but it does give me a good idea to proceed.

IO is cancellable based on the idea of `cancellable boundary`, meaning during the evaluation of IO monad, there are certains places where it checks for cancellation signal. We can implement a looping construct with the same idea, but do it without excessive `flatMap` calls

```scala
  def cancellableLoop[F[_], LoopCtx, A](
    step: LoopCtx => Either[LoopCtx, A]
  )(init: LoopCtx)(implicit cs: ContextShift[F], monad: Monad[F]): F[A] = {

    def inner(in: LoopCtx, i: Int): F[A] = {
      if (i > 2000) {
        cs.shift.flatMap(_ => inner(in, 0))
      } else {
        step(in) match {
          case Left(cont) => inner(cont, i + 1)
          case Right(a) => a.pure[F]
        }
      }
    }
    inner(init, 0)
  }

```

Above is the solution I came up with, the idea is that by limiting user to specify the semantic of their loop using a step function, we can control the actual mechanism of loop and insert cancellation boundary in a way that is transparent to user.

Note: I am using `user` here as `api caller`

#### step: `LoopCtx => Either[LoopCtx, A]`
 
The 1st argument is a step that takes in a `LoopCtx` and either return a `LoopCtx` or a result `A`, if it returns `Right(a)`, it means we have reach the end, and `Left(nextCtx)` means we have to continue, by having `LoopCtx` as part of the result type   

Note: this is similar to the `tailRecM` method on `Monad` from `cats` library.

#### init: `LoopCtx`

The second param is `init`, this is needed as we need a starting point to be able to call our `step` param
 
#### inner loop method

This is the meat of our method, it calls the `step` function repeatedly and recursively until it finds a result, at the same time, it tracks the number of loop and injects a cancellation boundary using `ContextShift::shift` method on every 2000 loop. 

Note that the number of 2000 is picked randomly   

#### Usage

```scala
// create non-terminating loop
val cancellable = cancellableLoop[IO, Int, Int](i => {println("a step");Left(i)})(0)

val fiber = cancellable.start.unsafeRunSync
fiber.cancel.unsafeRunSync

```

Note that the `step` params map nicely to tail recursive function, so if you have a tail recursive function, it is trivial to make it cancellable using this `cancellableLoop` construct.

**Pros**
* This solution applies to many different loops
* It is faster than our previous solution as there are less flatMap 

**Cons**
* It forces user to write their algorithm in a specific form, ie. a step function

### Conclusion

The last approach is where I ended with, I haven't benchmark it performs against 2nd solution. Anecdotally, my algorithm now runs a lot faster. 

Hope you find this post useful.

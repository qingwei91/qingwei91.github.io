## Loop

Never would I thought that I am still learning about loops after being a developer for 5 years, but here we go

### How to cancel a long running loop?

In scala, this can be solve elegantly using by inserting cancellation boundary of effect type that supports cancellation

Here's an example:

```scala
  def cancellableLoop[F[_]: Concurrent, LCtx, A](step: LCtx => Either[LCtx, A])(init: LCtx): F[A] = {
    def inner(in: LCtx, i: Int): F[A] = {
      if (i > 2000) {
        in.pure[F].flatMap(x => inner(x, 0))
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

It requires user to describe their loop in a step function, which isn't the most elegant way in many cases, Monix seems to be able to support mutual tail recursion, I should check it out

### How to write backtracking algo in stack-safe way?

Backtracking algorithm is inherently not stack-safe, as the idea is to recurse, and make use of the result of recursion to determine next step, meaning your code need to access the result of recursion and make use of it, making it non-tail-rec and thus not stack safe, at least in all mainstream programming language that I know of

However, we can simulate backtracking by having heap allocated stack, in most programming language, recursion is implemented by stacking context (is it address space) one upon another, and unwind when it's done, the programming language will manage the stack for us by pushing when we recurse and pop the stack when it returns, and allow the previous stack to continue

We can make backtracking stacksafe (but not necessarily heap safe) by managing the stack ourselves on heap, in the context of method call, a stack frame typically need to have

* all data needed for 1 step of computation
* a way to return result to caller, it can be done by modifying the previous stackframe

Whenever we recurse, we push a frame onto the stack before we start the new loop, when we returns we pop the latest frame, and store the result in the top of the stack.

One can imagine a step in loop is broken into N pieces, where N is the number of recursion you have, for example 

```python
def loop(xxx):
    a = do_something()  # Region 1, preprocessing
    res_a = loop(a)     # Recursion
    if res_a is true:   # Region 2: post processing
        return b
    else :
        loop(a + 1)
```

Note that you can have as many post processing region as your algorithm need, we just need to understand the dependency relationship between each region

We can convert this loop into 

* A step function that convert a Stack into a Stack
* A while loop that execute the step function

```scala
def step(stack: Stack): Stack = {
    case empty => throw Error("Logic error, this cant be empty")
    case nonEmtpy => 
        yourLogic(nonEmpty.head) match {
            case Left(nextFrame) => stack.push(nextFrame)
            case Right(resultCB) => 
                stack.pop.head.mod(resultCB)
        }
}

type Ret[Frame] = Frame => Frame  // you return result by changing a frame

/*
Takes a frame and process

Left(f) => indicate continue recursion
Right(retF) => indicate you reach the end and the function can be used to put result back into the caller
*/
def yourLogic[F](frame: F): Either[F, Ret[F]] = ???

def loop() = {
    var stack = Stack()
    stack.push(FrameWithoutResult(params))
    while (stack.size > 1 && stack.head.noResult) {
        stack = step(stack)
    }
    stack.result
}
```

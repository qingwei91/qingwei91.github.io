---
title: Make backtracking algorithm cancellable (Scala)
date: "2019-12-18"
status: "WIP"
---

This article is a follow up for my previous post: [How to make a loop cancellable?](../), in previous post we discussed a special loop construct to make a long running loop cancellable. 

In this post, I will show how to make a recursive backtracking algorithm cancellable. I wrote this post specifically for backtracking algorithm because backtracking algorithm is not tail recursive, so it is not obvious how to apply non-tail-rec algorithm to the `cancellableLoop` we created earlier.

Side note: I bumped into this problem when implementing a [linearizability checker](https://github.com/qingwei91/lolipop/blob/test-distributed-system/core/src/test/scala/raft/proptest/checker/LinearizationCheck.scala#L52)

## What is backtracking?

Backtracking is a technique commonly found in algorithm with a huge search space, the idea is that when the algorithm is exploring the search space, if there is sufficient information to indicate a subpath and all of subsequent paths are invalid, then those path can be skip by returning the control (and possibly the error) to the previous step, this action of returning control to previous step is called backtrack. It is typically used as a form of optimization.

One way think about it is to visualize a search space as a tree, and the goal is to find specific path (or node) in the tree based on some condition, eg.

         E
        /  \ 
       A    P
      / \   / \
     O  Q  U   L

If there exhibit some inductive property that allow us to invalidate a subtree without fully exploring it, then we can prune the search space and improve efficiency.

For example, with the tree above, try to find a path starting from `root` where all nodes are vowel. We are starting with `E`, which is a vowel, next we will try the paths. If we start with the right hand path, which is `P`, notice that `P` is not a vowel, then we can skip all path after `P`, (ie. P-U, P-L), and instead try a different path.

Backtracking algorithms are normally expressed in a recursive way as the general pattern is to try a path and if it does not work, try another path, where each step is recursive. 

They are also not tail-recursive as tail recursive indicate there is no way to return control to a previous step.

The entry on wikipedia for [Backtracking](https://en.wikipedia.org/wiki/Backtracking) is very comprehensive, please refer to it if you like to know more.

### How recursion works?

Before get into solution, it is useful to revisit how recursion actually works under the hood.

Recursion works by having a function that calls itself. Function calls are typically managed by programming language using stack data structure, called the call stack. 

Each call is modelled by a stack frame, that contains the parameter of the function call, the actual function code, and a return address.  When the language runtime process a stack frame, it does something like the following:

1. Compute the result using function params and code from the stack frame
2. Pop the stackframe from the call stack
3. Return the result to the return address

A recursive function is a function that repeatedly push stackframes to the call stack, which is why it can sometime cause stack overflow.

### Cancellable backtracking algorithm

Reminder: to make an loop cancellable, we are using the function below that was discussed in [previous post](../):

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

We will try to solve the problem of 

> Finding a path in a binary tree where every node is a vowel letter.

Note: The input is a binary tree and every node has 2 children, and it is not ordered

```scala
sealed trait Tree
case class Node(value: Char, a: Tree, b: Tree) extends Tree
case class Leaf(value: Char)

/*
 * Return type is Option[List[Char]]
 * - None if there is no such path
 * - Some(ls) if there is at least 1 path that match our condition
 */
def findAllVowelPath(tree: Tree): Option[List[Char]] = {
  tree match {
    case Node(v, a, b) => 
      if (v.isVowel) {
        val resultA = findAllVowelPath(a)
        resultA match {
          case Some(vowelsA) => Some(v :: vowelsA)
          case None => 
            // point of backtracking
            findAllVowelPath(b) match {
              case Some(vowelsB) => Some(v :: vowelsB)
              case None => None
            }
        }
      } else {
        None    
      }
    case Leaf(v) => if (v.isVowel) {
      Some(v :: Nil)
    } else {
      None
    }
  }
}
```

The code above is a tree traversal algorithm, it tries to traverse a tree. When it finds a non-vowel character, it `returns the control` to the previous step by returning a None, if it find a vowel character, it will save the value, once it reach the end of a sub-tree, it returns all vowel characters collected when traversing.

Our goal is to transform this recursive method into a shape that fits `cancellableLoop` signature, which looks like this: `LoopCtx => Either[LoopCtx, A]`, as discussed earlier, this type signature expresses recursion.

We can first determine the concrete type of `A`, it is the result type we want, so it will be `Option[List[Char]]`. 

What should `LoopCtx` be? For this step function to work, `LoopCtx` needs to fulfill the following requirements:

1. Contain all data needed to perform a step, ie. it needs to have `Tree`
2. It needs to allow backtracking, remember backtracking is the action to return control and result to previous step, so that previous step can continue a different path.
   
  We can leverage the knowledge we learned from how recursion works, in essence, we need to manage the call stack using the `LoopCtx` type. 
  
  Assuming we are talking about recursion in terms of 2 steps, the `previous` step and the `current` step, then previous step is responsible to create a return address (or multiple depends on your algorithm) and current step will have to return the result using the return address provided. 
 
let's try to define the step function

```scala
sealed trait LoopContext

case class Root(tree: Tree) extends LoopContext

case class PathA(tree: Tree, prevContext: LoopContext, accVowels: List[Char]) extends LoopContext

case class PathAFailed(prevContext: LoopContext) extends LoopContext

case class PathB(tree: Tree, prevContext: LoopContext, accVowels: List[Char]) extends LoopContext

case class PathBFailed(prevContext: LoopContext) extends LoopContext
 
def step(ctx: LoopContext): Either[LoopContext, Option[List[Char]]] = {
    ctx match {
      case Root(tree) =>
        tree match {
            case Node(v, a, b) => 
              if (v.isVowel) {
                Left(PathA(a))
              } else {
                Right(None)    
              }
            case Leaf(v) => if (v.isVowel) {
              Right(Some(v :: Nil))
            } else {
              Right(None)
            }
        }
      case curr@PathA(tree, prev, accVowels) => 
        tree match {
            case Node(v, a, b) => 
              if (v.isVowel) {
                Left(PathA(a, curr, accVowels :+ v))
              } else {
                Left(PathAFailed(prev.tree))
              }
            case Leaf(v) => if (v.isVowel) {
              Right(Some(accVowels :+ v))
            } else {
              Left(PathAFailed(prev.tree))
            }
        }
      case PathAFailed(curr) =>
        curr.tree match {
          
        }
        Left(PathB(b, curr, accVowels :+ v))


    }


}
```

---
title: A failed attempt to visualize linearizability check
date: "2020-01-12"
---

Lately, I am learning `Linearizability check` algorithm, which is a kind of algorithm to check if a particular system is linearizable or not.

Informally, a system is linearizable if concurrent operations against the system can be arranged in a sequential way (called lineage) such that the lineage is **consistent** with a sequential model of the system.

That's quite a mouthful, it might be easier to grasp by using examples, say you have a system X that is capable of storing an integer value (ie. a registry), and 2 clients A, and B that can read and write the value.

Below is the operations that A and B execute respectively.

| A | B |
| --- | --- |
| Set 2 | Set 3 |
| Read 2 | Read 3 |
| Read 3 | Set 1 |

Let's assume operations within a process needs to happens in the given order, but operations between processes can happen in any order, and our goal is to find a specific order that is consistent with a sequential model, for example

`A Set 2 -> B Set 3 -> B Read 3 -> A Read 2 -> A Read 3 -> B Set 1`

is a lineage that is not correct because we should not be reading `2` at the 4th operation, it should be `3`

`A Set 2 -> A Read 2 -> B Set 3 -> B Read 3 -> A Read 3 -> B Set 1`

is a valid lineage.

If we are able to find a lineage that is correct, then the history is linearizable, note that this does not means that the system is linearizable, like all example based test, linearizable test is not able to proof there's no bug, nevertheless it is still very useful.

## How it works?

There are many different algorithms to test for linearizability.

Essentially, it is a kind of Constrained Satisfiable Problem, some smart people managed to prove that it is a NP-hard problem.

The algorithm is about how to find a valid lineage in a massive search space.

Like many search algorithm, it can leverage backtracking, here's the logic.

The input is a collection of operations called `history`, each operation contains

* request
* response
* requestor (eg. process id)

We also need a `sequential model`, which specify how the system under test should behaves if all operations happen sequentially. For the logic below, we will assume model is immutable, and every operation produces a new model

```python
def lin_check(history, model, linearized):
    if history.finished:
        return linearized
    minOps = history.getMinOps

    for minO in minOps:
        (updatedModel, response) = model.execute(minO.request)
        if response.matches(minO.response):
            # recursively check until it terminates
            res = lin_check(
                history.remove(minO), 
                updatedModel, 
                linearized.append(minO))
            if res.notErr:
                return res
            else:
                continue
        else:
            continue
    return error("Nothing works")

```
minimumOps is a list of operations that are possible to be the next operation, this means the operation cannot happen AFTER any of operation in  `history`

This is a backtracking algorithm, it performs a depth 1st search and backtracks if it reaches failure, to try the next possible operation.

One challenge is that it is hard to tell if I implemented it correctly, I decided to visualize it.

## My plan

Web is the best UI platform that I know about, thus I decided to start from there.

The idea is to visualize the search as


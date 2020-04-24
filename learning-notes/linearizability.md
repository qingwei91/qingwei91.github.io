## Linearizability

Informally linearizability is a property of single object in a system, in contrast, serializabiltiy is a property of multiple objects in a system, both are typically of interest in database management system.

### Formal definitions

In a system, one can carry out operations, defined as `op`, an operation can return a response noted as `res`.
In a multi-thread system, an operation can be executed on a thread `t`

From a thread perspective, there are 2 type of events
* a thread can initiate an operations, denoted as `t call op`
* it can received a response, denoted as `t ret res` 

A `history` is sequence of such events, and it can involves multiple threads in 1 events, eg.

* Thread 1 - Start write A
* Thread 2 - Start write B
* Thread 2 - Receive B written
* Thread 1 - Receive A not written

A history can zoom in to each threads perspective, sometimes called **thread projection**, which simply means a subset of history that belongs to a thread t, denoted as `h | t`, example of `h | thread 2`

* Thread 2 - Start write B
* Thread 2 - Receive B written

A history is **well-formed** if every thread projection of the history does not have concurrent operations, meaning the thread only starts an operation AFTER the previous operation concluded, another way of seeing it is that the event of `h | t` must alternate between `call` and `ret` type.

Example of malformed history:

* Thread 1 - Start write A
* Thread 1 - Start write B
* Thread 1 - Receive B written
* Thread 1 - Receive A not written

The above history isn't well form because it starts write B before write A concluded. Note that here we are discussing with an abstract idea of thread instead of threads in specific programming language. 
 
A history is considered **complete** if every `call` has a corresponding `ret`.

A **legal sequential history** is a history of a sequential specification object, this sounds terribly circular, but we can understand it by assuming there is an object that model the system in the same way except that it cannot handle concurrent operations, and thus all operations happen in sequence.

Two histories are **equivalent** if all of their thread projections are equivalent.

Sometimes it is convenient to think in terms of `operation call` which is a pair of corresponding `call` and `ret` event. 
Operation calls in a history can be **partially ordered**, operation call `op1` is considered < `op2` if `op1.ret` happens before `op2.call`.

#### Definition of linearizability

An object is linearizable if every complete history is linearizable and dead-lock free.  

A **complete** history is linearizable if it is equivalent to a **legal sequential history**, in other words, if our sequential specification object can produce a history S, such that S is equivalent to H, the H is linearizable.

### How to test?

Let's formularize the test of linearizability of a completed history as follow

Given a completed history `h`, return `true` if `h` is linearizable

`Wing & Gong algorithm` is a way to test, the idea is to repeat all operations in history on the Sequential Specification Object (SSO), it repeats operations with the constraint that it always maintain partial order. This means that there can be a lot of different event sequences to be applied of the SSO, and the goal is to find one that matches the input history, by matching, we means that the response return by the SSO always match the response we've got in the input history h.

In essence, linearizability test is a search problem where the state space grow exponentially with the input size.

Gavin Lowe provides a possibly more efficient algorithm called `JIT linearization`

The main differences between JIT and W&G are that

JIT is faster because JIT algorithm make use of total ordering of history, and thus it is able to reduce the size of concurrent ops and thus reduce the overall state space.

eg. if our history can guarantee that 

OpA on Thread 1 happens after RetB of Thread 2, then we can guarantee T1:OpA and T2:OpB are NOT concurrent and thus reduce the state space

The only problem is that to guarantee total order it has to rely on timestamp or some other synchronization mechanism 

### Parallelize the test

In essence, there are 2 parts when testing linearizability

1. Generate linearized history `h'` from a concurrent history `h`, where `h'` equal to `h` by some definition of equality, check `equivalent` keyword above, for each `h`, there are a big number of linearized history `h'` (TODO: figure out how to determine the size)
2. Run all the linearized histories through SSO and return true as long as we found a match, if there's no match, returns false

I think we can try to speed things up by scaling horizontally, part 2 is trivially parallelizable, if we already have all the linearized histories, we can distribute them in a cluster and have each node runs the check, but it is not clear if this is a win as it might turns out step 1 is the bottleneck, although I doubt so

It would be even better if we can parallelize step 1, it should be possible as the enumerating all possibility is a deterministic act, there should be a way only enumerate a subset of all possible history deterministically

Rough idea: by fixing total order of 1 event, we would greatly reduce the possible state space by n?

For example, given a sequence [1,2,3], we can have 3*2*1 possibilities  

1,2,3
1,3,2
2,1,3
2,3,1
3,2,1
3,1,1

If the total order of `1` is fixed as 1st element, then there are only 2 possible state

The actual algo for event history is more complicated as we need to consider partial order.

## Caveat with timeout in distributed system

If an operation timeout or failed with unknown reason, then we need to assume that such operation can complete anytime after it was initiated, or never complete, this make linearizability check exponentially expensive but is necessary to ensure correctness.

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
Operation calls in a history can be **partially ordered**, pperation call `op1` is considered < `op2` if `op1.ret` happens before `op2.call`.

#### Definition of linearizability

An object is linearizable if every complete history is linearizable and dead-lock free.  

A **complete** history is linearizable if it is equivalent to a **legal sequential history**, in other words, if our sequential specification object can produce a history S, such that S is equivalent to H, the H is linearizable.

### How to test?

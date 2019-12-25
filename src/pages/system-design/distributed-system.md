---
title: Things to consider when building distributed system
date: "2019-12-23"
---

## Define Distributed System (Informally)

In this document, `Distributed Systems` refers to **Stateful** software systems where there exists at least 1 operation that involves network call. In practice, distributed systems are normally concurrent.

## Things to consider

### Consistency model

Consistency models attempt to answer the following question:

Does our system preserve orders of operations? Under what constraints. Eg. If we write `A`, then `B` into a registry, are we guaranteed to observe the data in the same sequence?

This is important because in a stateful system, order of operations affect the state. In general, `Operation A, Operation B` is not equal to `Operation B, Operation A`. It is useful for participants of the system to be able observe operations in correct order.

There are many different consistency models, eg

* Linearizability
* Sequential consistency
* Read your writes

and many more, [aphyr](https://jepsen.io/consistency) documented a lot of them

Consistency model is likely one of the most complicated part of a distributed system, not only because the vast number of different models, but also because it tends to span across multiple operations, when talking about consistency model, we are talking about how multiple operations interact with a state, and what kind of guarantee are we giving to each of those operations.

### Synchronous vs Asynchronous

Here I am referring to the `user interaction` with our system, if user have to wait for a result, then the interaction is synchronous, if user does not need to wait for result, then it is asynchronous.

Normally, synchronous interaction implies stronger requirement in terms of latency, as we normally want to minimize wait time of our user.

Note: Different operations in a system can have different interaction mode

### Atomicity

Atomicity guarantee an operation either completed or never happen, there should be no `observable` intermediate state.

In the context of distributed system, it is not uncommon to have partial failure, eg. if an operation requires 2 stateful network call to complete it's job, what should we do if 1 call succeeded and the other failed?

This problem is fairly difficult to solve, and solution likely depends on your problem domain, possible solution includes 2PC, Saga Pattern.

### Dependency of system time

Be aware on dependency of system time, in theory distributed system should rely on system time for correctness, but it is ok to depend on system time for other purpose like live-ness or debugging. We just need to keep in mind that clock drift is real.

### Availability

Availability refers to the ability of the system to continue it's operation even when part of the system is down.

### Throughput and Latency

### Idempotency

It is typically for client to retry, thus it is crucial for api to be idempotent.

## Trade off

In general, the stronger the consistency model you need, the worse throughput, latency and availability you will get.

If you need extra mechanism to enforce atomicity, it is likely to worsen throughput, latency and availability too.

## Checklist

This is a list of questions to ask when building distributed system:

1. What happen if your system have network partition between your servers?
2. What happen if multiple operations interleave with each other? (Concurrency)
3. What happen if a message is delivered multiple times?

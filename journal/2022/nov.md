# 27 Nov 2022

A small note on stuff I've delivered in the past few months:

1. Contribute SQL Server jdbc dialect to Flink, on behalf of work.
2. Contribute JDBC filter pushdown to flink, this 2 combined reduce ongoing maintenance work.
3. Introduce CDK8s as a mechanism to manage deployment code.
4. Discover and fixes a few issues
5. Took over supporting VVP
6. Improve latency of a critical component STBK

## What have I learned?

POC is useful, as a project risk management tool.
I learned more about Flink:

Checkpoint barrier flow through the pipe, and alignment is needed by default when connect/join, which tend to happen during backpressure.
Caching is important, appears to be a big differentiator. I also learned more about Operator State vs Keyed State, in flink there are multiple layers of abstractions:

A job has the follow dimensions:

1. Operators are logic compute unit that contains logic
2. Operators runs on physical Task Manager, using the concept of slots
3. A Task Manager contains N slots, and a slot can run 1 or more operator at the same time, running multiple operators involves operator chaining, meaning to fuse/chain multiple operator into 1 where possible, it is only possible when there's no network reshuffle.

I am also exploring Incremental computation, and learn the interesting trade-off in the space:
From this blog: https://blog.janestreet.com/breaking-down-frp/

* Dynamicism
* Ease of reasoning
* Historical
* Space efficiency

Essentially we cant achieve all 4 at the same time, and need to accept different trade-off, I find it cool because its not something I've considered before.

I also learned a bit about Apache Iceberg, effectively there's a need of abstraction on top of millions of file to facilitate querying, so that file is no longer the only abstraction choice.

I tried to implement Incremental myself, got started a bit, something interesting is that building a DAG also have some trade off to consider from an API perspective:

If we want api to be easy to use, we expect to be able to branch out from a DAG to some other DAG easily, for example:

```scala
val dagA = someBuilder
dagA.outputTo(dagB)
```

This is fine until you need output branching, for example

```scala
val dagA = someBuilder
val updated = dagA.outputTo(dagB)
val updated2 = dagA.outputTo(dagC)
```

Here, the user intent is to express dagA output to both dagB and dagC, but if we want to retain pureness, ie Referential Transparency, then `updated` and `updated2` are now 2 different values, and they can be used independently.

Then it is possible that one of it is later thrown away, or it is possible that both are used, in the latter case, we need to be able combine them so that when execution happens both are executed.

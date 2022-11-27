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


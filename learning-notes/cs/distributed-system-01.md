# What I learn from Peter Alvaro?

YT: https://www.youtube.com/watch?v=R2Aa4PivG0g

## What makes distributed system hard?

1. Failure, aka message lost
2. Failure and Delay are indistinguishable
3. Non-deterministic message ordering

This makes things hard because the number of possible outcomes of a particular sequence is too high

eg.

a -> 2 -> q -> c

if we can lose message and we can reorder message, then it is possible to have

2 -> c -> q

There is a key insight that I haven't full grasp, it is something like this

> A query language makes database your semantic

Semantic is something essential, and you represent in certain way, natural language, programming language, data.

When he said database represent semantic, he likely means that the one can retrieve the semantic of a program by the act of querying  

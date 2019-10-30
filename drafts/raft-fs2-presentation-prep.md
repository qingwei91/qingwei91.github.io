# Presentation scene

## Goal
I wish to share technique on building stateful application using while aligning to functional programming principles  

## Statefulness
### Definition

Non-referential transparent
eg.

T0 - doSomething() // 20
T1 - doSomething() // 202

## Raft Algorithm

### Introduction

Raft algorithm is typically called consensus algorithm, it models replicated state machine. Client interacts with a cluster and attempt to persist some results in the cluster with certain guarantee. 

Leader base algorithm, ie all writes happen through leader. 

### Cluster Setup

3 processes (typically different node), connected, started as Follower

We can use fs2.Stream to model process, the idea is that a process is something that perform effect over time, and is potentially non-ending.

## Leader Election

Problem - Cluster needs to have a Leader before it can serves request.




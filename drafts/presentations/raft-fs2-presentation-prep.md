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

Raft algorithm is typically called consensus algorithm. The goal is to allow a number of nodes to agree on some value(s).

Client write to a raft cluster by sending request to Leader node, and Leader will then replicate the logs to the rest of the cluster.
 
### Sample Cluster Setup

<Diagram/>
3 processes (typically different node), connected, started as Follower.

Note: Process here is a generic idea, it is not platform specific

There are 2 types of inter-process RPC:
1. Leader election/selection
2. Log replications 

## Leader Election

<Diagram before/>
<Diagram after/>
Problem - Our cluster needs to have a Leader before it can serves clients. 

### Periodically check for a leader

```scala
def heartBeat[F[_]](timeout: F[FiniteDuration]): Stream[F, Unit] =
  Stream.evalMap {
        for {
          wait <- timeout
          _    <- timer.sleep()
          _    <- startElectionIfNeeded
        } yield {}
      }

```
1. recurring effect via Stream
2. check if there's a leader
3. convert to candidate if no leader
4. request for more votes to become leader

#### Introduce `Ref` for state

Core functions of Ref

```scala
trait Ref[F[_], A] {
  def get: F[A]
  def update(f: A => A): F[Unit]
  def modify[B](f: A => (A, B)): F[B]
}
```

Useful for managing concurrent in-mem state, backed by AtomicRef.

### Start Election Cycle

```scala
import cats.effect.concurrent._
case class NodeState(
  tpe: String,
  leaderId: Option[String],
  votedFor: Option[String]
)
def startElectionIfNeeded(state: Ref[F, NodeState]) = {
  for {
    st <- state.get
    startElection = st.leaderId.isEmpty && st.tpe == "follower"
    _ <- state.update(
        _.copy(
          tpe = Some("candidate"), 
          votedFor = Some("myId")
          )
        )
    responses <- askForVotes(VoteRequest(...))
  } yield {
    ...  
  }
}

def askForVotes(req: VoteRequest): F[Map[String, VoteResponse]] = ??? 

```

<Diagram for broadcasting/>

### Respond to election request

```scala
def handleRequest[F[_]](
  req: VoteRequest, 
  state: Ref[F, NodeState]): F[VoteResponse] = {
  for {
    st <- state.get
    canVote = canGrantVote(req, st)
    _ <- state.update(_.copy(votedFor = Some(req.candidate)))    
  } yield {
    VoteResponse(...)  
  }
}

def canGrantVote(req: VoteRequest, state: NodeState): Boolean = ???
```

There's a concurrent bug though

<Diagram concurrent bug/>

---
title: Build Stateful with fs2, cats-effect
status: "WIP"
---

# Stateful-ness

```jsx
def someApplication(i: Int): Int

someApplication(12) // 20

someApplication(12) // 40

```

---

## Raft Algorithm

Raft is a distributed consensus algorithm, it allows a number of processes to reach consensus on a value over asynchronous network. 

---

## Some properties of Raft

* Leader based, all writes go through Leader
* Two inter-process RPC:
    - Leader election
    - Log Replication 
---

## Raft Cluster Client Api

```jsx
RaftCluster.read();    // return null

RaftCluster.write(20);

RaftCluster.read();   // return 20

```

---

## Cluster Setup

![ThreeNodesDiagram](/someimg)

---

## Leader Election

| Initial | Desired |
| ------- | ------- |
| ![img]() | ![img]() |

---

## Leader election flow

1. Periodically run a checking process   
2. Start an election if needed:
    - Update state to become candidate, and vote for self
    - broadcast VotingRequest

---

**1a. Periodic check**

```jsx
import cats.effect.Timer
import fs2.Stream

trait RaftAlgorithm[F[_]] {

  def raftProcess[F[_]: Timer](randomTime: F[FiniteDuration]): Stream[F, Unit] = {
    Stream.repeatEval {
      for {
        wait <- randomTime
        _    <- Timer[F].sleep(wait)
        .... 
      } yield ()
    } 
  }
    
  def needElection: F[Boolean] = ???
}
```

---

**1b. Check existing cluster state**

```jsx
import cats.effect.Timer
import fs2.Stream

trait RaftAlgorithm[F[_]] {
  ...
      
  def state: Ref[F, NodeState]
    
  def needElection: F[Boolean] = {
    for {
      st <- state.get
      noLeader  = st.leader.isEmpty
      responses  <- if (noLeader) {
              state.update(_.copy(tpe = "Candidate"))
              *> getVotes
            } else {
              F.pure(Map.empty) // do nothing 
            }
       ...
    } yield {
    }  
  }
  
  def getVotes: F[Map[String, VoteRequest]] = ???
}

case class NodeState(
  tpe: String,    // Follower, Candidate, Leader
  leader: Option[String]
  ...
)

```

---

#### Ref

var on steroid, used to model mutable state that is accessed concurrently

```jsx
trait Ref[F[_]A] {
  def get: F[A]
  def update(f: A => A): F[Unit]
}
``` 


# Build Stateful with fs2, cats-effect

---

# Stateful-ness

```scala
def someApplication(i: Int): Int

someApplication(12) // 20

someApplication(12) // 40

```

---

## Raft Algorithm

Distributed consensus algorithm, inherently stateful 

---

## Properties of Raft

nnn

#### Leader based

#### all writes go through Leader

nnn

### Inter-process RPC

- Leader election
- Log Replication

nnn

### RPC Life-cycle

* Sender Initiation (Phase 1)
* Request In Flight
* Receiver Handling (Phase 2)
* Response In Flight
* Sender Completion  (Phase 3)

nnn

![rpc-life-cycle]()
Show all 5 phases, where 3 of them is our code and thus our focus

nnn

### Raft requires each process have access to persistent storage

---

## Raft Cluster Client Api

```scala
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

**Periodic check (Polling)**

```scala
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
    
  def voteRPCStart: F[Unit] = ???
}
```

---

### Vote RPC Phase 1: Initiation

```scala
trait RaftAlgorithm[F[_]] {
    
  def voteRPCStart: F[Unit] = {
    for {
      noLeader   <- checkNoLeader   
      responses  <- if (noLeader) {
              startElection 
            } else {
              F.pure(...) // do nothing 
            }
       ...
    } yield {
    }  
  }
}

```

nnn

How to implement **checkHasLeader**?

```scala

def checkHasLeader: F[Boolean] = {
  // check some state ...
}

```

nnn

```scala
case class NodeState(
  leader: Option[String]
)

def checkHasLeader(state: Ref[F, NodeState]): F[Boolean] = {
  for {
    nodeState <- state.get
  } yield {
    nodeState.leader.isDefined  
  }
}
```

nnn

#### Meet `Ref`

**var** on steroid, used to model mutable state that is accessed concurrently

```scala
trait Ref[F[_], A] {
  def get: F[A]
  def update(f: A => A): F[Unit]
}
```

nnn

Let try to implement **startElection**!

```scala
def startElection: F[Unit] = {
  /**
  * 1. Convert to Candidate, vote for self
  * 2. Request Votes from peers
  * 3. Handle response
  */
}
```

nnn

```scala
case class NodeState(
  leader: Option[String],
  tpe: String,
  votedFor: Option[String]
)

def startElection(
  selfId: String, 
  voteRequest: VoteRequest,
  state: Ref[F, NodeState]): F[Unit] = {
  for {
    // 1. Convert to Candidate
    _ <- state.update(_.copy(
          tpe = "candidate", votedFor = selfId))
    // 2. Request Votes from peers
    responses <- broadcastVoteRequest(voteRequest)
    
    // 3. Handle response
    _ <- handleResponse(responses)
  } yield {}
}

```

nnn

## Ref is useful for 

* Model mutable in-memory state
* Concurrent access to state
* Atomic modification

nnn

### Broadcast request

![broadcast req diagram]()

---

## Vote RPC Phase 2: Request Handler 

```scala
def handleVoteRequest(req: VoteRequest): F[VoteResponse] = {
  // 1. Check if requestor is more up-to-date
  // 2. Check if still has vote
  // 3a. If has vote
  //      update vote target, respond with vote granted
  // 3b. If no vote, response with vote rejected
}
``` 

nnn

```scala
def handleVoteRequest(
  req: VoteRequest, 
  state: Ref[F, NodeState]): F[VoteResponse] = {
  for {
    // 1. Check if requestor is more up-to-date
    currentState <- state.get
    isUpToDate = requestorIsUpToDate(req, currentState)
    
    // 2. Check if still has vote
    hasVote = currentState.votedFor.isEmpty
    
    // 3a. If has vote
    //      update vote target, respond with vote granted
    response <- if (isUpToDate && hasVote) {
       state.set(currentState.copy(votedFor = Some(req.nodeId)))
       .as(voteGrantedResponse)
    } else {
    // 3b. If no vote, response with vote rejected
      voteRejectedResponse.pure[F]
    }
  } yield {
    response // this will be send back to requestor   
  }
}
```

nnn

### Atomicity

```scala
for {
  state <- readSomeState
  condition = someConditionBranching
  result <- if (condition) {
                resultA
            } else {
                resultB
            }
} yield result
```

nnn

![Show interleaving of processes]()

nnn

### Solution: Locking!

```scala
for {
  _     <- grabLock
  state <- readSomeState
  condition = someConditionBranching
  result <- if (condition) {
                mutateStateA
            } else {
                mutateStateB
            }
  _     <- releaseLock
} yield result
```

### Meet MVar!

```scala
trait MVar[F[_], A] {
  // block until there's a value
  def take: F[A]
  
  // block until it is empty
  def put(a: A): F[Unit]
}
```

nnn

#### This time with Locking

```scala
def handleVoteRequest(
  req: VoteRequest, 
  state: Ref[F, NodeState],
  lock: MVar[F, Unit]): F[VoteResponse] = {
  for {
    // 1. Check if requestor is more up-to-date
    _            <- lock.take
    currentState <- state.get
    isUpToDate = requestorIsUpToDate(req, currentState)
    
    // 2. Check if still has vote
    hasVote = currentState.votedFor.isEmpty
    
    // 3a. If has vote
    //      update vote target, respond with vote granted
    response <- if (isUpToDate && hasVote) {
       state.set(currentState.copy(votedFor = Some(req.nodeId)))
       .as(voteGrantedResponse)
    } else {
    // 3b. If no vote, response with vote rejected
      voteRejectedResponse.pure[F]
    }
    _ <- lock.put(())
  } yield {
    response // this will be send back to requestor   
  }
}
```

nnn

![img after locking](...)

nnn

![img of dead-locking](...)

nnn

### Use MVar for

* Mutual Exclusion 
* Can cause dead-lock
* Do not use to lock operation with unbounded time

nnn

### Important mention: Deferred + Ref

---

## Vote RPC Phase 3: Sender Completion

Reminder

```scala
def startElection(
  selfId: String, 
  voteRequest: VoteRequest,
  state: Ref[F, NodeState]): F[Unit] = {
  for {
    // 1. Convert to Candidate
    _ <- state.update(_.copy(
          tpe = "candidate", votedFor = selfId))
    // 2. Request Votes from peers
    responses <- broadcastVoteRequest(voteRequest)
    
    // 3. Handle response
    _ <- countVote(responses)
  } yield {}
}

```

nnn

### This approach does not work

```scala
for {
    .....
    // 2. Request Votes from peers
    responses <- broadcastVoteRequest(voteRequest)
    
    // 3. Handle response
    _ <- countVote(responses)
} yield {}
```

`broadcastVoteRequest` only returns after getting all responses, so much for availability

nnn

![Img show bundling all links into 1](..)

nnn

### Solution: Decouple all the links

![conceptual img](...)

show that each links can finish independently

nnn

### Approach 1: Fire and forget (Callback style)

```scala
def startElection(
  selfId: String, 
  voteRequest: VoteRequest,
  state: Ref[F, NodeState]): F[Unit] = {
  for {
    // 1. Convert to Candidate
    _ <- state.update(_.copy(
          tpe = "candidate", votedFor = selfId))
    // 2. Request Votes from peers and handle 
    _ <-  sendRequestAndCountVote(voteRequest)
  } yield {}
}
```

nnn

```scala
def sendRequestAndCountVote(voteRequest: VoteRequest, remotePeers: List[InetAddress]): F[Unit] = {
  val startedProcesses = 
    remotePeers.traverse { peer =>
      val singlePeerTask: F[Unit] = 
        for {
          res <- sendReq(peer, voteRequest)
          _   <- countVote(res)
        } yield {}
        
      singlePeerTask.start 
    }
    
  startedProcesses.map(_ => ())
}
```

nnn

## Meet Concurrent & Fiber ~

```scala
trait Concurrent[F[_]] {
  def start[A](fa: F[A]): F[Fiber[F, A]]
}

trait Fiber[F[_], A] {
  def join: F[A]
  def cancel: F[Unit]
}

```

nnn



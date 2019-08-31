## Thoughts about making Lolipop better

### Better debuggability

It'd be cool to have a UI that shows what happen on our raft cluster in real time

It should highlight

1. Anything that is outright incorrect
2. Potential Network issue (Slowness, partition?)

It would also be good to be used as educational tools

High level idea (todo: mock up)

- Show no of nodes
- Show events for each nodes by timeline
- Show events causality across nodes
- Show State on each instant
- Highlight unexpected termination of events lineage, eg. RPC not being replied




### Code structure

I feel that existing code isn't structured in an intuitive way, it was  hard to to trigger side effect from the code within

Example: It was hard to make a node vote for self during election without code duplication, this caused by 
1. VoteGranting code is not easily accessible from code that starts election
2. VoteResponse handler is buried in BroadcastVote, meaning even if we can call VoteGranting code, we can't handle the response

It seems like the repeating theme is that there are too many coupling, and we can benefit with more small traits that each handle a tiny aspect of the algorithm, below are some primitives that we can strive for  

1. Ability to start a node
2. Run something periodically
3. Start an election
1. Become a leader
5. Convert to follower
6. React on VoteRequest
7. React on AppendRequest
8. Request Vote
9. Replicate logs
1. Rehydrate from state on disk

### How to test distributed algorithm?

There are many different ways, here I am inspired (read about to copy) by jepsen which uses what Kyle Kingsbury called a black box approach, ie. test by interacting with a distributed state.

The general idea is to run a series of operations toward a distributed system, then gather the history of responses and run through a checker that analyse if the history violates certain guarantee.

We need

* Ability to generate a series of operations
* Ability to run the operations and collect the results
* Ability to analyse the results with a model checker

#### Design choices

**How to represent operations?**
Do we model as ADT? or just Enum? Given different database provides different operations, it is impossible to create a generic representation that covers everything and still be precise, so we either over-model by putting all possible operations into 1 ADT, or we create multiple ADT and have duplication. It might be possible to have more complex ADT too, where an Operations belongs to multiple root ADT, and thus and be pick and use.

**How to run the operations?**
This is straightforward, if we implement operations as ADT, then they can form Free monad, which can be interpreted, and accumulate in an ordered data structure, eg. List, in general each operations give one of the following 3 results (Ok, Failed, Timed out)

**How to implement a checker?**
This is the hard part, I need to read more, different checker requires different algorithm, and how to write them in a way that is applicable to different model is tricky, eg. can a linearizability checker be applied to any kind of database (I think this is what they called a model), eg. KVStore or SQL database?

 

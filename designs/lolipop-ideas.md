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

Primitives in Raft Algo

1. Ability to start a node
2. Run something periodically
3. Start an election
4. Become a leader
5. Convert to follower
6. React on VoteRequest
7. React on AppendRequest
8. Request Vote
9. Replicate logs


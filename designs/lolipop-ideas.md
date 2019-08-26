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



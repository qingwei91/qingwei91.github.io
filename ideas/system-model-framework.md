# A consistent way to model software systems

Let's use C4 Model as the foundation, C4 Model provide us a way to communicate system model by specifying the level of abstraction, the hierarchy is as follow

Context > Containers > Component > Code

The key bit is that each level is only allowed to refer to things within the same abstraction level, you can zoom in from high level to low level.

With this as the base, we can build add-on to support richer semantic:

1. Interaction Protocol per layer
2. Link C4 model with Sequence Diagram to show interaction details

 

# 01-21 / 01 / 2021

## What have I achieved?
I did pretty well on getting Martin up to speed.

## How do I feel?
I keep feeling pressured because I see no end on the project on its current path.

## What have I learned?
Service as a library pattern, this is a pattern to abstract interfaces into Library code instead of stand alone API. This way it achieves the goal of decoupling development between different teams but it does not decouple operation. In this case we have a Service A tightly coupled with business logic that should belongs to another team, typically we would spin up another Service B own by the other team so help scaling dev process, but a feasible approach is to have the other team provide a library instead of a service.

Spark coalesce vs repartition, coalesce can hurt performance if the resulting partitions are imbalance.
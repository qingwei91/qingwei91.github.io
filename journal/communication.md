# 03-04-2019

## What happened?

* We finally reach consensus on to use default value or optional to indicate
* Trying to optimize migration 

## How you feel?

* Feel bad that it took so long to reach consensus on something trivial, and failed to do it myself
* Testing migration is tricky

## What have you learn? 

* Avoid to be the middlemen in argument, because you cannot always fully understand both parties and their points
* Every OS has a native thread limit, which can be bottleneck when your program is thread heavy
* Decoupling read and write on migration is a good idea
* `fs2.concurrent.Queue#dequeue` does not terminate as enqueue is a runtime property, we need to add signalling to stop it

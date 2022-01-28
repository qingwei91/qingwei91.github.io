# 15 Jan 2022

## Reflection and learning

### Consistent Hashing
I re-learned that consistent hashing cannot completely avoid data redistribution, it only help minimize it. 

In the context of using hash to distribute data across N partitions, with naive hashing approach (ie. calculate partition id using module), whenever there's partition membership changes, we need to redistribute all the data among those partitions, for example, if we change no of partition from 2 to 3, then 4 % 2 == 0, but 4 % 3 == 1, the partition id has now changed.

With consistent hashing, we are able to retain most hash <-> partition mapping, adding a partition only affect data that are closest to the newly added partition, depending on the location of partition. For this to work, the repartition process have to copy data over, and sync all data from the old partition to the new one.

### On better knowledge sharing within an organization

I still dont have a great idea, but I have a small one that is more tractable and within my reach.

Initially I wanted to build something cool, that can help people explore knowledge within an org, but I am changing my mind, because I realize the idea is too vague to be actionable, for example, what is an effective way to explore knowledge? 

It is relatively obvious that search is an important feature, being able to find what we want within an org is a multiplier. Search can be solved using technology easily (relatively). Beyond this, I imagine a way to cluster content and show how they are connected is also useful, but this probably requires human curation, and I dont know how exactly it should be done yet.

I am changing direction to make something that help answer questions for organization on Slack, the assumption is that there are plenty of knowledge that are not documented in easily consumable format, but instead dispersed around different content medium. What we can do is to create a system that 

* index content from different communication channel
* allow search for related content
* automatically find answers or relevant content when people ask questions that the system understand

To achieve this, we need 
- [ ] mechanism to index text data
- [ ] mechanism to search through index and find relevant data
- [ ] mechanism to detect questions on some communication channel (eg. Slack)

# 28 Jan 2022
## Reflection

Really painful lesson on investing, do not chase high, and dont speculate, I might miss out but its easier to stomach when things are bad.

On learning, I learned that I am more motivated to deal with DS and Algo and NLP, presumably because I lack prior knowledge in Statistic.

## Learning

I learned specifically that for a sorted list of rational numbers, to find a combination of `a` and `b` such that `a + b` equal to a target `t`, we can just move ptrs from beginning and the end, I was skeptical about this solution because I was worried of a case where any of the ptr might have to rewind, but it turns out to be a non-issue because the algorithm somewhat guarantee it wont happen, I still fail to understand why its not gonna happen.
Well, I just figured it out, we need to look at it from an exclusion pov, everytime we move the ptr, it is because we realize the answer `cannot be in the outest range`, and it is relative obvious why this is true, and by deduction, our algorithm will guarantee to find an answer, if such answer exists.

I am also thinking more about testing linearizability, I failed to understand Lowe's point on his algorithm though, I dont see how it manage to prune the search space more effectively than regular Wings and Gong algo, and his experiment results does not seems to show his algorithm is always better.

However I am spending time to think about make a distributed version of Linearization test, I think its doable, we can steal idea from Distributed Tree Search. My current plan is that the algorithm will run in a distributed setting, where there is 1 master process and N worker process, potentially running on different nodes.

Then Master process has to produce candidate linearized history for worker to verify, worker just need to execute the history and check against a serialized specification object.

There are a few tricky bits:

We should start worker process before we fully produce all candidate history, because the full space can be very large, then we have a problem of deciding when to stop, 
and also what strategy to use to produce the history (potential partial). For example we can try to walk the tree in Depth-first method, thereby produce a few fully 
linearized history for testing, but this is likely not very effective because it reduces our chance for pruning (check Branch and Bound), instead, maybe we should try 
to produce multiple partial history, by partial we mean the history is not complete, and let workers to verify them. This way if anyone of the partial history is wrong, 
we can skip all of the other candidates that shares the same partial history, effectively reduce the state space. More problem arise on how to choose when to send, 
partial history is also more complicated because we now have to trace relationship of each partial history.

By doing partial history, it also means master and workers and making progress at the same time, meaning master needs to produce either continuation of partial history or completely new partial history while workers are working, and master and workers need to have frequent communication and perhaps even some backpressuring.

I should aim to modularize the system to make it tractable.
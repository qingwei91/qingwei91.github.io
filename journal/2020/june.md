# 1 - 3 / 6 / 2020

Terrible start of the week, many things gone wrong in the past few days

1. An optimization causes traffic to surge
2. Partition logic causes inefficient parallelism which ultimately hurts performance
3. Rate limit bug worsen the issue because reader isn't aware of rate limits

One thing I learned is that without perf-test we dont know much about the system when it is underload

fs2 stream broadcast seems to not work very well with parjoin, it appears parjoin takes X element from inner streams, and only proceed to next batch after all X element finishes, I need some code to replicate this.





# 13/04/2023
## What happened?

Work has been fine, but I am gaining weight, again .... 

I tried to connect with ex-colleague, guess that's a good thing to do.

## How you feel?

Actually lately I am reasonably happy, watching One Piece together and learn things bit by bit. Feel good about current project's progress.


## What have you learn?

I made a generalizable way to compare 2 streams of data that should eventually converge, it is quite naive and mechanical but has nice properties like providing a nice log of records and is easy to understand conceptually. On this same problem, I also learned about Kolmogorov–Smirnov test, which is a potentially more robust way to compare stream, as it can detect if two streams come from different underlying data source.

I am also slowly picking Rust, a big realization is how great GC is, you can share pointers however you like, and they will be clean up after the last reference is gone.
In rust, sharing data is much harder, for example to build an read only index we cannot just store references in index, because that requires lifetime to ensure references does not exceed original data. In a way this is really reflecting what is going on under the hood, its quite refreshing to me.


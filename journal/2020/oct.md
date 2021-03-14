# 01 - 09 / 10 /2020

I realize I really need people to bounce ideas with, for example for the Organization Structure problem, I've got some great feedback, it helps me to understand what I really want. I think there are 2

### Structure team around product domain/concepts

We should try to identify the high level concepts in the product, and structure our team accordingly. I believe this will have profound effect on how we think and build systems. I think one big impact it will have is to reduce the split between SDK and Backend for some part of the product, as the team can now own more of the value delivery chain, eg. owning Segmentation in both SDK and Backend, and minimize decision making.

For example, our current slice of Edge 

Important note: Maybe visualizing Value Chain is a better way, 
For example: Segmentation value chain is as follow

```
Events
TPD       -> Segmentation -> Business Value
Identity
```

# 10 / 10 / 2020

I learned the proper definition of Linear Transformation, linear transformations are transformation that obey Superposition property, ie.

f(a + b) = f(a) + f(b)
f(c.x) = c.f(x)

Then eigenvalue and eigenvectors is defined as A = x.B, where x is eigen value and B is eigen vector, then A is a linear transformation, the gist is that eigenvectors characterize a linear transformation

I learned something about Singular Value Decomposition (SVD), it is a technique to decompose matrix and reveal significant parts of the the original matrix.

It is used in machine learning as a feature reduction tools, SVD factorize a matrix (M x N) into 3 parts

U               - a unitary matrix where each column vector correspond to a column vector to input matrix
Sigma           - a diagonal matrix where each column indicate relative strength of 
V-transpose     - a unitary matrix where each row correspond to a row vector of input matrix

It is essentially a matrix approximation technique that allow us to approximate matrix X with a lower rank matrix X~, rank is a measure of no of independent column in a 
matrix.

### Applying this in NLP

By breaking a matrix down into 3 matrices, we intuitively expose some hidden feature of the original matrix, and this is the basis of SVD.

Read more at my [notes](../../learning-notes/math/computational-lin-alg.md) of computational linear algebra

# 11-22 / 10 / 2020

The past few weeks has been relatively peaceful. Because we are waiting for something to unblock the work. I however felt a bit anxious because I dont like the feel of lack of progress.

I read an interesting blog post explaining why Deep Learning works even when it shouldn't have work, link [here](https://web.archive.org/web/20201020172042/https://moultano.wordpress.com/2020/10/18/why-deep-learning-works-even-though-it-shouldnt/)
there are 2 main points:

1. In high dimensional space, it is difficult to get stuck in local optima because there are a tons of way to escape it, author even argue there is no local optima but I am not expert enough to judge its correctness.
2. Even with extra parameters, early stopping can help us to ignore them, so it is almost always better to have more layers

## How to systematically assess software developer's level?

I figure it is useful to group them by the type of problem they can comfortably solve in different dimensions:

### Coding Problem
1. Simple Logic problem
2. Design and domain modeling problem
3. Concurrency problem
4. State management problem
5. Domain specific complex problem (eg. JVM internals, lock-free data structure, distributed system)

### System Design
1. Pick right tools for the job (choose DB, Queue, reverse proxy etc)
2. Inter-system protocol design
3. Deciding System Boundary (this need to happen before design inter-system protocol, and it is more important as getting it wrong is super hard to fix)

### Collaboration
1. Able to lead/drive collaboration within the same team
2. Able to lead/drive collaboration within different team
3. Able to lead/drive collaboration within the different department, this is hardest as it involve heavy context switching


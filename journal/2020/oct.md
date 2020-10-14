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

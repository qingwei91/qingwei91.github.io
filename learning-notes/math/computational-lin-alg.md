# Class 1: Overview

## Common Linear Algebra operations
Most of the time, in numerical Linear Algebra, we are either doing multiplication or decomposition, these technique allow us to decompose problem and combine.

## Intuition on how to convert problem into matrix problem?
For matrix multiplication, one cue is to think about the intended out, think about the size and how to obtain the result of each element, then it will be clear how the multiplication should be.

## Convolution (and/or) correlation
Here correlation is in the context of linear algebra (possibly specific to matrix processing).

The idea is to have a small matrix that act as a filter, the goal of this filter is to maximize a pattern, for example

given a 3x3 matrix F, and a 20x20 matrix M, apply F on every element on M using element wise multiplication and sum all the value, if the area of coverage (ie. the 3 x 3 sub-matrix on M where the target element in the center) is what we want to detect, then the calculation should return a high positive number.

and different filter can capture different patterns, which then can be used for further processing.

# Class 2: Topic Modeling Intro

Topic modeling is typically unsupervised learning process

A way to model it is to by Matrix Decomposition, where the input matrix is Bag Of Words matrix.

## Singular Value Decomposition (SVD)

SVD(X) = U . s . V

shape(X) = M x N
shape(U) = M x r
shape(s) = r x r
shape(V) = r x N

Row in X correspond to rows in U, and columns in X correspond to columns in V.
`s` is the singular value matrix that indicates the strength of the hidden correlation, where there are `r` of. These correlations can be interpreted based on the domain.
In topic modeling, it can be the topics, when X has `words X documents` matrix, then U can be `words X topics` and V is `topics X documents`.

We can then reduce number of `r` to approximate the original matrix while obtaining values of `r`.

## Non-negative Matrix Factorization (NMF)
this is a category of matrix factorization that never return negative, I have yet understand its significance and challenges, but experts say this is hard.


# Class 3: Review NMF and SVD

Nothing much really, it is mainly a review and briefly showed how to use pytorch autograd.
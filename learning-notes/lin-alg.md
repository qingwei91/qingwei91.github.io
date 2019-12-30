# Learn a bit of Linear Algebra

**Field** is a set where `addition, subtraction, multiplication and division` are defined, where the laws are similar with rational number and real numbers (I am not sure the exact law yet, not bother as we can look it up)

A **Vector space** V is a set of Vectors that

* can be added among each other where the sum is also in the space
* can be multiplied with a scalar from a field F, where the product is also in the same space

What is the point of defining these vector space?
Not sure, let me continue, it is related to **cosine similarity**

Cosine similarity measures the angle between 2 vectors in a vector space, it is useful **if** you care about vector point to similar directions, eg. in a multidimensional space where each vector represents the frequency of a certain word, then pointing to similar directions indicate the distribution of frequency is similar, but not necessarily the magnitude, eg.

> Hello, hello, world world
> Hello world

These 2 sentences are highly similar if we compute cosine similarity using word frequency (BOW)

---

## Simple Linear regression

Use `y=a+bx` to fit data set, only suitable for data with 2 variables

The exact calculation depends on the error function, which is typically square of error, and thus it is typically called least square regression

## Multiple linear regression

This is a generalized case of Simple Linear regression where

`y = b0 + b1x1 + b2x2 + ... bnxn`

## Logistic Regression

* Predicts categorical dependent variable
* Fits a non-linear S shape line
* Given it is S shape, means it has high chance to be in 0 or 1, and little chance to be in between, because logistic function convert any value into a point in the S curve, bisecting data into 2 extremes
* It is useful when you believe there's a linear relationship from numeric independent variable to the categorical dependent variable

---

## Word2Vec

Word2Vec is a technique to convert words in corpus into vectors, so that it can be processed by numerical models, the output vector should retain useful information about the original word such that if vectors of 2 words are similar, then the words are similar.

I believe the similarity can be computed using cosine similarity

### CBOW vs Skip Gram

CBOW is to predict a target/focus word using context, whereas Skip Gram is to predict context(s) using target/focus word, the following note assumes Skip Gram, as it works better for large data set (why??)

It is implemented using a shallow neural network with 1 hidden layer, the input layer is a vector of size equal to the vocabulary of the corpus (ie. the total number of distinct words, maybe without stop word), the number of nodes in hidden layer is determine by the expected vector, ie. if you think there are 300 interesting features to learn about a word using it's context, then the hidden layer should have 300 nodes, then the output layer is a vector where each index correspond to a word, and the value correspond to the probability to be around the input target word.

The word embedding (ie. the final vector we want) is the hidden layer as it has learned about useful feature of the word in our training data.

How does training happen in Word2Vec??

a) What's the objective function?
> It is a conditional probability
b) How does output of NN looks like?
> For skip gram, it is N vectors of size V, where N is the number of context word to predict and V is the vocab size

---

I tried to use SVM and the results are terrible, why?
It improves massively after I changed kernel from rbf to linear, why?


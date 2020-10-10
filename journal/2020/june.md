# 1 - 3 / 6 / 2020

Terrible start of the week, many things gone wrong in the past few days

1. An optimization causes traffic to surge
2. Partition logic causes inefficient parallelism which ultimately hurts performance
3. Rate limit bug worsen the issue because reader isn't aware of rate limits

One thing I learned is that without perf-test we dont know much about the system when it is underload

fs2 stream broadcast seems to not work very well with parjoin, it appears parjoin takes X element from inner streams, and only proceed to next batch after all X element finishes, I need some code to replicate this.

# 4 - 8 / 6 /2020

Fixed the scaling issue, havent fully figure out the reason, but it is again relevant to how async boundary is broken down.

Last week has been stressful and I broke quite a few momentum, need to get things back on track:

1. Go jogging tmr morning even only for a while
2. Re-focus on the team's goal, now that we shipped the 1st iteration, we should think about what's next

Learned about how LDA works, the idea is to find a group of topic from the document that can predict a bunch of words, corpus is represented by bag of words, which might be sufficient for topic modeling.

# 9-10 / 6 / 2020

I finished my 1st attempt to model the topic of my journal corpus, using LDA, the outcome is terrible, here's what I've learned:

LDA is Latent Dirichlet Allocation, from the name, Latent means hidden, it normally refers to some variables that are inferred, in topic modeling it means the topic is inferred. Dirichlet relates to Dirichlet distribution, which is a family of continuous multivariate probability distribution. Not sure how to interpret this yet

The intuition behind LDA is that with a group of documents, there's a number of topics. A document is a bunch of words, LDA assumes that given a topic, we can produce a bunch of words based on their distribution in the topic. The training then focus on finding a number of distributions, one for each topic so that each topic can explain the documents in our corpus 

1. a document is formed by a bunch of words, each word has a count/frequency, this representation is commonly known as bag of words
2. A topic is a word that is closely related to certain words

It is not clear to me on when to use LDA, when compared to say tfidf or neural network, but the advantage is that it is unsupervised and thus can be used to discover topics.

The output of LDA is a list of topics, each topic is merely a number of highly correlated words with their distribution, and then human can try to guess the topic using the most relevant words. We can then compute the topic probability of a doc, this value can then be used as input for other unsupervised model, ie. k-means to perform clustering 

Reference: https://towardsdatascience.com/light-on-math-machine-learning-intuitive-guide-to-latent-dirichlet-allocation-437c81220158  

### Time series:
Lately, I have a need to do some forecasting at work, so I try to learn some basic of time-series forecasting.

Here's what I've learned so far:

In time series forecasting, the idea of stationarity is important:

Here's how to think about it:

In time series data, you have a no of observations, let's call it Y subscript i, where i = [0....t]

A way to think about it is that each observation is a pick from a probabilistic distribution, with T observations, we have T distributions, and the whole time series is a combination of T pick from each of the distributions

In theory, with enough pick from an unknown distribution, we can infer the distribution, this is known as Ensemble Mean. However we often only have 1 series, ie. 1 observation. Thus come the idea of weak stationarity and weak independence

Weak stationarity demands:
1. Mean of the distribution to be a constant, independent of time
2. Variance of the distribution to be a constant, independent of time
3. Covariance between Yt and Yh should be constant, ie. covariance only depends on the distance between 2 observation but not to the absolute time

Weak independence states:
Yt and Yh is independent when h approximate infinity, this means each observation gives new info about the underlying distribution

The idea is to make all observations to have the same distribution, then with T observations all coming from the same distribution we get more data to infer the underlying distribution.

Ref: https://www.youtube.com/watch?v=K2bK888zGxg

# 10-20 / 6 /2020

I learned about Naive bayes, the key points are 

* It is super easy to train, as it is not numerical
* It is based on bayesian probability (surprise!), the key assumption is that every features contributes to the outcome independently, which is almost never true but does not matter that much in many use cases. In other words, Naive Bayes tries to find out how each feature contributes to the outcome using probability, and then treat it the same across all records independently. This is not good for complicated task, as you might have imagine, for example Naive Bayes will not be able to reason on how features relate to each other.
* Neural network is super powerful because it can learn arbitrary function, which is unique to it

I also learned that prediction is difficult, especially when things have trend, 

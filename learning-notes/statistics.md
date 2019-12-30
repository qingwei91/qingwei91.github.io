# Statistics

## Basics

* Observations means data set
* Numerical vs Categorical
* Continuous vs Discrete
* Nominal vs Ordinal
* Population vs Sample
* Always try to sample randomly
* Observational study vs Experiment (Uncontrolled vs controlled)
* Observational study is prone to confounding factor, researcher need to design to avoid confounding factor
* Simple Random Sampling is costlier
* Stratified sampling - group data by a trait, then employ random sampling within each group, downside is it is harder to analyze the result
* Cluster sampling - group data into clusters and pick a few cluster as sample, all observations within selected clusters are used

## Principles of Experiment design

1. Controlling - control differences
2. Randomization
3. Replication
4. Blocking - actively block confounder

## Plotting tips

1. Use scatter plot to find relationship between 2 variables
2. Histogram is used to group data into bins
3. Right skewed means mode at left
4. Box plot is useful to know distribution and outlier
5. Use log transformation to minimize difference
6. For categorical data, use bar plot, segmented bar and mosaic plot
7. Side by side box plot can be used to compare data from different group

## Variance and std dev
Definition: Sum of differences of each observation with mean

We can describe how far a data is away from mean using std dev, eg. X1 is 2 std dev away from mean

## Rejecting null hypothesis

Often, rejecting null hypothesis is the goal of research.

One way to approach it is by simulating the scenario using null hypothesis and match it with the real data, if it is extremely rare to produce data matching real data, then we can reject null hypothesis in favor of alternatie hypothesis

## Probability

* Disjoint events mean they are mutually exclusive
* A process can produce an outcome
* A set of outcomes is typically called an event
* Probability Addition Rule: P(A or B) = P(A) + P(B) - P(A and B)
* Probability distribution = all disjoint outcomes with their corresponding probability, sum = 1
* Marginal probabilities = prob based on single variable
* Joint prob = prob based on more than 1 variable
* Random variable = variable that has probabilistic outcome

### Conditional probability

P(A|B) = P(A and B) / P(B)

P(A and B) = P(A|B) * P(B)

Tree diagram is useful to show relationship between dependence events

![Tree](./tree-diagram)

### Bayes Theorem

A theorem to help us invert the relationship of conditional probabilities

P(A1|B) = P(B|A1)(A1) / Sum of P(B|An)P(An)

Bayes theorem is tree diagram in formula

Sampling without replacement == lost of independence

### Expectation

* Expectation is more general than mean, as it can incorporate probability
* Expectation of discrete variable is easy to compute
* Expectation of continuous variable requires calculus
* Random variable has variance and std dev too :)

### Linear combination of random variables

Hint: Use Expected value

What about variability? (distribution, variance)

Var(aX + bY) = (a^2 * Var(X)) + (b^2 * Var(Y))

Sum of Probability density = 1

### Continuous distribution
It is useful to visualize the probability density function for continuous variable, then we can solve problem by finding area

## Distribution of random variable

Normal distribution = symmetrical, unimodal, bell-shape

Notation: N(mean, stddev)

Z-Score: A way to standardize/normalize value in Normal distribution so that we can compare value across different random variable with normal distribution

Z = (x - mean) / std dev

Variable in real world never fit normal distribution perfectly, but some of them approximate normal distribution, we need to verify how appropriate it is to make such assumption, techniques include

1. histogram with overlay plot
2. normal probability plot

## Geometric distribution

### Bernouli distribution
    
Bernouli random variables are variable with only 2 possible outcomes:
p = 1 - p'

The point of Bernouli distribution is that the outcomes are labelled with 1 and 0 and thus are numeric, meaning we can compute them in mathematical sense.

Geometric distribution = the `probability distribution of number X of trials needed to get one success`

> (1 - p)^(n-1) * p where p = P(success)

This assumes P(success) is independent of previous trial

mean of wait time (n) = 1/p

variance of wait time (n) = (1 - p)/p^2

### Binomial distribution

Probability of _k_ successes in _n_ independent trials with _p_ probablility of success

Binomial distribution approaches normal distribution when _np_ and _n(1-p)_ are both >= 10

The approximation works poorly when the range of count is small, range of count refers to the number of _n_ that we are trying, eg. 20,21,22 are three count of _n_

mean = n*p
variance = np(1-p)

# Inference!!

### Sampling distribution

Given a population `P`, a sample size `A`, a parameter `u`, we can get sampling distributiom by repeatedly take `A` sample from `P` independently, and calculate `u` for each sample, the collective result of all `u` is called sampling distribution

### Standard Error

Given a population `P`, with mean `E`, say we make sampling distribution `D` of `P`, then we can find the std dev of `D`, called `sd`, with `sd` we can find `Standard Error (SE)` of our estimate obtained by each sample with respect to `P`:

> SE = sd/sqrt(N), where N equals to sample size (Warning: Not total number of samples)

### Problem of confidence interval

To reject null hypothesis, we need strong evidence, one way is to use confidence interval to check if the predicted outcome falls into the interval or not, this has a problem that it does not quantify the strength of our evidence, eg. if alternative hypothesis predicted an outcome that is outside of our 95% confidence interval, it is not clear how far we are

P-value allegedly solves this problem

In essence, p-value is measure

> Assuming null hypothesis is true, what is the probability to get an observation of that is in favor of alternative hypothesis, if p-value is high, it means it might be due to chance, in some sense it means observation is not too different from prediction of null hypothesis.

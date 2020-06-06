# 01-10/05/2020
## What happened?
Company is shifting focus

## How you feel?
Exhausted, I guess that's caused by sheer volume of meeting, reducing my time to get into any form of deep work

## What have you learn?
1. I learn some specific details about `scalameta`, I was treating quasiquote like some magic, but now I understand it is all about the AST
2. Coproduct is more flexible than ADT as it represent type ala-carte
3. Feature engineering can help to reduce computation cost as it reduces training input set
4. follow Heidi Howard
5. OKR might not work when you're trying out ideas? (Need elaboration)
6. Trick when compiling AST with recursion scheme:
   ```
   What if a compilation step requires contextual info, 
   ie. instead of F[A] => A, we need (B, F[A]) => A? 
    
   Ans: Try F[(B => A)] => (B => A)
   
   This pushes the responsiblity of providing contextual info to the caller, 
   which is exactly the owner of such info
   
   A great thing about this technique is that most of the code still works, now your compilation step has access to context info, and it can produce/enhance context before moving to the next step 
   ```
7. Another way to think about tree-traversal in recursion-scheme is that
   ```
   catamorphism is Bottom up traversal, when transformation happens at leaf 1st, 
   then bubble up to the root
   
   
   ```
   
# 11/05/2020
## What happened?

## How you feel?

## What have you learn?
1. While Prometheus is not very accurate, it can be used to get relativeness between data, ie. the counter of value 5 might not be correct, but if counter for dimension=1 is 5, and dimension=2 is also 5, then we can safely assume the ratio between them is correct, ie. it is 1 as 5:5 = 1

# 12-18/05/2020

I joined debate competition and lost, I think there are a few reasons:

1. I was too obsessed with the correctness and uniqueness of the theory, and didnt consider how to communicate it clearly, and turns out it was a lot harder than I thought, competitive competition isn't a competition on building theory but a competition to convince people
2. I didn't practice on what I should ask, and wasn't asking anything important

Not having end to end test is really bad, there are so many unknown that we couldn't verify, and everytime having to do it manually is a PITA, I need to put in some effort on this

In terms of research, I should've created a plan earlier, it turns out planning is a highly cognitive demanding job which set the tones for the future

I should try to find out about what is taking up my time, can I be more productive?
- Record time taken in meeting
- Record time taken in preparing meeting
- Record time taken on design and review  

# 19/05/2020

I fking knew it was me, I was using the incorrect promql, for recording rule we should use `rate()` not increase, as increase is specific to a time range, which cannot be composed later.

Eg. if you have a rule that compute sum increase of 10m, then on grafana, when you query it, you get increase of 10m every 30 seconds, so it is like a sliding window, but if you were to aggregate it, it become really hard to reason, you cannot use `sum` as it inflate the number, because there are tons of overlap of 10m window, I've observed you can use `increase` of `increase`, but that is hard to reason, it is theorectically giving you rate, which you might just use rate then.

# 20/05/2020

Interesting things to track for a software team:

* Deployment frequency
* Build time & Deploy time
* Alerts count
* Bugs count
* No of times a topic appear in retro

When tackling high dimensional data, embedding is a technique that can help, the idea is to convert high dimensional data into lower dimension vector, the interesting bit about embedding is that they can be pre-trained and reuse

# 21-22/05/2020

Realize I neglect the cost of the assets my team own, and this is going to cost us a few grands. I feel bad about this, I think in the future, I need to have a stronger grasp on how my business unit perform in terms of P&L.

Here are my mis-steps:
1. I didn't prioritize cost monitoring
2. I noticed the cost uptick and was convinced it is expected by others, I should've cross validate this verdict
3. I probably should challenge the status quo more

## Learnings on Deep Learning

I've been watching fastai videos to prepare myself for the job.

Neural Network is powerful because of the [Universal Approximation Theorem](https://en.wikipedia.org/wiki/Universal_approximation_theorem), where linear combination (ie. Matrix dot product) combined with non-linearity (ie. activation function) can approximate any non-linear model.

Common steps of create a model is something like the following:

### Raw Data Collection

Here we want to get data that is representative to our problem domain, it has to contains enough information that reflect the domain. Jeremy Howard claims that you often need less data than you thought you need, so I think we should try to get data and start training before worrying about not having enough data.

### Data preparation
At this stage, we should have a brief look at the data just to have a rough understanding, it is also a cheap way to detect errors. Howard also claim that unbalanced data is not typically an issue in practice, so dont worry about it yet.

Really the principle is that we should experiment more and quick instead of planning for too long, I believe the underlying idea that support this approach is that experiment is much cheaper than analysis and have a better return, so there's little point to keep analysis.

One typical process is data normalization, it is to make sure our data is comparable in a consistent way such that value `x` means the same thing across our dataset, in practice it normally means changing our data such that mean is 0 and std dev is 1.

We also often have to apply some transformation, there are at least 2 kind of transformation, preprocessing and data augmentation, the difference is that preprocessing happens before training while data augmentation happens in our training, both techniques are applied to make training more effective.

Another clever trick is to convert data into different form, for example, audio data can be converted into image and then be trained by models that are good at dealing with images. I am wondering if this can be useful to model events which is time series data. 

### Pick your model

Right now, I've learned 2 general problems deep learning solve, namely Image Classification and NLP, both problems have a good number of pre-trained model, so we should always try to start from pre-trained model because it saves us time, and there's almost no downsides.

Using pre-trained model is also called transfer learning, which means we transfer the learning from pre-trained model to our own domain. There's a few things that I need to try out to fully understand it, eg. our own input data needs to fit into the pre-trained model input layer, and if there are mismatch we will need to either tweak our data or the model but I dont know the exact mechanism yet. 

### Training

With pre-trained model, we normally start by training the latter layers of the model.

The idea is that the earlier layers of the model contains low-level knowledge of the domain, and the latter layers contain high level knowledge. For example, in Image Classification, an pre-trained model like ImageNet will store its knowledge about primitives like `lines, shapes, position` at earlier layers, and the latter layers will have knowledge like `dogs, cats, human`. 

So it is sufficient to only train the latter layers, how many latter layers to choose is a design decision that we sometime have to make, but with fastai, it provides decent default (not sure how it decides it though?)

Then fastai recommends training using `fit_one_cycle` over the old `fit`, I've yet understand what's the differences and why.

How do we know that we have trained enough? (ie. in terms of epoch and learning rate)
> one way to tell is to observe the accuracy (or watever metric you care about), if it starts to get worse, it likely means we should stop

### Inspect and Fine tune

Check for under-fitting: If training error is higher than validation error then maybe we have under-fit (Confirm this and understand the theory)

Check for over-fitting: one heuristic is that is validation error decreases at 1st and the increase we likely have an overfit

Check the top losess and confusion matrix: it is useful to understand what does the model gets wrong at  

Find optimal learning rate: Getting optimal learning rate can improve the final model, we can find it by plotting the learning curve, we normally want to the point where error rate is about to drop dramatically. In addition, it is common to use different learning rate over the different layers we have, this is because when we are retraining the pre-trained model, chances are we really mostly want to only retrain the latter part of it, and for the earlier part of it we'd like to train it a lot slower as low level details tends to transfer well across domain, so by specifying a lower learning rate for earlier layers and higher rate for latter layers we achieve better result, this is known as discriminatory learning   

Retrain whole models: Sometime retraining the whole model improve final result too, I think the theory is that we are now learning more primitives from our specific data set. 

## Multi label classification

In certain case you are predict multiple labels simultaneously, in such case you will have to determine a threshold such that if N > x, it is classified as N, whereas in single label classification we normally just pick the label with highest probability  

## Image specific notes

* Orientation of images matter, by default, fastai library perform horizontal flip, but depending on situation, we might want to also do vertical flip or even rotation depends on domain (I wonder how well ImageNet generalize for satelite images though)
* The way you crop images also matter, if important information is being cropped out then it might not work as expected

## NLP specific notes

* NLP uses 2 training, one to learn language model, then use language model for classification, language model is general enough that people can reuse
* it is observed that it is often better to only retrain part of existing model, bit by bit, eg. unfreeze last 2 layer, train 1 cycle, unfreeze last 3 layer, train again, why?? 

## Tabular data

fastai support tabular data model, but I dont know how it works yet  

## Sequential Prediction

Read this: http://karpathy.github.io/2015/05/21/rnn-effectiveness/

## Questions:

1. what is Encoder in context of NLP?
2. what is embeddings?
   Embeddings normally refers to learned continuous vector representation of categorical variables, that's a mouthful, let's tear it apart bit by bit:
   * representation of categorical variables - embedding is relevant when we are dealing with categorical variables, it is a way to represent it
   * continuous vector - it just means a list of numbers
   * learned - it is typically learned through supervision, the point being that we want to be able to represent categorical variables such that it contains useful information, the information depends on the supervised task goal, but the generated embeddings are continuous vectors that we can say if 2 vectors are close to each other, then they are similar in terms of the learning target, this means to create embeddings we need to be able to perform supervised learning, 
3. Can RNN work with variable length data?
4. how to deal with sparse data
5. What is the essence of collaborative filtering? how is it different from regular machine learning problem?
1. What is the numerical representation of NLP?
2. Can we automatically find corpus that are similar or related just based on text?

## Nomenclature

Weights/Parameters: This is really the network's knowledge, they are persisted and modified

Activations: This is the result of a calculation

Weight decay: this value control regularization, it is used to penalize 

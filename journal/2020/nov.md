# 01 - 03 / 11 /2020

## Recurrent Neural Network

What problem does it solves?

Recurrent neural network solve the problem of Seq2Seq modeling, regular neural network expect a fix number of input and produce a fix number of output.

But in domain of Natural Language Processing, the input is typically document, which has variable size from sample to sample.

The essence of seq2seq modeling is that the output should not just depends on the values of input, but also depends on the order of input, we can imagine this as some hidden state. So for a neuron in RNN, other than its regular input, it also accept a hidden state as input and produce another hidden state as output for the next layer.

To train the hidden state, we introduce loops in the neural net, such that the output of a layer for an input x0 is feed into the training of input x1, where both x0 and x1 are part of a full input in this particular order.

Intuitively, the hidden state will then remember something about the things it has seen before.

While this approach brings us a step forward in Seq2Seq modeling, it suffers from gradient explosion/shrinking problem. As the number of single input value grows, early value are bring minimized in the process of gradient descent which mean it has a strong bias to the new value. In other words, regular RNN has short term memory, it tends to forget things that it has seen long time ago.

## LSTM (Long Short Term Memory)

LSTM to our rescue, amazingly LSTM is something that is really old.

The real reason LSTM works is because the way it is setup means its gradient vanish a lot slower than RNN, I dont really understand the math part of it.


## Yake! (Yet another keyword extraction)

Yake is an interesting algorithm to extract keyword/phrase, it work as follow:

1. Break document into n-grams
2. For each n-grams, score them on 4 dimensions, ie. casing, word position, word frequency, related context, diff sentence
3. Then based on the scores, rank each phrase using a formula (I dont recall)

The key insight here is that even just by looking at words in SINGLE document, it can reveal a lot, it uses some assumptions:
1. word occured at early of document tend to be more important
2. word that occurs frequently tend to be more important
3. word that occurs many times in different context is likely not important as it is context-agnostic (eg. filler words like `a`)
4. word that occurs in many different sentence is likely more important

I gave it a try and it seems to work reasonably well, and it should be really fast compared to other approach

## Next

I should learn more about Attention mechanism. I am now making notes in [learning-notes](../../learning-notes).

# 04 - 17 / 11 / 2020

I feel demotivated because of lack of output, we havent been producing interesting stuff for a while.

But I still manage to improve stuff in this period, we learn about managing ML models and workflow. We also started reading for difficult research problem that seems to be important.

I did some work here and there. Interview seems to be something that everyone has different style, I am not in the mood to push for unification, actually I am not sure if we should, will defer to boss.

# 18-19 / 11 /2020

We realize there is a miscommunication between Eng and Product, I am not happy with his reaction, I think finger pointing is a bad move. We should focus on 2 things:

1. How to deal with the current situation?
2. How do we avoid similar mistake in the future?

Since he seems to not care, I should, I think we should reassess what we want, I believe we still want to deploy it live which involves engaging with a client.

As for the miscommunication, how can we improve?
I think there are multiple factors that contribute to it:

1. Joining in the middle of a project means he lacks quite a bit of historical context
2. Not able to clearly communicate mis-assumption, and not enough communication, I felt that he didnt want to communicate and is always quiet, but I might be bias here.

What I could have done better?
1. Proactively talk about responsibility split
2. Check with him that he understands what we do

Luckily, there are some good news, we are forming better ideas on how to build our next version.

Some insightful thoughts:
* Is there anything like stopwords in user events?
* Are there techniques to help dealing with short sequence?
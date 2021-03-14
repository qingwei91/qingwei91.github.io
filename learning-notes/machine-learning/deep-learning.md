# Deep Learning Overview

This article aims to document `why` Neural Network is the way it is by breaking it down into different pieces.
I also wish to form connections between different way to express Neural Network to help me understand it as a topic better.

## Motivation

Deep learning, or Neural Network in general is a function approximator.

Recall that a function transform input into output, and we can think of many things around us as function, take an extreme example, human brain can be thought as a function where external stimulus are input, and our thoughts are output.

As a function approximator, we want approximate some ideal target function which is specific to our problem on hands, eg. Image Regconition or Speech Regconition.

For Neural Net to be a general purpose tool, we need a form or a structure that can express many different arbitrary function.

Let's start dissecting a Neural Net, and then I will explain why its structure is really useful.

## Anatomy

I am going to show 2 different ways to express Neural net, and make connections between them

### Brain-inspired Neural Network form

Neural Network commonly is described using a diagram as follow
[!insert NN diagram](...)

Recall that a neural net is really a function, so it has to accept input and produce output

Input Layer correspond to input, while output layer correspond to output

Then there is the hidden layers, a way to think about the network is that the hidden layers represent different level of abstractions of our target function, and they build up higher level of abstraction as it get closer to output layers.

We can think of every neuron of each layer as a feature in the corresponding abstraction layer, then the connection from previous layer to the neuron indicates how each output from previous layer contribute to the current layer.

And now if we zoom into each neuron, in regular NN, a neuron is connected to all output from previous layer, there are 3 elements:

1. Output of previous layer
2. Weights of each connection
3. Bias for the current neuron
4. Activation of the neuron

The output of current neuron is a linear combination of all output from previous layer and bias, with corresponding weights, followed by an activation. 
Bias term is needed to improve generality, this will become clearer when we look at the algebraic form.

Lastly, activation is typically a non-linear function that is differentiable, however there are exceptions, where the function is not really differentiable, but can still be used, for example RELU is not differentiable when x = 0 as its left and right derivative is different, in most implementation, we just pick one of them.

### Algebraic form

From an algebraic perspective, we can break a neural net into 3 group of components:

### Input

Input is literally what it is, it is typically a list of real numbers, it represent the input of the target function we are trying to approximate.

### Approximated Function

This is really the hidden layers, which can be further broken down. If we map it to hidden layers of Neural Net, then we can break it down into multiple layers.

Each Layers is really a function like this:

$l(x) = act(W.x + B)$

to generalize into each layers, we get

$$
l(x_n) = act(W_n . x_n + B_n) \\
l(x_n) = act(W_n . y_{n-1} + B_n)
l(x_n) = y_n
$$

where $W_n$ is weights and $B_n$ is biases, $act$ is the activation function

Note: Sometime we use `parameters` to represent both weights and biases

The 1st layer uses Input as `x`, then every layer use output of previous layer as `x`

As you can see, it is actually quite simple but surprisingly powerful, by using this structure, we can approximate many interesting function (lookup Universal Approximation Theorem if you want to know more).

One insight about learning the anatomy is that we can now look at the network and ask interesting questions:

For example, What can I change the network architecture to make it easier? or how can I interpret the hidden layers?

## Training

Now that we know the form of neural network, both in neuron and algebraic form. The next thing we should learn is how neural network learns.

To learn something, we need to know what we want to learn, in Neural network, it is the target function, while we do not really know how the target function looks like (if we knew, we would just use it), but we know what the target functions should output given some input.

So the process is generally like this:

1. Create a neural network randomly
2. Pass an input to the neural net, it returns an output
3. Compare the output of our neural net with the correct output, use loss function to compute the loss (ie. the error)
4. Compute the derivative of cost function in regards of weights, bias and previous layer (this is recursive), using chain rule

Notice we need to know the correct output, this is often referred as training set or labeled data
### Loss function

The 1st component to know is the loss function, there are different loss function to be used for different problems, but loss function typically has the following properties:

1. Differentiable, this allow us to compute derivative of loss function which is essential for learning
2. It should return a large value when the error is large, and vice versa

Loss function is being applied to the output of Neural Network

### Gradient

The next bit is `gradient`, this can be understood by the sensitivity of loss function in respect to a parameter (reminder: parameters is the union of weights and biases), in other words, how a small change in each parameter is going to impact the loss.

Gradient is useful because if we know how a small change for each parameter can lead to change in the loss function, then we can tweak our parameters with the goal to minimize loss, so that our function approximation get closer to our target function.

We use the chain rule of derivatives to compute gradient for each layers, and then we use each gradient to tweak the parameters after a batch size, with a learning rate.

Batch size is the number of training samples used to perform 1 update, for example if batch size = 20, it means we will compute gradient after passing 20 samples through the network, and compute aggregated error for 20 samples.

Learning rate controls the magnitude of change to our weights, the consideration here depends the curviness of our target function, if we are trying to learn a highly non-linear function then it typically requires smaller learning rate

----

## Seq2Seq Problem

Sequence to sequence prediction is a type of prediction where the input and the output are both sequential data, where the input and output size is variable.

For example, Language Translation takes a list of words and produce a list of words.

### Recurrent Neural network (RNN)

One of the earliest technique to solve Seq2Seq problem is by using RNN, this is a special type of Neural network.

The specialty is that a neuron of RNN takes in 2 inputs and produces 2 outputs, 

The 2 inputs are a regular input from input sequence called $X_n$, and a state $H_{n-1}$ which should incorporate some information about all previous input.

The 2 outputs are a regular output $Y_n$ which can be treated as the output of the layer, then another output is a state $H_n$ which should incorporate information about all previous input.

You might have noticed $H$ appears both as INput and Output, and this is probably part of the reason why it is called Recurrent NN. The idea of RNN is to keep a state that tracks all historical input for each neuron, this way we can handle sequential data in a meaningful way.

I think it is easier to show it in algebraic form:

$$
y_n = a(W_{xn} . x_n + W_{hn}.h_{n-1} + B_y)\\
h_n = a(W_y . y_n + B_h)
$$

There are some variants around the exact formula but the key is that it takes 2 input, $x_n$ and $h_{n-1}$, and produces 2 output $y_n$ and $h_n$, where $h_n$ is meant to capture historical information.

There is one big problem though, it is called gradient diminishing problem, as we've learned earlier, gradient in Neural Net typically refers to the sensitivity of loss function with respect to a parameter.

Gradient Diminishing happens because derivatives of certain activation function like Sigmoid function can become really small. When multiple such small number being multiplied together it become even smaller in the back-propagation and causes ineffective learning on the earlier layers.

A RNN can be thought as a regular NN with many layers that shares parameters, the no of layers is correspond to the no of input, which can be huge, so RNN suffers badly from diminishing gradient.

While an effective way to combat diminishing gradient is to use an activation function that does not suffer similar issue, for example RELU, in practice this seems to be insufficient, and LSTM and GRU find more success.

I dont fully understand why at the moment, let's revisit in the future.

### LSTM

Long-short term memory is a special type of Neural Network designed to solve the short memory problem of RNN.

Given the amount of material on the net, I will just write down the key insights of LSTM.

The key thing about LSTM is the cell state, LSTM has 2 hidden states instead of 1 in RNN.

The interesting bit of cell state is that LSTM perform addition on cell state instead of multiplication in the update process, and this makes the state more stable and suffer less from vanishing gradient problem.

I am not sure why having 2 states is important.

### Encoder-Decoder architecture

This is a neural network architecture composed by 2 RNN, the 1st RNN is called Encoder, the 2nd is called Decoder.

Encoder is a N to 1 RNN, it takes sequence of input and produce a single vector that represent the summary of the inputs, then Decoder is a neural net that takes the summary vector and produce a sequence of output.

This structure is flexible as it does not prescribe what RNN to use for both Encoder and Decoder. But the main disadvantage is that it attempt to represent the whole input with a fixed-lenght vector, which means there can be information loss, this problem is more obvious when the input sequence is long. 

### Attention
# Problem: How to form units/teams in an organization?

## Understand business as operations

I find that treat business as operation(s) the most abstract and yet useful way to model businesses. The word `operations` generic enough to cover most business activity and still capture useful properties.

We can define business as 

> A operation that convert some raw material into some desired outcomes through a series of steps

![ope](business-as-operation.png)
#### Figure 1: Operation broken into steps

This diagram above is an abstract model of an operation, all we know is that a business operation is a series of steps that convert raw material to a specific outcome. 

The raw material can be physical matter, or it can be money or even time, the desired outcome might be a product, a sales figure or house. 

Each arrow can be thought as a communication process that transmit output of incoming step to outgoing step.
  
At such a high level of abstraction, lets make a basic assumption

> Communication between steps (ie. the arrow) is more expensive than communication that happens within a step (not shown in diagram)

Then, there are a few properties that we normally want to optimize:

1. Higher Speed 
2. Lower Cost
3. Lower Complexity

I think optimizing for speed and cost are self-explanatory, almost all businesses want to speed things up and reduce cost (without compromising other aspect of the business).

`Complexity` of the process is a measure of how many different way a process can go, the more possibility in your model, the more complex it is, the harder it is for people to comprehend. Complexity increases with the number of path in your operation, eg. 

![](complex1.png)
#### Figure 2: Branch increase complexity

Here the output of `Step 1` does not just go to `Step 2` but also to `Step 1(a)` now, compared to **Figure 1**, **Figure 2** is strictly more complex, and things get more complicated if you have loops, for example it is common to realize things does not work at a later stage, then you might need to move the output back to a previous step and start over.

In reality, you almost always want to have feedback loop, so that you can make correction upon errors. So it typically looks like this

![](limited-feedback-loop.png)
#### Figure 3: Operations with limited feedback loop

Or worse, sometime you can have this

![](unordered-feedback.png)
#### Figure 4: Complicated feedback loop

So how do we optimize on these 3 properties mentioned above:

1. Minimize branching in your operation, ie. output of a step **always** move to next step
2. Minimize loop in your operation
3. Minimize the need of inter-steps communication (ie. less arrows, or less activation of arrows)

Things can get even more complicated for certain businesses, where there are multiple operations that share steps, let's ignore such complicated scenario for now, and see how far we can go with a simpler model, ie. only 1 operation.

## Understand `Team` as a social construct

Why do we need team (or any other units)? This question is so fundamental that it sometimes went unchallenged, but I'd like to still provide some arguments on why an organization might want to split itself into multiple teams (or whatever you want to call your sub-components).

`Team` is an abstraction, abstraction exists to free you from details, for example, as a CEO, it is easier to manage 5 departments head than to manage 5000 workers.

In practice, a team of people generally works closer to each other, have more frequent communication, know each other better and are more prepared to collaborate with each other. A team also tend to form its own identity and culture which influence team members. Typically, a team has one leader which works closely with the rest of the team.

## Map team to operational step 

Now that we understand business as a single operation, I would like to convince you that it is better to structure your teams by mapping team to each step in your operation. 

The main reason is that the alternatives are terrible. If you don't map a team to a step, you might suffer from problems like:

* Any change within a step requires coordination over a number of team, and remember collaboration within a team is easier than collaboration across team
* Confusing reporting structure, a team member need to report to both the team's leader and the leader for a step 

If we accept that each step should map to a team, then we now change the problem from `how to decide team formation and boundary` to be `how to decide the granularity of each step in an operation`.

To make it clear on what do I mean, consider the following diagram:

![](coarse-fine-grain.png)
#### Figure 5. Coarse grain steps vs fine grain steps

This diagram shows two ways to define the same business operations 

We can view different type of teams on the axis of operational specialization in a spectrum from `highly specific team` to `highly cross-functional team`.

It is not a binary option because specific-ness is a continuous properties, eg. a person specialize in writing on paper is more specific than a person specialized in writing in general, this is an absurd example because the specialization isn't meaningful in common sense, but it illustrates the idea that specific-ness is continuous and relative.  

I am using software production as the context, the common operational task we want to accomplish as a company is to

* Find out what market needs
* Design a solution to fit the needs
* Build the product
* Package the product
* Test the Product
* Sell the solution

We also need some supporting function to operate in the business world, for example we need to be able to produce invoice, accept payment, produce accounting report etc. But let's ignore these areas for now for simplicity.

Let's try to define the boundaries of our spectrum, the least-functional team vs the most functional team

## The most specific Teams
   
* Market Research Team
    * Market data collection
    * Market data analysis
    * Report generation 

* Product Design team - Take market report, generate product spec
* Software development team - Take a set of specification, build against the spec
    * Front end
    * Backend
* Software deployment team - Take code, package and deploy
* Software testing team - 

## The trade-off 

A: Split by product?

Problem of split by problem is that how do you define the boundary?  

B: Split by customer's problem?

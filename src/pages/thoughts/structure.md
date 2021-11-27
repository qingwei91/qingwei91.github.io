---
title: "Thoughts on organization structure"
date: "2021-11-08"
# status: WIP
---

## What is organization structure?

Organization structure refers to the way we group people in an organization.
This grouping decides some of the most important thing in an organization.

The group is typically implemented using abstract concepts plus a set of mechanism, for example members in Marketing are grouped together by the team name, and assigned with relevant responsibilities, and the team tends to have well established communication channel and pattern, and there's probably also some scheduled meetings every now and then.

### Cost of communication

An organization typically exists to producing something, either products or services. And it provides them by carry out activities. The need of organization is based on the fact that the final outcome requires combination and/or coordination of multiple activities, ie. it cannot be done by a single person while meeting the needs.

As a results, coordination is inevitable, and as organizations scale, it tends to be one of the biggest cost.

## Goals of organization structure

The goals of organization should be 
* to optimize to reduce global communication cost
* to encourage innovation by reducing communication cost among people that have similar interest or can form synergy

In order to achieve them, the designer needs a few bits of knowledge:
1. How information flow through the organization, and understand where is the bottleneck and where do we have untap capacity (potential waste)
2. Which group of people when grouped together can have better synergy

One way to look at Communication is to treat it as information flow, I'd like to think of information flow as a stream, the upstream and downstream needs to coordinate and have similar capacity so that the flow is smooth, when there's huge imbalance then it results in waste. As a leader/org designer, you need to see the workflow yourself to fully understand the situation.

To give an example, in a software development workflow, Product Manager typically perform the function of gathering client requirements and share it with Engineering Team, if Product Manager is not producing the requirement fast enough, it indicates Product Manager is the bottleneck. Or if Product Manager produces more information than Engineering Team can digest and process, then bottleneck is on Engineering Team. This is not always an organization problem, sometimes its just a capacity problem, ie. you dont have enough manpower.

There might also be ways to measure communication effectiveness but I've never seen it put in place, and I am skeptical about its effectiveness.

On 2nd point, to group people to exploit synergy, I think this is the most interesting part of the design. 

In a business there are typically multiple activities that when coordinated produce Value Streams, there can be a single or multiple Value Streams in a business.

Value Streams requires coordination of, and coordination implies communication. The game here is to figure out ways to group people that maximize their value or strength, and minimize integration risk.

For example:
![](../../assets/value-stream.png)

Here I sketched out the value stream of software creation, let's assume you have multiple value streams running at the same time. We can then think about different strategy to organize people.

There are a few dimensions to consider:
* Expertise, we need to make sure people are leveraging their skills and expertise
* Communication cost
* Integration risk

I'd like to elaborate on communication cost and integration risk, they are really 2 side of the same coin, the goal here is to reduce complexity at integration point, the simpler the integration point/process/interface is, the less risk and the smaller the communication cost is.

This means we should encapsulate complex process closely together, and aim to provide simple interface whenever some sort of context boundary.
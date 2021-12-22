---
title: The cost of using an event streaming model to share state
date: "2021-11-12"
---

# The problem of sharing state

This article expresses my thoughts on Event Streaming approach for sharing state. It is largely based on my limited experience.

Let's start by defining the high-level problem.

In modern software system, with ever-increasing complexity, it is very common for different parts of the system to share/exchange information, I am going to frame it as 

> State sharing problem in distributed system

There are a few key components in this problem:
1. State implies change, ie. the information that are being shared are dynamic, they changes over time
2. Information need to be shared between components across network, in many cases, the components might be owned by different groups
3. Information need to be shared in a timely manner, with minimum downtime

Sharing state in distributed system is a well-studied field, in fact it pretty much define the field, however today I want to put some focus on the social aspect of it, and explore how information sharing mechanims affects day to day operation beyond CAP theorem.

## My experience so far
I've experienced event-driven approach once, and it was quite troublesome for the org. We made a few mistakes:

1. Keeping data in Postgres while simultaneously using events for state sharing, this is a mistake because the org relies heavily on adhoc modification on DB level to fix issues, the database wasnt clean.
2. Not having clearly defined contract on the event interface, this has made things hard to change when the expected behavior isnt clar

## Sharing state on demand via request-response model

In my experience, this way of sharing information is the most common way of sharing information. There are different ways of implementing it, it can HTTP, GRPC or SOAP protocol, the point being that information are being shared when consumer of information has a demand, its demand driven.

There are also quite a bit of implicit assumption that goes into such model, its not always stated but pretty much assumed in most use cases:

1. Information provider provides the contract of data model, wherea information consumer depends on it
2. If a request failed, consumer can try to call it again sometime later
3. Information provider can make changes to the data model without coordination as long as its not breaking changes, what is consider breaking change depends on contract, but typically adding new information is not considered a breaking change, whereas removing is considered one

## Sharing state by publish subscribe model

Another way of sharing state is via publish-subscribe model, where the information provider publishes messages, and consumer subscribe to messages.

A key defining feature of this method is that actions are triggered by provider instead of consumer, ie. its supply driven and not demand driven.

This approach has a lot of benefits, one key thing being that consumers can react to information change which isnt possible in request response model, and this approach fits many use-cases when consumer need to react to changes.

But there's an important difference when compared to the request response model, publish-subscribe model impose a stricter constraints on information provider.

In request response model, the information shared are typically consider transient, meaning it is normally only valid within a session, while the consumer is free to maintain a local copy (eg. a cache), the local should be treated as non-essential. This means if something gone wrong, the recovery can be as simple as follow:

1. Provider fix their data
2. Consumer fetch data again and optionally rebuild their local copy
3. Problem fixed

However, when using a publish-subscribe model, things are more complicated, because data provider only provides an update when there's a change, it is generally assumed that consumer need to maintain a local copy that is essential for its operation, so when there's a bad message, it is not clear how to fix it.

In theory, we can make it as simple as request response model by doing 2 things:
1. Contain full state in the message, and not delta
2. Expect all subscribers to treat message as transient

Then, when things gone wrong, the publisher can just force publish messages and consumer will get the new info and recover

But in my experience, this is not always the case, there are technological reason and also adhoc reason, for one, if subscriber receive a broken message, its not always clear how it should handle it, and more often than not, the consumer will break. This is less of a concern for request response model, because failure mode tends to be more straightforward in those cases, chances are the consumer will retry of propagate the failure to upstream because its demand driven.

But in a publish-subscribe model, there are more possibilites, and thus requires more coordination to do the right thing, a subscriber can choose to keep reprocess the message, ignore it, or throw it into a dead-letter queue, and the right decision depends on the contract by the provider.

I feel like part of the problem is that publish-subscribe model is inherently more powerful, and thus are more likely to get wrong, and as a design principle we should avoid it unless necessary, many state sharing problem can be solved by request response model just fine, it might not be the most efficient approach but unless you're dealing with a lot of information, it is probably fine.

If you really need to implement some sort of publish subscribe model, how to recover from failure should absolutely be one of your top consideration, it is very hard to retrofit such thing.

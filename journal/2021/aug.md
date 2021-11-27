# 01 - 07

## What happened?
Had some bad experience with coworker, I think it is unfixable and I'd better move on with my life. Sometime we just need to bail

## How do I feel?
Quite an emotional roller coaster, I do think I learned a few things though

## What have I learned?
I learned more about myself, what do I really want:
* Lead and do orgnaization design
* Think about system and put my ideas into work
* Think deeply about stuff, explore possible ways and think about strategy
* I refuse to waste time on broken relationship, I could've spend those time on right people

I also tinkered with an interesting idea about programming that I need to continue explore when free:

Build abstraction that represents Schema of Data Schema, it is probably not going to support everything, but it can be so generic that I believe will at least be fun, and perhaps be useful.

A schema is a composition of 3 types of relationship:

* Basic type (int, float, string etc)
* Compositional type (product, coproduct)
* Enhances type (list, option, if we are imaginative, we can also have negative type, ie everything except A)

Virtually all schema are represented by these 3 types of stuff, and we should be able to express schema of schema using this structure, and then with an instance, we can:
1. Generate schema parser
2. Generate random data generator
3. Ability to express a small data schema easily

I suspect this can be built using great support of type level Coproduct, free-iota seems to be the best bet but it does not work for scala 2.13

Someone built this: https://github.com/danslapman/morphling, on a similar spirit I believe

Another I started to reflect is my way of programming, I tend to favor strong abstraction over getting things running 1st, which means my output is more non-linear than peers that favor getting things running because I often have productivity boost after abstraction breakthrough/epiphany but can be slow before that. I am not sure if I am wrong or right, but is something that I should be mindful about.

# 08 - 18

## What happened?
PM is finally going to move, I hope I can own more things and have a good restart

## How do I feel?
Hopeful but then also very concerned

## What have I learned?

IMO, my leadership havent been prioritizing the right thing, I learned a lot from this experience but I havent figure out how to help.

I learned about Zettekalstan, a note taking method, it is really an addressing method, it encourages linking small concepts because ideas are not linear.

There are 2 main rules as far as I understand:

1. Write your idea in small piece of text, dont lump many text together
2. Give every idea an address, the address schema needs to support easy insertion without resort, for example a alternating alphanumeric schema, if you have 2 pieces, 1 and 2, you can insert your 3rd piece into the middle by giving it 1a as address.

# 19 - 31

## What happened?
* Changed PM
* Ship 1 small project
* Restart our research project

## How do I feel?
Not very happy, I feel lack of accomplishment

## What have I learned?
I started reading the book Good Strategy/Bad Strategy, I am trying to form a concise framework to talk about strategy. I've learned that a strategy typically compose of 3 items:
1. A diagnosis
2. A Guiding Policy
3. Coherent actions

Some thing really key about strategy is that it should cover not just the what and the why, but also the `how`, it should be grounded in reality, cohesiveness is also a key, it is about focusing resources and attention onto something such that we can win.

Strategy should attempt to 
* Identify a way to reach our goal
* Explain why we can do it better than our competitors
* Have an executing plan

I think abit more about the fever project, I am going to focus on personal use case for now because it allows me to not care about complex integration and can focus on the meat of the problem which is
* Automatic keyword generation
* Detailed analytics on the Concepts/Vocab

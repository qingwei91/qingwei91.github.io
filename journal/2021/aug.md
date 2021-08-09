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


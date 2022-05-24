---
title: Code Readability 9527
date: "2022-05-24"
---

## Code Readability, Tip #9527

Note: This is a short post, more akin to a brain dump.

To optimize for Code Readability, you should aim to communicate intent, not implementation specificity, unless implementation specificity is your intent.

Implementation specificity is typically (part of) your intent when your code is performance sensitive.

Whatever you optimize for will become apparent to the future reader, and if you apply such rule consistently, it will train people to assume intent to be invariants, and can liberally change the underlying mechanism.

I feel that this is related to my preference towards Tagless Final pattern, where one try to express intent as algebra without implementation, compose those algebras to produce the final program, and then provide implementations to adhere to the algebras. There is a downside to this workflow though, it can be quite annoying when you're exploring the solution space as you dont know the algebra yet, so it can take a few iterations to get there. One alternative is to write scrappy code to explore more of the solution space before encoding them into proper algebra.

TODO: I should try to find some examples to support my take.
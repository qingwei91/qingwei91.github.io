# Trade-off Unix made

## Mechanism over policy
- Have api as general as possible
- Defer higher level customization towards user level
- Result in too many options to configure, which deter huge amount of  non-technical user


### Things helped Unix success

- Flexibility in depth
- Provide many tools to glue even more tools together



## Unix philosophy
1. Do one thing well, and no more
1. Expect output of software to be input of other program !!!
2. Dont hesitate to throw away code and rewrite (Only apply to software that suppose to last)
1. Use tools, if you dont have it, build them
2. Dont guess, measure !
3. Use simple algo, simple data struct, unless you really need fancy stuff (You rarely need)
2. Data structure is the central of programming correctly [This totally explain why domain modeling is important]

Some of these advices (#6 I am looking at you) are obviously stated in a stronger tone than needed, I believe it is because people tend to go the opposite, so from a more objective view, this are just suggestion and should not apply on a case to case basis.

### More of the rules …
- Interface should be clean
- Base program should not be too clever (this should apply more to dev tools, devtools should not outsmart developers, but application can and should outsmart non-technical user.)

**Side side note**: the quotes and example used in books are highly concrete, and used to describe some rather abstract rules, this is Effective communication
 
Eg: Never struggle to decipher subtle code three times. Which trying to say code should be clarified if you encounter it and had a hard time to figure out.

Composability is important, part of it due to it’s human that writes code.
In theory, inter-process  communication mechanism like RPC can also be well isolated, IF developers are discipline enough and enforce the rules. In practice, programs tend to expose too many internals details through such mechanism, resulting hard to change software.

#### Separating concern 
Some concern need to change much frequent than the others, so by separating them, we can confine mutation (which is the source of destabilization) to only where necessary.

Splitting concern also means that testing with different combination is easier and cheaper


#### Rules of Transparency
* Software should be design with debugging in mind, we should have mechanism to inspect the internal state as early as possible
* This property can potentially be fulfilled by TDD or great logging

#### Rule of Representation
* Choose complex data structure over complex algorithm
* Because data structure represent things, algorithm represents steps, things are easier for human to reason about than steps, which implies a concept of time (here time is not clock time, but some relative order between incident, for example, command A happens before command B)

#### Rules of least surprise
* Same thing should have same behaviour
* Similar thing should have significantly different behaviour

#### Rule of Generation
Code generation is a good tool, it lifts abstraction layer (I think it’s pretty complex and not easy to get right, use with caution)




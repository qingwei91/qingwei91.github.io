# 01-10/04/2020
## What happened?
Leading a team without PM is challenging, I am not effective in this workflow, for one, I am not good and reaching decision with Decision Maker.

## How you feel?
I felt exhausted, running a team without a fully dedicated Product person is challenging, especially so when the goal isn't clear and there are plenty of things to coordinate 

## What have you learn?
1. I need to prepare Sprint Planning with a longer vision
2. I need to be more specific on timeline when prompting others for answer, to help them prioritize
3. As a lead, I need to spend more time to think about what I should be focusing on, right now it seems like I need to spend more time planning than executing 
4. Preparing for meeting is important, and has been working

# 10-16/04/2020
## What happened?
Still trying to be a good PM :D

## How you feel?
Good, I am getting better at it

## What have you learn?
1. Important to stay happy, it is infectious


# 10-23/01/2020
## What happened?

## How you feel?

## What have you learn?

Be careful when designing high level api, high level api is high level abstraction, which on its own is already difficult to design right because the higher level you go the less familiar people are going to be, for example CRUD api is ubiquitous because people understand them properly, thus making it easy to use.

I suspect the same idea can be applied when people claim Golang is simple, it means the abstraction provided by golang is widely understood and gives less room for error. Although I think less room of error on individual component does not necessarily translate into less room for error in composition, as it pushes complexity to the compositional part.  

Another example can be seen in functional programming, many FP language provides plenty of relatively high-level api, like `foldr, flatMap, traverse` etc, such api can be intimidating to certain people because it is less well understood, but thankfully they are mostly backed by formal theory and thus have well-defined behavior.

So moving back to building high level api, in business context, your high level api is almost always going to be adhoc, which means it is not easy to understand, and by solidify it into an api that involves network, it comes with some costs:

* the api contract can be complex, as high level api tends to have many different code path, with different possible results
* It is harder to change because logic is now spread across a network boundary, likely in different codebase with different lifecycle

I think the lesson is that think through an api if it is a high level one, if the idea is still fuzzy, maybe consider exposing low level api 1st to let consumer play with it to form a better idea for the use case 

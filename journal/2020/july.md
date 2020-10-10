# 1 - 19 / 7 / 2020

The past 3 weeks was stressful, there are a few reasons:

1. I have 2 pieces of work that we are going to miss target
2. I am getting pressure from boss for one of it, and I was having difficulty to explain, partly because I am not fully sure why.
3. My colleague was off for 2 weeks, which bring capacity down by 50%

## Decision replay

sum(sum(increase(ml_service_processor_stage_reached_counter{stage="TrainingStart",state="started"}[1d])) by (project_id)  * ON(project_id) group_left(project)
          project_id_project:permutive_mgmt_state_project_info:count)) by (project)

### Capacity planning failure: 

I originally thought we do not need more people, but that was assuming happy path, without error handling, when demographic modeling is at risk
I realize it takes a lot of man power to exhaust ideas, which we are lacking. This is made worse by the fact that people when for holiday and the additional unforeseen workload brought by another project. 

There are 2 things to improve:
1. Think about error case for resource planning, what should we do if things go wrong?
2. Get better at planning, for cross-team project, we should start planning earlier rather than latter

### Demographic Modeling Mis-management:

**Initial confusion on direction**, the reason is that management and execution are not aligned, and management failed to communicate at the right level of abstraction.

For management to manage effectively, management should know the border of instruction, and should provide clear goal rather than fine-grained instruction.

Execution should also push back when management is trying to force down too many details, this is harder to do than say, as there's typically asymmetrical power between the 2 parties.

I **failed to extract more value from the initial research phase**, what should've happen is that we should get organized notes and insights from literature review, which can guide our directions. 

For example, 
* paper X,Y,Z shows it is feasible to do what we want.
* paper G used approach B with great success
* paper I do very similar thing with us, we can copy

I think I did the right thing to push for action, as folks tend to overthink, which in many cases are unnecessary, I should however do it earlier

Another thing that I learned from this is how we manage expectation, for a project that is full of unknown, we should make it clear to stakeholders all the time. The pressure of having to report progress is sometimes detrimental, we should accept the fact that we need to 

### Poor show n tell communication

Show N Tell has a cadence of 2 weeks, so most people wont remember what is the context of a specific part of our system, we should also do high level overview.

My biggest mistake is to not realize the core problem after 1st feedback, I should've dig deeper to understand it.

### Lacking single source of priority   

We as a team own a number of components, which compete for our attention and capacity, but not all of them go into the same priority queue, as a result I sometimes become 
the priority arbiter which I dont do a good job of. I should realize this earlier and outsource it.

### What I've learned

1. I need to push for specific-ness when folks go abstract.
2. For things that I dont understand, I can only trust people to make judgement, the alternative is likely worse
3. A team needs a single source of priority
4. For research to work, getting organized is very important, there are way too many rabbit holes

# 20 / 7 / 2020

I missed the opportunity on stock buying again, why does it keep happening?
Is it because I wasn't paying enough attention? 
There are a few explainations:

1. I was too pessimistic on Covid
2. I was too slow to learn how FED affects the market
3. I was too greedy

### Machine Learning

We can try to use deep learning and try to make our model overfit, and that point is probably close to optimal on how model can perform on the data set.

# 21 / 7 / 2020

Had a great retro, it is important to discuss organization's issue, as such status quo are typically taken as granted and hard to change, but they might be some of the more profitable area of improvement.

## 22 / 7 /2020

Had a long planning meeting, there are ups and downs

1. It is hard to refrain people from jumping into technical details, we should form consensus on such meta-practices at the beginning of meeting.
2. Plan for planning is crucial, especially when it is a multi-player session, when there are too many opinions, we need a way to progression

One thing I like to know is `How to scale a product design process?`

Can we have general framework to provide structure to the process?

* It should almost starts with essential goal, eg. what is the goal of actors within the system?
* Then expanding 

# 23 - 26 / 7 /2020

Having vacation, it is nice, one thing I like to do better to have a better plan, wihtout a plan I squander most of my time on youtube and random pieces.

I think my goal would be to watch my employer to IPO in 3 years, and contribute in the process.

What are some of the most important things? and how can I contribute?

* Product innovation
* Build economic moat
* Increase gross margin

Out of everything here, I am most likely able to contribute in reducing cost.

## Dev cost and infra cost

I think Watson cost at some point going to be too large to ignore, it might makes sense to work on a side solution.

I think we should be focusing on 2 fronts:

### User profiling

We are already doing segmentation, which is a form of Publisher-specific profiling.

### Info extraction from url

We are spending a good amount of money to perform this function, at some point it might be cheaper for us to do it in-housr and it can 
potentially be a good strategic bet.

I also learned more about investing, as current age, my strategy should be aiming for future growth sector, and I should consider how big players are going to act in the system:

Here's a few important factors to be looked into:

1. Fed & USD, the general consensus is that US has forced itself into a place where Fed has to backstop the economy and provide liquidity to avoid catastrophic financial collapses, this causes asset inflation. The risk of Fed reversing such approach is low, as the other options is horrible. But after election, thing might change because Fed
had attempted to raise interest rate earlier. We can hedge this risk by buying into bank sector. But current trend is that getting in cash-fueled sector is more profitable.
2. USD might risk serious inflation over the next 2 years, we can hedge this by buying precious metals, and high quality assets, high quality global assets will rise with inflation, and gold and silver can be used as store of value as cash powder.
3. Democratic government is incentivize to give money to private sector, which creates pressure to increase national debt which the ultimate solution will be inflation, this means holding cash over long term is not a good idea.

I should be looking for opportunities that can change people's behavior and or with great economic moats:
1. 5G, it will likely open up many applications that weren't possible, FB is investing into AR which might be one key applications, this might not be too far. Drone might be another one but likely further away from us. While we dont have kill app yet, we can watch for infra vendor and related sectors, eg. semicon. Watch Ericson, Intel, AMD, NVidia and TSM
2. Cloud computing, this sector will grow itself into more sub-sectors, eg. IOT, at some point it will take out vast majority of self-hosting solutions. It will also benefitted from 5G era. Watch BABA, AWS, Google, MSC
3. Financial Service, this is a safe bet, the general trend is that cash will be less prevalent over time, and payment gateway will be a winner here, the growth is likely not gonna be as explosive as Tech sector, but should be safe

# 27 - 31 / 7 /2020

## Work challenges
I am relatively slow when it comes to data processing, it is quite difficult to get into flow state due to 
* lack of auto-complete
* Lack of high level utils, we need to loop in many cases
* Crafting BQ query is not easy

## Product Design cont.
In Product design process, Shaping is important, it is the act of refining an idea to a point that we can confidently give it a timeline.
It is key to stay on the right level of abstraction so that it contains enough information but not dictating design in any form.

I've learned 2 tools from this:
1. Breadboarding, really is just a simple way to draw out activities flow
2. Fat marker sketches, ie. simple sketch

I think the most valuable thing to me is to have a structure that can be used as a starting point, it goes like this:
1. Shaping, the act of tinkering out unknowns of an idea to make it concrete enough to pass to the team but abstract enough to let the team decide on details
2. 

## Category prediction
I also tried to build a model to predict category of an article, the current idea is to use Wikipedia data-dump as training data, there are a few challenges:
1. It is not easy to extract data out of the dump, thankfully there's some open source tools that we can make use of
2. It is not clear how widely applicable the data set is, ultimately I wish to be able to classify all kind of articles, not just wikipedia
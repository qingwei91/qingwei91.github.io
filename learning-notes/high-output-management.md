# A summary of High Output Management

High Output Management is a book written for middle manager, it focuses on providing actionable ideas for managers to improve process and increase output of organizations. 

`Manager` in this book refers the group with relatively wide influence in the organization, from traditional managers that manages people to domain specialists that run specific operations. 

I am writing down ideas that I find interesting or useful in this document.   

## Chapter 1: The basic of Production§

### 1. The output of a manager is the output of the organizational unit he supervise or influence

Almost all worker (ie. anyone that participate in the economy) produces some output, goals are typically accomplished by teams. A manager is in the perfect position to influence the group, which is his main responsibility.

### 2. Organization should plan to be flexible

While no amount of planning can help us fully anticipate the future, organization should still plan to be able to respond to external stimulus quickly.

### 3. Production is to build and deliver products in response to demands of customer at a scheduled delivery, with acceptable quality and and the lowest possible cost.

I think it is important to identify what constitute as acceptable quality, committing to a delivery time is also important.

### 4. Break your operations into logical steps

This is one of the 1st thing a manager should have a grasp on, this allow manager to identify the limiting step, and plan around it.

There are typically 3 types of operations:
1. Process 
2. Assembly
3. Test

My note: it is not necessary to have the same three operations, the important bit is to break your operations into multiple phases so that you can build a model with it. 

### 5. Explore your production model with different scenario

After building your production model, think about how things might change, how would change impact your output, and how can one mitigate the potential negative impact.

It is useful to understand the available options to handle different scenarios and the trade-off among these options.

My note: while the system dynamics is highly context specific, one can try to explore it from 3 angles: 

Supply - What happen if there's a supply shortage? 
Demand - What happen if there's a demand change?
Internal - What happen if some internal component break down or suffer from contention?

### 6. Understand the trade-off of scaling up

We can scale our production by automation, and it typically sacrifices flexibility, and in turn gives us lower cost and more predictable output.

Automation does not automatically gives more predictable output, to achieve predictability, the book recommends three technique:

1. Functional Test - Sample check your product after production
2. In process Test - Proactively check material in the middle of production
3. Receiving introspection - Sample check the material before your production 

### 7. Always try to find defect at the lowest-value stage

A production flow is a series of steps that convert low-value input material into high-value output material.

We should aim to detect problems at low-value stage if possible to reduce waste.

My note: This is similar with the principle of `fail early fail quickly` in software world

## Chapter 2: Managing the Breakfast Factory
### 8. Indicators as a key tool

To run your operation well, you will need a good set of indicators (aka metrics), indicators help us to make informed decision, make accurate forecast and to spot issue in its early stage. 

In theory, you can have as many indicators as you like, but they should each serves a specific operational goal.

While indicators are useful, one can easily overreact to indicators, a technique to overcome this problem is by using **paired indicators that monitor both effect and counter-effect**.

For example, if you are monitoring the speed of software development, it might cause developer to cut corner and impact quality negatively, thus it is useful to also track bug counts to keep both aspects in check. 

### 9. Indicator should measure output, not just activity

Measuring output is more effective than measuring activity, for example, you measure a saleman by the orders he get, not by the number of calls he made.

My note: I guess both are important, as output is sometimes not within our control, it might be useful to capture both and try to understand when they dont match up, eg. why our saleman get very few orders even if he made a lot of calls?

### 10. Objective measurement as indicator

Objective measures has a few benefits:
* They spell out clearly what the goal of a group is
* They can be used to compare similar function between different groups

As mentioned, such measures can have negative impact if we only focus on it, a common scenario is that we might sarcrifice `quality` for `quantity`, because `quantity` is relatively easy to measure, while `quality` is not, in such case, it is useful to pair the objective measure with a subjective one that measures `quality`.

My note: Over optimizing certain metrics/measure is going to lead to [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law), by measuring counter-effect, this can be mitigated. [This series](https://thezvi.wordpress.com/2019/12/28/moloch-hasnt-won/) also talked about how optimizing on single aspect tends to destroy all value.

### 11. Peek into blackbox

It is generally acceptable to treat a process as a blackbox, where a manager only cares about input and output of the process. We can sometimes improve our ability to run a process by peeking into the blackbox, by knowing the process internals, we have better chance to spot potential issue down the road.

Peeking into the blackbox can provide us leading indicators which has predictive power. 
For example, in a breakfast production process in a coffee shop, if we only measures the number of breakfast served, when our coffee beans are running low, we can only know when it starts to impact our breakfast production throughput which might be too late. Instead, we should peek into the blackbox and also measure coffee beans inventory everyday so that we can purchase more coffee beans before it starts impacting our output.

### 12. Use stagger chart for forecasting

Stagger chart is a type of chart where you record forecast of certain metrics and its actual result, it is good for predicting economic trend.

A benefit of using Stagger Chart is that it forces people to routinely compare the actual value and the forecast value, this forms a feedback loop to tell us how well we performed, and help to improve our forecast over time.

### 13. Variable inspection

Inspection refers to the act to check for quality at various stages of a production process, there are two main type of inspection:

This is a technique to vary how often we perform inspections, based on prior inspection results. If for weeks we dont find any problems from inspection, we can reduce our inspection frequency, if problems are starting to build up, then we should consider inspecting more until quality returns to normal level.

While this technique is reasonable and is likely to reduce cost of inspection while still being effective, it is hardly used in reality, because we human are creatures of habit and we tend to stick to a regular routine.

The principle of variable inspection is also useful in managerial activity, a supervisor often has to inspect subordinate's work, and using variable inspection can make the process for effective while retaining subordinate's automomy.

### 14. Work simplification is an important leverage

We should focus on high-leverage activities, which are activities that has high output.

To simplify any work, we should 1st know what is the existing processes, we can break a process into multiple-steps and visualize it as a flow-chart.
Then go through each step and question its existence, often you can find some steps are not required.

My note: Once we pick the low-hanging fruit by removing unnecessary steps, we can look into merging certain steps to increase efficiency, but I speculate such changes are often more complex to implement.

## Chapter 3: Managerial Leverage

### 15. The definition of a Manager's output

A manager's output is equal to the sum of
* The output of his organization
* The out of his neighboring organization under his influence

The key idea author highlight here is that Management is a **Team Game**, what you personally produce is much less important when compares than what the team produces. This idea applies to both traditional manager (supervisor) and technical manager which acts more like a consultant.

### 16. Writing report is important

The act of writing report can help writer to be precise in thinking and spot issue in his thoughts 

> Reports are more a medium of self-discipline than a way to communicate information
> Writing the report is important, reading it is often not

My note: This idea can be apply to other form of writing, I find the act of writing forces clarity to writer's mind.

### 17. Gathering information

Gathering information is a common task in manager's daily activity, information comes in different ways and forms.

For example, verbal information from coworkers are relatively quick but are typically incomplete or even inaccurate, written reports are more comprehensive but takes longer time to produce.

> Your information sources should complement one another, and also be **redundant** because that gives you a way to verify what you've learned   

My note: The idea of having redundant information for verification is insightful to me, it happens in reality but probably not often enough. For example, I tend to validate from multiple sources when a piece of information go against my intuition, but I also never do it if it matches my perception. But I think what we should do is to cross validate whenever the information is **important**.

### 18. Visiting workplace to gather information

Going to workplace and observe is an efficient way to understand what's going on. Think about meeting, meeting often involves some formalities and overhead, occasionally overhead of meeting can exceed the actual information exchange, eg. with 2 minutes worth of information exchange, you might have a 30 minutes meeting. In contrast, doing a 2 minutes information exchange in workplace is relatively easy and allow participant to jump right back into their immediately.

While visiting workplace is efficient, it is underused, because managers feel awkward about wandering a place without specific task in mind. In Intel, this is combat by having programmed visits that set to accomplish formal task, but also set the stage for mini-transaction.

### 19. Nudging

Once in a while, a manager might actually make a decision, more often a manager participates in a decision making process, be it to provide information, or to debate pros and cons, or even to ask the right question.

Often, a manager might influence a decision slightly, by making a comment, or providing a suggestion on the matter, such action is should be distinguished with giving an instruction, Andy call this `nudging`, such action nudge the subject into the direction you prefer.

### 20. The idea of leverage

Leverage refers to the output of an activity, a common theme in this book is to increase your leverage.

One obvious way is to focus on high leverage activities:

* When many peoples are affected by 1 manager
* When a person's activity or output over a long period of time is affected by a manager's brief, well-focuses set of words or actions
* When a large group's work is affected by an individual supplying a key piece of information

Remember that leverage of an activity changes over time, certain actions when taken too late, it is important to timeline when allocating time.

It is also worth mentioning that leverage can be negative, for example if a manager delivered a negative performance review to an employee without providing concrete evidence, it is not hard to imagine this can negatively impact employee's productivity.

> The art of management lies in the capacity to select from the many activities of seemingly comparable significance the one or two or three that provide leverage well the others and focus on them

### 21. Delegation as leverage

Delegator and delegatee must share common information base and a common set of operational ideas on how to solve a problem. If this requirement is not fulfilled, delegation easily becomes an event where delegator gives a series micro-instruction to delegatee, such form of delegation produces low leverage.

Given a choice, should you delegate activities that you're familiar with or less familiar with?

> Delegation without follow-through is abdication

After delegation, you're still responsible to the accomplishment, and the only way is to monitor. Monitoring delegation follows the same principle for output inspection

* we should try to detect issue at the earlier stage of the value chain to reduce waste. (Point #7)
* the frequency of monitoring should varies, the way it varies should depends delegatee's experience on the task, and the progress of the task (Point #13)

It is common to delegate decision making, the best way to go about it is to monitor the decision making process.  

### 22. Increase speed to increase leverage

One of the more obvious way to increase leverage is to simply do things quicker, and generally this is achieved by time-management techniques.

There are various way to improve time management, but the book focuses on the meta-process,

* Find out the limiting steps, this can be activities that has to happen at certain time, and you will have to plan other activities around it 
* Batch similar tasks: many tasks require some amount of setup, if there are multiple tasks that requires on the same setup, then it is more efficient to do them together, note that it does not necessarily need to be physical, it can be mental setup, for example answering emails in batch can be more efficient as you stay in the same context throughout the process, compared to answer a few emails every now and then throughout the day

### 23. Organize manager's workflow like a factory

#### Principle 1: Manage work by forecasting

The difference between a factory and a job shop is that job shop reacts to demand in realtime while factory build based on forecasting.

Forecasting present us opportunity of acting quicker with larger volume to gain efficiency, at the time it brings in risk of mis-prediction that can cause waste.

A large part of managerial work can be forecasted, and the medium of forecasting is the manager's calendar. Many people tend to treat calendar as a repository of order, and whatever comes through take a slot in there and will be executed later, this is mindless passivity. 

To gain better control, manager should treat his calendar as a production plan, and spend effort to schedule non-critical work around limiting steps.

#### Principle 2: Monitor to avoid over-capacity 
Another production principle that can be applied is the idea of backpressure when capacity is full, in production line, operators will reject material to go into the pipeline if they believe the system is at full capacity (possibly by observing indicators), this is to prevent material build up in part of the pipeline and cause congestion that slow the whole process down. 

This is relatively difficult to apply for normal managers as there's a lack of accurate indicators to tell people if there are close to capacity or not, eg. you rarely know how much time you need to reply email or to prepare a presentation, and sometimes we have to resort to our intuition.

To use calendar as production planning tool, we need to accept 2 responsibilities:
1. Use calendar proactively, fill the holes around time-critical activities with non-critical bits
2. Say `no` when you realize you dont have enough capacity

It is important to say `no` earlier rather than later to avoid aborting a task at the later stage in the value chain.

#### Principle 3: Incorporate `slack` in your process

Keeping some slack allows you to handle unanticipated events without ruining your plan

#### Principle 4: Keep an inventory of project

Keep a list of things that can increase your leverage but does not need to finish right away, this allow one to properly use his time and avoid meddling with subordinate's time.

#### Principle 5: Use consistent approach for similar problems

Factory operations follow a strict set of rules and process to ensure reproducibility, we should do the same in our work. Having consistent approach brings in similar benefit, but we should remind ourselves to regularly revise the process to not fall into the trap of `Appeal to tradition`.

  

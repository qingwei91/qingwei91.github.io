# 01 - 08 /09 / 2020

I learned that data skewness is a real problem in parallel processing problem, if you partition scheme is imbalance it can cause big problem.

Spark is not great because of the lack of precise feedback when things go wrong, this means when things go wrong, without knowing enough on how things work, you can form tons of theories on why things is broken, and your only choice is to go through them bit by bit.

I also learned about Crawler traps, by having dynamic url, it can causes Bots to hit the api repeatedly, this is a unique problem for SDK as our query is dynamic but they are irrelevant to the content and thus shouldnt be an issue for Crawler.

# 09 - 19 / 09 / 2020

I am feeling tired these days, I think it is because of both delivery pressure and the number of things I have to do.

In addition, my work is not fun because I frequently have to touch system component that is complex, hard to navigate.

* I learned about WordNet which is a great resource for NLP related task.
* I also start to think about arranging software engineering team into layers, such that 

# 20 - 24 / 09 / 2020

I am still feeling tired, I think it is a sign of being overloaded with work

Some of the challenges I faced:

* Having to propose a change in a system I am not familiar with, I think this is an uphill battle, and can only work if everyone around me is supportive, I am not sure if that's the case as folks are probably equally overloaded
* We really need a vision for the system, organic growth isnt sustainable in the long run, I think we've passed the point and warrant contracts between components
* Managing while having to jump in/out abstraction is mentally exhaustive

I need to deal with my negativity, dont be too hard on myself for things I can't control, and even if I could, it is ok to make mistake or do a bad job, I'll be paying back at some point.

# 25 - 30 / 09 / 2020

## Engineering Team Structure 

Made some progress on Team Topologies, it is a fun exercise and also a tough one.

I think the important bit is to acknowlegde different needs for different abstraction layers, assuming we think about engineering org as a high level product creating function. 
From business perspective, we want engineers to produce Product as quickly as possible and with good enough quality (ie. beat competition).

While it is easy to think about it this way, under the hood, there are at least 2 layers of abstraction in engineering team:

### Application Team

Think of this as strikers in football team, they build product which help business to win the game. 
They typically need to respond quickly to business need, and they work closely with product team, and they build many MVP, some of them will be useless and get thrown away.

In general, Application Team should optimize for the following:

1. Time to Market
2. Quick prototyping
3. Gather customer feedback

### Infra/Platform Team

Think of it as your defender and midfield in football team, striker get support from midfield, having good defender means striker can focus on what they are good at.

Infra Team typically work closely with Application team, Infra Team should strive to empower Application team, unblock them and give them tools.

Infra Team should optimize for:

1. Application Team's satisfication
2. Stability
3. Org-wide Efficiency

## NLP Experiment

Started using td-idf on nlp exp, data collection requires lots of tuning. A common problem is to extract text correctly from raw html, which is quite convoluted.
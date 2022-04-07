---
title: My thoughts of being a Manager in Software Development
date: "2022-03-13"
# status: "WIP"
---

# Intent

This document is written primarily for my own benefit, I attempt to organize a bunch of random thoughts I have on the topic of becoming an Engineering Manager in this article. I intent to evolve it as my understanding evolve. It is bound to be incomplete, for now it will heavily focus on an entry level Manager, ie. managing 2 to 10 direct reports, without managing managers.

Do be aware that different organizations might have different expectations and/or interpretation for managers, the hope is that they overlap enough so that we can discuss it in a generic way.

# Structure of this article

I will break the responsibilities of an Engineering Manager into a few areas, for each area, I will discuss manager's mission on each area, surprising observations in those area and lastly some applicable technique.

While different organizations, or even the same organizations at different stages need managers to do different thing, but I think we can still summarize them into a few areas.

Before that, I wish to define the ultimate goal of being a manager, I see 2 parts in it:
1. Help business to utilize resources to achieve its business goal that can be achieved using software technology
2. Help the team (or whatever subunit you're in) to be reasonably happy and/or fulfilled

The 1st one is pretty self-explanatory, I specifically want to call out the 2nd point, which is probably more of my own belief than universal truth, but I really think it is important to keep people happy when we can, and we shouldnt demand too much sarcrifice from people for the business. 
Obviously there will inevitably has some tension between these 2 goals, and that's fine, managers just need to keep this in mind, remember we are people 1st, then only we are engineers, workers, economic actors.

With these 2 goals, I believe the following areas are relevant:

1. Team management
2. Project/Work management
3. Growing people
4. External expectation management
5. Manage upward and outward

## Team Management

Let's start team, it quite difficult to precisely define what is a Team, so I wont try, but I think the following has to be true in most cases:
1. You have a Team Mission
2. You work closely with each other within the team, than with people outside of the team 
3. You understand what each team member is working on with greater details than people outside of the team

I believe Teams are fundamental unit in Software Engineering organization, thus its worth spending time to talk about how they work.

As a manager, you should be creating an environment so that your team can thrive, this will be our focus in this part.

### Building a Team
A big part of a manager role is to build and maintain the team. Note that in most cases, manager should involve the Team when deciding these fundamental construct of the team, after all we designed all these constructs to help the team and they are the best person to judge.

#### 1. Define the Team's mission
Manager should make sure the team has a clear mission, and make sure everyone in the team understands the mission with as little ambiguities as possible. A clear mission is the cornerstone of a team, it allows the team to judge relevancy of work (and potential work), and act more autonomously.

#### 2. Engineer the desired Team Dynamic and corresponding Principles
We should pay attention on Team Dynamic, this includes how people interact, and how people perceive stuff. I deliberately used the term engineer to indicate it is more than defining a list of goals and expectations. Team dynamic depends on incentive and the feedback people receives in their day to day, it is dynamic.

The exact desired team dynamic differs across business and domains. However, I wish to propose a few ideas that I think are generally useful.

First, we should build `trust` within a team, I think a trusting team tends to outperform a team that lacks trust, it also make workplace a better place to be in. To achieve this, a manager should first communicate the desire to the team, encourage openness and discourage overly judgemental behavior. For example, encouraging people to raise concern and dont be dismissal.

We should also encourage ownership and autonomy, I expect my team to feel empowered to do their job, to own it. Autonomy makes people to feel more accomplished, and reduces management overhead. If people can and willing to make decisions on their own, you as a manager dont have to do it. 
I also believe decisions should be made by people with the most information and insights, and in many cases, that's not the manager.

Note that Team Dynamic is difficult to fully expressed in words, and it is something that changes overtime, manager should always pay attention to it and adjust. 

1 tool I find useful is the [Team Canvas](http://theteamcanvas.com/) ceremony (or equivalent), a team can start by stating what we expect from each other and try to form consensus when we can. One thing worth noting is that Team Canvas is only suitable for stating the expectations and identify alignment and misalignment, it is not advised to try resolving conflict as that can often be too time consuming for it.

#### 3. Establish Team activities/rituals
Manager should help the team to define regular activities and mechanism. For example, a team needs to define the frequency of Stand up meeting (if they need one?) and how to do it collectively.

Personally, I think Standup, Planning and Retrospective are all valuable activities, Retrospective is especially crucial because it explicitly expect the team to self-adjust/improve. It is important to have a common understanding on what each activities is about, for example, a team might agree that Standup is only to surface keep people in the loop and not for discussion, then the team is responsible on enforcing such constraints.

These mechanisms exists to help the team to achieve certain goal, and if they are starting to get in the way, we can always adjust.

#### 4. Capacity Management
Another responsibility most if not all managers have is hiring, I am calling it capacity management as that is closer to the intent. We need to have a good grasp on the team's capacity and be able to make some forecast to know when to hire.

To execute this well, we need to know if the team's demand matches the current capacity or not, you also need to know if there's any future events that might change this balance, for example, a key member is going for a multi-months leave, or if there's any upcoming large project.

Manager also have to drive the interview process, typically there will already be a process in place as that's how you're hired in the 1st place, but you might still want to adjust it based on your need.

I have a few opinions on hiring, I think that when hiring software engineers we should focus on the following:

1. Meet minimum technical requirement. In my line of work this means ability to create software, and have good understanding on computers, over times I am leaning towards normalizing this aspect with candidate's professional career. If someone is relatively new to the field, it is okay that they know less.
2. Clarity in thoughts and communication. In the long run, not able to think and communicate clearly becomes a burden to the team. I find the ability to distill information, ideas or knowledge effectively is a great indicator. It can often reveals one's ability to reason about different level of abstractions.
3. Being reasonable, this means knowing when to compromise between ideal and practical, and able to debate and be convinced with logical arguments.

I havent gain enough data about what's the best way to interview engineers, so far I think take home exercise with decent complexity plus a review is pretty good. But I've also heard complaints that people with a job and family wouldnt want to do that, probably something to test and adjust.

### Work/Project management

Working on projects seems to be how most team spend their time, it is therefore useful to define how the team should tackle work, and what is the role of manager here.

Following Andy Grove's famous book High Output Management, we can think of the output of a manager to be the total output of her team. We should be thinking about how to maximize the output. 

Note: we should also ensure we are working on the right thing, but this topic is too broad and will need its own document.

There are a handful of things we need to nail.

First, the team needs to be able to focus, or at the very least manage distractions within an acceptable range. Sometimes, focus means willing to do less at 1 time, in hope to finish things quicker, we should try to allocate more people on tasks until we hit diminishing return. For example, building a new CRUD app can be done by 1, 3, or 5 people, and we might decide 3 is the sweet spot and having 5 people might hurt productivity. 

Letting the team to be able to focus on fewer things have a few consequences. First, people get to build shared context, and shared context is what makes a team great. This will greatly improve system quality and communication bandwidth, the team will be able to ship things quicker in the long run. In many cases, optimizing for shipping earlier over total throughput is better in terms of overall value delivery, assuming you work in a dynamic environment and need to respond to change rather quickly. It also increases bus factor, making delivery more robust and predictable.

We also need to manage other sources of distractions, for example issues raised by customer, and request from other teams. Feature request is relatively easy to deal with, they fit into regular prioritizing and planning process, bugs and issues are trickier and can easily go out of hands when not being managed. Obviously the best approach is to not ship many bugs, but sometimes you need to deal with the existing circumstance. So far, the most effective approach I've used is to allocate X number of people on a rotation to handle these issues, this effectively creates a separate backlog which is not ideal, but it is easier to execute and stick to because it is purely mechanical.

Another important element is clarity, in my experience, clarity is crucial for productivity. Having a plan allow people to focus on execution, instead of trying to plan while executing. We dont have all knowledge required upfront, this is why we need to plan, plan for the known factors and also the unknown factors, build a common understanding among the team on how to handle unknown.

While we might not always stick to the plan, the action of planning is crucial here, we should not implement anything non-trivial without a plan.

Lastly, I want to highlight the need of risk management, from my own painful experience. It is important to think about the risk of the work, and make sure its communicated to relevant people, including stakeholders, doing so gives everyone wiggle room to adjust or change plan later if an idea does not work out.

### People and growth
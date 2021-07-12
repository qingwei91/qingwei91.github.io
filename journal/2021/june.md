# 01 - 07 / 06 / 2021

## What happened?

* Had a 

## How do I feel?
* A little bit of weird feeling with a team member over-involvement

## What have I learned?

1. Reiterating Andy Grove, when I delegate, I still need to follow up and look into the blackbox from time to time to make sure things are going as expected.
2. I still dont have a good way to gauge capacity need, thanks my manager to always have a focus on this
3. Maintaining good relationship sometimes is as simple as communicating our needs and establish a way moving forward, sometime we need to sarcrifice and it is important to communicate them.
4. I sometime incorrectly assume my team understand what needs to be done and got it wrong, I need to figure out why and how to avoid this.
5. I need to constantly avoid team to get into multitasking but sometime it is harder to avoid.

# 08 - 17 / 06 / 2021

## What happened?

## How do I feel?

## What have I learned?

### Scala App Performance debugging
Tips:
1. Get more metrics, JMX, failures, and latency on IO
2. Use netstat to check on connection state
3. Use ps to understand total no of thread
4. Use small fixed thread on non-blocking I/O should typically work better
5. Setup way to test

What I still dont understand:
Why IO does not scale, why process becomes unresponsive, I now understand, it is likely due to the bus being the bottleneck
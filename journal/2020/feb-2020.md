# 10~15/02/2020
## What happened?
I joined Permutive, Hurray

## How you feel?
It does live up the hype I was having, people are great, office is cool and there are many opportunities

## What have you learn?
1. It is important to not just ask why, but also `Why now?` (Credit Joe!)
2. A big part of Ad-tech is to run Ad-Exchange efficiently, like many other marketplaces, it provides price and goods discovery
3. DMP is essential for publisher to understand their user, and to be able to convert such understanding into high-value audiences to advertiser
4. Focus on customer is important, making sure customer is gaining value from us is key to long term success
5. Prometheus is a easy-to-query timeseries database, I wonder is it good enough to be used for daily operations?

# 17-19/02/2020

## What happened?
2nd week on new job, suhui isn't back yet

## How you feel?
Great, I am already quite busy, with lots of meeting, should get better next week

## What have you learn?
1. Learn a little more about Prometheus, remember that Counter is an ever increasing number
2. https client.expect is status code aware, ie. it only runs the err callback if Status is error, and this isnt documented in source code ...
3. k8s basic:

* Master: control plane 
    - etcd for metadata
    - api-server for rest-api 
    - controller that enforce state
    - scheduler that runs task
    - cloud controller to integrate with cloud 
* Nodes: run containers
    - container runtime
    - kubelet to talk to master
    - kube-proxy to let containers communicate

Going 1 level above master and nodes, we have `pod`

A pod is a group of containers (can be of 1), that share the same lifecycle, it is to model an application

Further up, we have replication set and controller, which are objects that model a group of identical pods, they support scaling in and out, replication set is a new addition that is supposed to replace controller

Next, we have services and deployment, services generally refer to collection of pods that exposes network port.

# 20~28/01/2020
## What happened?
3rd Week at work, manage to contribute some change, yay

## How you feel?
Neutral

## What have you learn?
1. Change needs to be introduced gradually and preferably with POC that shows tangible benefits
2. Prometheus histogram is a cumulative histogram that is used for distribution, ie. how many percentage of latency is above x  
3.  

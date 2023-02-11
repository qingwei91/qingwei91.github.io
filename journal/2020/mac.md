# 01~05/03/2020
## What happened?
I was promoted, wow!

## How you feel?
Good, many things to do and to learn

## What have you learn?
1. You are here to provide value, and it just so happen that you are able to learn
2. Google Spreadsheet is quite powerful, one can perform query against raw data, it can refer to data in a different sheet.
3. It is tough to decide what to do when you have plenty of things to do, it is valuable to have a framework to make prioritization a mechanical process
4. In OS X finder, type cmd + shift + . will show dot files, this is helpful when you want to locate hidden path from GUI

# 06 ~ 10/03/2020
## What happened?
Things I've done
* Push and setup staging test, a 1st step to automated deployment
* Drafted a plan for what I wish we do in terms of engineering practices
* Practice writing proposals in our team
* Started to automate onboarding process (part of it)
* Introduce new sprint structure

## How you feel?
Not bad, there are something I dont quite understand yet eg. how my boss decide what is important and what isn't. I am also not very sure what are we doing, there's some uncertainty around which seems to be a growth area!

## What have you learn?
1. When picking tools, use a use-case oriented approach, this is why writing things down is important
2. It is important to have sprint goal as a unifying theme, unifying theme is abstraction, abstraction makes things manageable 
3. When you come across good content, remember to save it as you might not be able to find it next time you need it

# 11~22/03/2020
## What happened?
Working from home due to COVID

## How you feel?
Calm

## What have you learn?
1. Prioritize ability to test if the component is going to undergo changes, because changes on non-trivial piece likely induce bug, and without test facility the cost of fixing issue can get too big
2. BigTable is a SSTable, it stores all data that has been written in cells, and only remove old cells during garbage collection, this means two things: 
  * If a row is write heavy, we are going to get a lots of cells
  * Always use cell-count filter when querying BigTable
3. Prioritize Monitoring and Alerting on system you're unfamiliar with  

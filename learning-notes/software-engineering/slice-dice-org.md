# How to divide break 1 software system into multiple smaller systems?


## Conway's Law
Always remember Conway's Law, the way you split the org need to reflect the software system and vice versa.

A team by definition has better communication and control within the team than between different teams, this mean the team will prefer to accomplish its task by making internal decision and internal change compared to having to coordinate with other team, and we should structure our system to facilitate this.

To achieve this, you need to think hard about system boundary and coherency, you want to group things logically such that most tasks does not involve non-trivial work across team boundary. 

## Coherency

As the saying goes `An autonomous team is a happy team`, I totally made this up but the point is you want a team to be able to make progress without depending on others much, you want to empower the team make decision, propose change and execute things on their own

To achieve autonomous, one need to structure system such that components within the same system are coherent, ie. they tend to change together and they tend to not change when things outside of the system changes
  
## Centralize writer

Data producer should be the manager of data, we should aim to have single writer for every concept. 

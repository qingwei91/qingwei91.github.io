---
title: SQL Server how to write many rows quicker
status: ""
---

I've been dealing with SQL Server lately, mostly on the write side, one of the biggest challenge is to make the write faster.

Context: We have a simple pipeline that read from kafka and upsert the records into SQL Server, reusing the key from kafka messages.

Below are some tips I've learned:

## Do not use auto-commit when writing multiple rows

By default, MS SQL jdbc driver use implicit transaction when writing to SQL Server, this is undesirable because the overhead of transaction is very high.

This is so far the most significant factor in my case.

## Prefer Table Valued Parameters over single row

According to MSDN docs, table valued param should perform better than updating row by row, it makes sense from a logical standpoint, but I've yet observe significant differences.
Note that to use Table Valued Parameters, you need to define your update operation using a Stored Procedure, and define a corresponding Table Type on the server.

In jdbc connector, there are 3 apis that can be use to model TableValue Parameters, anedoctally, the ISQLServerDataRecord is better than SQLServerDataTable because of its streaming purpose, I am not entirely convinced and havent find evidence on this yet.


## There are 2 types of batching, client side and server side

One tip that come up a lot about SQL performance is batching, but this term can mean different thing in different cases;

If the application performing write is using MSSQL JDBC driver, then one can perform batching from the client, it essentially combine many commands into a single unit of work. This is useful when you are submitting many commands, but if you are using Table Value Parameters then you dont have to batch as there's only a single command.

Another type of batching happen on server side, typically defined in Stored Procedures by T-SQL.

The idea is to have a stored procedure taking Table Value Parameters, and then break it into chunks and perform update in chunk in a loop.

I've read a few articles claiming this is the best way, but I havent try it out. It sounds plausible because it has the least network overhead and looping is done on server side.

## Where to find docs

Oh god, MSDN doc on SQL Server is either too verbose or not on point, at least for my usage.

I did however learn to look for AzureSQL docs even if you're not using Azure, looks like that got more love.

## Concurrent commands from different clients dont work well

This is not unexpected, as SQL Server being a ACID compliant RDBMS uses locks extensively, so concurrent commands tend to create lock contentions.

Depending on the batch size, SQL Server will decide to use row-level lock or table level lock, I've seen people suggest 5000 is the threshold that control this lock escalation.

Beyond this, every row lock also correpond to a page lock because data is really stored on page, and multiple concurrent changes of different rows can still access the same page, leading to contention.

If you use clustered index (which you typically should), then your rows are layout according to the index, for example, if your clustered index is defined on an Int column in ascending order, then rows are stored on pages close to each other according to their index value, row 1 and row 2 are likely to be on the same page, where row 300000 might be further away in a different page.
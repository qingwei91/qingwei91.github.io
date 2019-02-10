# Important notes to self

## 1. Broken window effect is prevalent with code

Every time you decided to compromise code quality for whatever reason, it encourages the next person to do the same.

People are good are detecting existing pattern and follow them, often unconsciously, so it's really important to make sure existing code is reasonable well written or it can go south real quick.

Some concrete examples:
1. Do not put unrelated methods in the same file/class, this will just encourage more people to do the same and you end up with a big class with low coherency and unnecessary coupling
2. If you have a convention on how to separate concern, don't break them, eg. do not let business level concept leak into your http layer

## 2. Be extra careful on code that are automatically applied to a wide context

Sometimes we use abstraction to handle cross cutting concerns of system, while it is generally a good thing to reduce duplication, it can sometimes bring unintended consequences.

I once written a piece of code that log out all errors for all http routes on our web application, I thought it was nice until I find out I've used it on some routes that receive sensitive data, and consequently log out sensitive data into our logs, I actually did sanitize data before logging it out, but it wasn't enough because when the application evolves, you might need to revisit the sanitization code, which is easily overlooked.

## 3. Side effects, even when the seemingly unharmful ones, are harmful

Every bit of side-effects either means it's terrible to test, or not tested at all.



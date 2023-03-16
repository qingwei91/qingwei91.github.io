# 15/03/2023
## What happened?
Wow, I am 32 now!! Time really past without me noticing, I think I've improved on knowledge front, but I dont feel I've improved as a person, at least not noticeable.

Thankfully the project I am working on is going well, no major roadblock, and I am finally starting to learn Rust seriously (the last attempt was probably 2017).

## How you feel?
I am feeling fine, not great but not bad either. I am still getting the dopamine hit by solving tiny problem, this keep me going!

But on a grand scheme, I am not exactly sure what I want beyond that.

I am glad that we've organized a trip with family though, as a way to repay their love.

## What have you learn?

I learned quite a bit with Flink SQL, beyond basic, I've learned to

* Have an effective workflow on develop and troubleshoot
* Implement PIVOT in FLINKSQL
* Understand query plan to a certain extent

I also learned about Rust, some early learnings:

I realize why GADT is special, it allows expressing relationship between Types, where you can forget about them and regain it back as needed, why to forget you might ask?
By forgetting I really mean being able to comply to a more general type contract, for example:

```scala
sealed trait SampleGADT[A]
case class Rel[A, B](a: A, f: A => B) extends SampleGADT[A]
```

Here `Rel` encode a relationship between type A and B, both generic, all we know is that A can be different from B, but not necessarily so. Rel type tells us there's a value A, together with a way to convert A to B. But it is also forgetful because it complies to `SampleGADT[A]`, meaning every place that takes a `SampleGADT[A]` can take `Rel[A, ?]` without caring about what B is, thus forgetting it.

But we can also regain this info, in pattern matching, granted if a function take `SampleGADT[A]`, it can only tell that `Rel` 1st type param is `A`, but it wont know what B is, and that's fine, it will at least know B exists, I suspect this makes B an existential type in that context, but my lack of knowledge makes me not able to confirm.

This does not work in Rust, because the core proposition of Rust (the safe world at least), is to be memory safe, 1 principle is no use after free. This is achieved by generating automatic free at compile time, to do so Rust need some information:

* Ownership - the idea of owner determine when and where can a piece of data be drop and thus freeing up memory, there can only ever be 1 owner which is typically a variable binding, with owner, rust can figure out that a variable has gone out of scope and thus can be freed.
* Borrow - while data can only have 1 owner, it is super common for a piece of data being used in multiple places in code, in Rust every function forms a boundary, and passing variable to function transfer ownership, this can be avoided by borrowing, borrowing let us use variable without owning it, meaning code that use reference can never drop/free the memory. However references have lifetime, to determine when does the reference itself get drop, reference is likely very cheap, so memory isnt a concern, it needs to be drop because it has to follow rules that enforce the rule of single writer, ie. there can not be more than 1 mutable reference to the same variable at the same time, where time is defined by the idea of lifetime

So what does this has to do with GADT? In Rust, all data by default are allocated on Stack instead of Heap, Stack Allocation requires compiler to know about the size of all memory used up front so that when the stack is pop out, the same memory region can be removed. With this context, GADT does not work in Rust, because if a function only take `SampleGADT[A]` it cant tell how much memory it needs because it does not know what `B` can be. GC language get away with this by allocating on Heap by default, so everything is a reference, and always take the same amount of memory on stack.

In rust there's some escape hatch for Heap Allocation though, like Box and dyn. I dont know if we can use it to break the constraint here, I suspect they are only here to occasionally workaround problem. For example, recursive data struct need to use Box.

Tim recommended me to use Trait instead, and hide the whole ADT behind Trait, the only problem is that we cant specify the output type of trait method as a trait, and specifying it as Generic does not work because I dont know how to implement the method to return a Generic. (I suspect the compiler can add restriction here, there is no way a function can return a generic without taking it).

I also have an idea to make a tiny webpage that takes csv and generate SQL literal statement for testing purpose.
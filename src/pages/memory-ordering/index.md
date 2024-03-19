---
title: Attempt to understand memory ordering
date: "2024-03-02"
---

I am reading the book [Rust Atomics and Locks](https://marabos.nl/atomics/). The book focuses on low level concurrency construct.

One part I find confusing is memory ordering, I wish to write down my understanding to make sure I really do understand them.

The rest of text assumes basic knowledge about concurrency, atomics.

Let's start with what problem memory ordering is trying to address.

## Instruction reordering

Fundamentally, all code get compiled to machine instructions, they can be largely group into `data access`, `operation` and `control`.

One interesting thing is that compiler or your process might decide to order them differently from your code. To my knowledge this is mostly for optimization purpose, this reodering does guarantee the same semantic, so that your program's output/outcome does not change under such reordering.

However, this guarantee only stand within a single thread/processor context, ie. your program semantic will not change if its a single thread program.

Here's a sample code snippet:

```rust

let mut a = 8.0;
let mut b = 8.0;

a = 18;
b = 21;

print!("{?:}", a);
```

In practice, maybe the print statement might be executed right after the mutation of `a` variable, before `b` mutation. But the program will end the same, printing 18.

In a multi-threaded program where more than a thread shares data, there's no guarantee that the program semantic is identical and consistent though.

For example,

```rust
static shared_var_a: Atomic<u32> = Atomic::new(2);
static shared_var_b: Atomic<u32> = Atomic::new(2);

fn thread_a() -> () {
    shared_var_a.set(20);
    shared_var_b.set(99);
}

fn thread_b() -> () {
    let a = shared_var_a.load();
    let b = shared_var_b.load();

    print!("{?:} - {?:}", a, b);
}
```

It is reasonable to expect this to print:

* 20 - 99
* 2 - 2
* 20 - 2

But it can also print `2 - 99`, note this means thread_b might observe the change of var_b without observing var_a changes. This happens because of reordering.

Note the code snippet above might not compile, but I hope the point is clear.

## Enforcing memory ordering

How can we understand or control a multi-threaded program behavior when instruction reordering is possible?

Naively, we can either disable reordering, which typically results in worse performance. Or we can accept it as a fact and write our program to accommodate.

Both are not ideal, sometime performance is really important, not getting any guarantee is also bad, for example you cant synchronize more than one shared memory across multiple threads.

To solve this problem, memory ordering was introduced, there are different types of memory ordering.

Memory ordering can be specified when accessing atomic variables, or via fences.

### Relaxed ordering

Relaxed ordering is the least restricted (thus most performant) ordering. It guarantees that changes of a single atomic variable are observed in the same order, ie changes cannot be observed to go back in time.

For example

```rust
static shared_var_a: Atomic<u32> = Atomic::new(0);

fn thread_a() -> () {
    shared_var_a.set(2);
    shared_var_a.set(10);
}

fn thread_b() -> () {
    let a = shared_var_a.load();
    let b = shared_var_a.load();

    print!("{?:} - {?:}", a, b);
}
```

In thread_b, b can only be larger or equal to a, b can never be smaller than a, as that implies the 2nd load observe an older value from thread_a.

Otherwise, relaxed does not provide any guarantee, importantly it does not guarantee any ordering across multiple independent variables.

### Acquire Release ordering

A common ordering is called Acquire Release ordering, this ordering works in pair.

When reading from shared memory, we specify Acquire ordering. When writing to shared memory we specify Release ordering.

Then we can establish `Happens before` relationship between the write and read operation (ie. between release and acquire).

The rules are as follow:

1. All memory operations that happen before `Release` must stay before `Release`
2. All memory operations that happen after `Acquire` must stay after `Acquire`

Then when the Acquire operation in Thread A observed change from the Release operation in Thread B, then Thread A and B are said to be synchronized.


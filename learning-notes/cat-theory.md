# Category theory notes

Category comprised of

* Objects
* Morphisms

and morphism composes, ie if there's M1 from A to B, and M2 from B to C, then there exists M3 from A to C

## Functor

Functor is a **transformation** between two category, it has 2 parts

* Transform object in Category A to Category B
* Transform morphism in Category A to Category B

The idea is that the structure is preserved, meaning if there's M1 from A to B, then under transformation F, there will be a F(M1) from F(A) to F(B)

## Monad

Monad is a specific type of Functor, from a Category A back to the same Category A.
 
# Reading list
* https://www.reddit.com/r/math/comments/ap25mr/a_monad_is_a_monoid_in_the_category_of/

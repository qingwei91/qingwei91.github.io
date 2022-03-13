## About languages

I am reading about languages lately, to create foundation for building query language.

My current goal is to understand and able to comprehend the following concepts:

### Formal Language
A formal language consists of words made up from symbols in an alphabet set which are well-formed.

Alphabet is a set of symbols that exists in a Formal Language.
Well-formness is a quality of word that determine if a word obey rules defined by a language or not.

### Regular Language
Regular language is defined as language where computing whether a word belongs to the language takes finite memory, it is typically defined as can be modeled by Finite State Machine.

Basically given an arbitrary word W, tell if W belongs to a language R or not, if we can compute the result with finite memory, then R is a regular langauge.

### Finite Language
Finite Language means language with finite amount of words, and finite languae is regular language because with a finite amount of word, determining membership only requires finite memory. But not all Regular Language are Finite Language.

### Chomsky Grammar's Hierarchy

Noam Chomsky define a hierarchy of grammar, it categorizes Grammer into 4 type.

Type 0 - The most unrestricted grammar, can be recognized by Turing Machine, this is the most general type
Type 1 - Context sensitive grammar

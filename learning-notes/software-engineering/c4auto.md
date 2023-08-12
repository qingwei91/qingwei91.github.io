# Design note for c4 diagram tool

## Goals

### Mandatory
1. Code to diagram
2. Ability to move between layers
3. Allow Input Output to punch through layers

### Optional
1. Diagram editting tool

## Design

### Core concepts

C4 Diagram are essentially graphs with scope, so we will reuse all primitives from Graph, ie. vertex and edge (directional)

On top of that, we will introduce some higher level idea:

#### Box
This is effectively a vertex, with some extra properties:

1. Name
2. Scope (optional)
3. KV pairs
4. Optional Input and Output

#### Arrow

This is effectively an edge, with name. One thing special is that an arrow can punch through layers, for now we will use the idea of mapping to represent such case, this means a data flow can appear in more than 1 layer.

Though in such case, it will appear slightly differently in different layer, because as it punches through layer, it will get more information and thus connecting boxes with more details.

#### Layer

* A layer contains 0..* input and 0..* output.
* A layer contains 0..* entities

### DSL
This need to be easy to write, and extensible. All entities (ie. Box and Arrow) can either be identified by id or be anonymous. Identified entity can be reused and referenced.

TODO: How to model the punch through arrow?

#### Example

```
box1 --> box2

layer:box1 {
    box8 --> box9
    box8 --> box10
    box11 --> box10
}
```

## Iterations

### Phase 1

[x] Implement Parser (use Parser Gen)
[x] Convert to core data structure
[x] Use Egui to render basic view
[ ] Render zoom in effect

Current state thinking:

* Parsing is straightforward with help of parse gen
* Core data structure settled on LayeredGraph
* Layout on UI is complex, because it requires global knowledge, it cannot be built bottom-up, and has to be done top-bottom
* One potential way to simplify is to treat each small component as a widget that is self contained, without position, then sort out their position in the global layout phase. This way we can at least deal with the widget size/shape/content in a contained way.
------

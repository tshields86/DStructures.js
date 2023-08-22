# DStructures.js

Welcome to DStructures.js! This package provides implementations of various data structures and algorithms in JavaScript. Navigate through specific directories to get a deeper understanding of each component.

## Table of Contents

- [Data Structures](#data-structures)
- [Algorithms](#algorithms)
- [Installation](#installation)
- [Getting Started](#getting-started)

## Data Structures

- [Linked List](src/data-structures/linked-list/README.md)
- [Doubly Linked List](src/data-structures/doubly-linked-list/README.md)
- [Stack](src/data-structures/stack/README.md)
- [Queue](src/data-structures/queue/README.md)
- [Tree](src/data-structures/tree/README.md)
- [Heap](src/data-structures/heap/README.md)
- [Priority Queue](src/data-structures/priority-queue/README.md)
- [Hash Set](src/data-structures/hash-set/README.md)
- [Set](src/data-structures/set/README.md)
- [Map](src/data-structures/map/README.md)

(Note: For specific details on each data structure, click on the respective link.)

## Algorithms

- [Sorting](src/algorithms/sorting/README.md)
- [Search](src/algorithms/search/README.md)
- [Graph](src/algorithms/graph/dijkstra/README.md)

(Note: For specific details on each algorithm, click on the respective link.)

## Installation

To utilize these data structures and algorithms in your projects:

1. Clone the repository.
2. Navigate to the `src` directory.
3. Import the desired modules into your project.

## Getting Started

Here's a simple example to get started with the Linked List data structure:

```javascript
const { LinkedList } = require('DStructures.js');

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);

console.log(list.toString());  // Outputs: 1,2,3
```

For more detailed usage and API descriptions, please refer to the individual READMEs of each data structure or algorithm.

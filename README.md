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

```sh
npm install --save dstructures.js
```

## Getting Started

Here's a simple example to get started with the Linked List data structure:

```javascript
const { LinkedList } = require('DStructures.js');

const list = new LinkedList();
list.addLast(1);
list.addLast(2);
list.addLast(3);

console.log(list.toArray());  // Outputs: [1, 2, 3]
```

For more detailed usage and API descriptions, please refer to the individual READMEs of each data structure or algorithm.

### Require
```js
const {
  BinarySearchTree, BinarySearchTreeNode,
  DoublyLinkedList, DoublyLinkedListNode,
  Graph, GraphVertex,
  HashMap,
  HashSet,
  Heap, MinHeap, MaxHeap,
  LinkedList, LinkedListNode,
  PriorityQueue, PriorityQueueNode,
  Queue,
  Stack,
  binarySearch,
  bubbleSort,
  dijkstra,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} = require('dstructures.js');
```

### Import
```js
import {
  BinarySearchTree, BinarySearchTreeNode,
  DoublyLinkedList, DoublyLinkedListNode,
  Graph, GraphVertex,
  HashMap,
  HashSet,
  Heap, MinHeap, MaxHeap,
  LinkedList, LinkedListNode,
  PriorityQueue, PriorityQueueNode,
  Queue,
  Stack,
  binarySearch,
  bubbleSort,
  dijkstra,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from 'dstructures.js';
```

### Extend
Data structures are implemented as ES6 classes and can be extended for additional functionality.

```js
const { Graph } = require('dstructures.js');

class CustomGraph extends Graph {
  shortestPath(start, end) {
    // code here
  }
}
```

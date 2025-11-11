# DStructures.js

> A comprehensive, type-safe collection of data structures and algorithms implemented in TypeScript

[![npm version](https://img.shields.io/npm/v/dstructures.js.svg)](https://www.npmjs.com/package/dstructures.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## Features

- **Type-Safe**: Written in TypeScript with full generic support
- **Modern**: ESM modules, latest JavaScript features
- **Well-Tested**: 555+ comprehensive tests with 100% coverage goals
- **Documented**: Complete TypeDoc documentation with examples
- **Performant**: Optimized implementations with complexity analysis
- **Zero Dependencies**: Lightweight and self-contained

## Installation

```bash
npm install dstructures.js
```

## Quick Start

```typescript
import { LinkedList, HashMap, dijkstra, mergeSort } from 'dstructures.js';

// Use a LinkedList
const list = new LinkedList<number>([1, 2, 3]);
list.push(4);
console.log([...list]); // [1, 2, 3, 4]

// Use a HashMap
const map = new HashMap<string, number>();
map.set('one', 1).set('two', 2);
console.log(map.get('one')); // 1

// Sort an array
const arr = [5, 2, 8, 1, 9];
mergeSort(arr);
console.log(arr); // [1, 2, 5, 8, 9]
```

## Table of Contents

- [Data Structures](#data-structures)
- [Algorithms](#algorithms)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

## Data Structures

### Linear Data Structures

#### LinkedList
Singly linked list with O(1) insertion/deletion at head/tail.

```typescript
import { LinkedList } from 'dstructures.js';

const list = new LinkedList<string>();
list.push('a').push('b').push('c');
list.unshift('start');
console.log(list.toArray()); // ['start', 'a', 'b', 'c']
```

#### DoublyLinkedList
Doubly linked list with efficient bidirectional traversal.

```typescript
import { DoublyLinkedList } from 'dstructures.js';

const list = new DoublyLinkedList<number>([1, 2, 3]);
list.reverse();
console.log([...list]); // [3, 2, 1]
```

#### Stack
LIFO (Last In First Out) data structure.

```typescript
import { Stack } from 'dstructures.js';

const stack = new Stack<string>();
stack.push('first').push('second').push('third');
console.log(stack.pop()); // 'third'
console.log(stack.peek()); // 'second'
```

#### Queue
FIFO (First In First Out) data structure.

```typescript
import { Queue } from 'dstructures.js';

const queue = new Queue<number>();
queue.add(1).add(2).add(3);
console.log(queue.remove()); // 1
console.log(queue.peek()); // 2
```

### Tree Data Structures

#### BinarySearchTree
Self-balancing binary search tree with O(log n) operations.

```typescript
import { BinarySearchTree } from 'dstructures.js';

const bst = new BinarySearchTree<number>();
bst.insert(5).insert(3).insert(7).insert(1);
console.log(bst.contains(3)); // true
console.log([...bst.inOrderTraversal()]); // [1, 3, 5, 7]
```

### Heap Data Structures

#### MinHeap / MaxHeap
Binary heap for efficient priority queue operations.

```typescript
import { MinHeap, MaxHeap } from 'dstructures.js';

const minHeap = new MinHeap<number>();
minHeap.offer(5).offer(2).offer(8).offer(1);
console.log(minHeap.poll()); // 1

const maxHeap = new MaxHeap<number>();
maxHeap.offer(5).offer(2).offer(8).offer(1);
console.log(maxHeap.poll()); // 8
```

#### PriorityQueue
Priority queue built on heap with customizable priority.

```typescript
import { PriorityQueue } from 'dstructures.js';

const pq = new PriorityQueue<string>();
pq.offer('low priority', 5);
pq.offer('high priority', 1);
pq.offer('medium priority', 3);

console.log(pq.poll()); // 'high priority'
console.log(pq.poll()); // 'medium priority'
```

### Hash-Based Data Structures

#### HashMap
Hash table with O(1) average operations and insertion order maintenance.

```typescript
import { HashMap } from 'dstructures.js';

const map = new HashMap<string, number>();
map.set('apple', 1).set('banana', 2).set('cherry', 3);

for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
```

#### HashSet
Set implementation with O(1) operations and set theory methods.

```typescript
import { HashSet } from 'dstructures.js';

const set1 = new HashSet(['a', 'b', 'c']);
const set2 = new HashSet(['b', 'c', 'd']);

const union = set1.union(set2);
const intersection = set1.intersection(set2);
const difference = set1.difference(set2);

console.log([...union]); // ['a', 'b', 'c', 'd']
console.log([...intersection]); // ['b', 'c']
console.log([...difference]); // ['a']
```

### Graph Data Structures

#### Graph
Directed/undirected graph with weighted edges and traversal algorithms.

```typescript
import { Graph, EdgeDirection } from 'dstructures.js';

const graph = new Graph<string>(EdgeDirection.UNDIRECTED);
graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 3);
graph.addEdge('A', 'C', 10);

console.log(graph.areConnected('A', 'C')); // true

const path = graph.findPath('A', 'C');
console.log(path.map(v => v.value)); // ['A', 'B', 'C']

// BFS traversal
const startVertex = graph.getVertex('A')!;
for (const vertex of Graph.bfs(startVertex)) {
  console.log(vertex.value);
}
```

## Algorithms

### Sorting Algorithms

All sorting algorithms support custom comparators and work in-place.

```typescript
import { bubbleSort, insertionSort, selectionSort, mergeSort, quickSort } from 'dstructures.js';

const arr = [5, 2, 8, 1, 9];

// Different sorting algorithms
bubbleSort(arr);      // O(n²) - Simple, stable
insertionSort(arr);   // O(n²) - Good for small/nearly sorted
selectionSort(arr);   // O(n²) - Minimal swaps
mergeSort(arr);       // O(n log n) - Stable, predictable
quickSort(arr);       // O(n log n) average - Fast in practice

// Custom comparator for descending order
quickSort(arr, (a, b) => b - a);

// Sort objects by property
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

mergeSort(people, (a, b) => a.age - b.age);
```

**Sorting Algorithm Comparison:**

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

### Search Algorithms

#### Binary Search
Efficient O(log n) search in sorted arrays.

```typescript
import { binarySearch, binarySearchRecursive } from 'dstructures.js';

const sortedArray = [1, 3, 5, 7, 9, 11, 13];

const index = binarySearch(sortedArray, 7);
console.log(index); // 3

// Recursive variant
const index2 = binarySearchRecursive(sortedArray, 7);

// Search strings
const names = ['Alice', 'Bob', 'Charlie', 'David'];
const idx = binarySearch(names, 'Charlie', (a, b) => a.localeCompare(b));
console.log(idx); // 2
```

### Graph Algorithms

#### Dijkstra's Shortest Path
Find shortest paths in weighted graphs.

```typescript
import { dijkstra, getShortestPath, getShortestDistance } from 'dstructures.js';
import { Graph, EdgeDirection } from 'dstructures.js';

const graph = new Graph<string>(EdgeDirection.DIRECTED);
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'B', 1);

const result = dijkstra(graph, 'A');

// Get shortest distance from A to D
const distance = getShortestDistance(result, graph.getVertex('D')!);
console.log(distance); // 8

// Get shortest path from A to D
const path = getShortestPath(result, graph.getVertex('D')!);
console.log(path.map(v => v.value)); // ['A', 'C', 'B', 'D']
```

## Usage Examples

### Building a Task Scheduler

```typescript
import { PriorityQueue } from 'dstructures.js';

interface Task {
  name: string;
  priority: number;
}

const taskQueue = new PriorityQueue<Task>((a, b) => a - b);

taskQueue.offer({ name: 'Bug fix', priority: 1 });
taskQueue.offer({ name: 'Feature', priority: 5 });
taskQueue.offer({ name: 'Critical bug', priority: 0 });

while (!taskQueue.isEmpty()) {
  const task = taskQueue.poll();
  console.log(`Processing: ${task?.name}`);
}
// Output:
// Processing: Critical bug
// Processing: Bug fix
// Processing: Feature
```

### LRU Cache

```typescript
import { DoublyLinkedList, HashMap } from 'dstructures.js';

class LRUCache<K, V> {
  private capacity: number;
  private map: HashMap<K, { key: K; value: V }>;
  private list: DoublyLinkedList<{ key: K; value: V }>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new HashMap();
    this.list = new DoublyLinkedList();
  }

  get(key: K): V | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;

    // Move to front (most recently used)
    const index = this.list.indexOf(entry);
    if (index !== -1) {
      this.list.remove(index);
      this.list.unshift(entry);
    }

    return entry.value;
  }

  put(key: K, value: V): void {
    const entry = { key, value };

    if (this.map.has(key)) {
      const oldEntry = this.map.get(key)!;
      const index = this.list.indexOf(oldEntry);
      if (index !== -1) this.list.remove(index);
    }

    this.list.unshift(entry);
    this.map.set(key, entry);

    if (this.map.size > this.capacity) {
      const removed = this.list.pop();
      if (removed) this.map.delete(removed.key);
    }
  }
}
```

### Finding Connected Components in a Graph

```typescript
import { Graph, EdgeDirection } from 'dstructures.js';

const graph = new Graph<number>(EdgeDirection.UNDIRECTED);

// Create graph with disconnected components
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(4, 5);

function findConnectedComponents<T>(graph: Graph<T>): T[][] {
  const visited = new Set<T>();
  const components: T[][] = [];

  for (const vertex of graph.getAllVertices()) {
    if (!visited.has(vertex.value)) {
      const component: T[] = [];

      for (const v of Graph.bfs(vertex)) {
        visited.add(v.value);
        component.push(v.value);
      }

      components.push(component);
    }
  }

  return components;
}

const components = findConnectedComponents(graph);
console.log(components); // [[1, 2, 3], [4, 5]]
```

## API Documentation

Complete API documentation is available at [https://yourdocs.com](https://yourdocs.com) (generated with TypeDoc).

All classes and functions include:
- Full type signatures
- Parameter descriptions
- Return value documentation
- Time and space complexity analysis
- Usage examples

## Performance

All data structures and algorithms include Big O complexity analysis:

### Data Structure Operations

| Data Structure | Access | Search | Insert | Delete | Space |
|----------------|--------|--------|--------|--------|-------|
| LinkedList | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| DoublyLinkedList | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| BinarySearchTree | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Heap | O(1)** | O(n) | O(log n) | O(log n) | O(n) |
| HashMap | N/A | O(1)† | O(1)† | O(1)† | O(n) |
| HashSet | N/A | O(1)† | O(1)† | O(1)† | O(n) |
| Graph | O(1) | O(V+E) | O(1) | O(V) | O(V+E) |

\* At head/tail
\*\* Peek/top only
† Average case, O(n) worst case

## TypeScript Support

This library is written in TypeScript and provides full type definitions:

```typescript
import { LinkedList, HashMap, PriorityQueue } from 'dstructures.js';

// Full generic support
const numberList = new LinkedList<number>();
const stringMap = new HashMap<string, number>();
const taskQueue = new PriorityQueue<{ id: number; name: string }>();

// Type inference
for (const item of numberList) {
  // item is inferred as number
  console.log(item.toFixed(2));
}
```

## Browser Support

This package uses ESM modules and modern JavaScript features. It requires:
- Node.js 14+
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

For older environments, use a transpiler like Babel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Changelog

### v2.0.0 (Current)

- Complete TypeScript rewrite
- Modern ESM modules
- Full generic type support
- 555+ comprehensive tests
- Improved performance
- Added HashSet
- Added Graph algorithms (DFS, BFS, Dijkstra)
- Breaking changes from v1.x (see migration guide)

### v1.0.4 (Legacy)

- Original JavaScript implementation
- CommonJS modules

## Migration from v1.x

See [MIGRATION.md](./MIGRATION.md) for detailed migration guide from v1.x to v2.x.

Key changes:
- ESM modules instead of CommonJS (`import` instead of `require`)
- TypeScript with full type safety
- Some method name changes for consistency
- Improved API ergonomics

## Acknowledgments

Inspired by classic data structure implementations and modern best practices.

## Support

- Report bugs via [GitHub Issues](https://github.com/yourusername/dstructures.js/issues)
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/dstructures.js) with tag `dstructures.js`
- Follow [@yourusername](https://twitter.com/yourusername) for updates

# Heap

A binary heap implementation that maintains a complete binary tree with the heap property, where each parent node is ordered relative to its children. Supports both min-heap (smallest element at top) and max-heap (largest element at top) configurations.

## Overview

A heap is a complete binary tree data structure that satisfies the heap property. In a min-heap, every parent node is less than or equal to its children, ensuring the smallest element is always at the root. In a max-heap, every parent node is greater than or equal to its children, keeping the largest element at the root.

Heaps are implemented using arrays where for any element at index `i`:
- Parent is at index `⌈i/2⌉ - 1`
- Left child is at index `2i + 1`
- Right child is at index `2i + 2`

This structure makes heaps ideal for implementing priority queues and efficiently finding the k largest or smallest elements in a dataset.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert (offer) | O(log n) | O(log n) |
| Remove root (poll) | O(log n) | O(log n) |
| Peek root | O(1) | O(1) |
| Search | O(n) | O(n) |
| Remove arbitrary | O(n log n) | O(n log n) |
| Build heap | O(n) | O(n) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { Heap, MinHeap, MaxHeap } from 'dstructures.js';

// Create a min-heap (smallest element at top)
const minHeap = new MinHeap<number>();
minHeap.offer(5);
minHeap.offer(3);
minHeap.offer(7);
minHeap.offer(1);
console.log(minHeap.peek()); // 1 (smallest)

// Create a max-heap (largest element at top)
const maxHeap = new MaxHeap<number>();
maxHeap.offer(5);
maxHeap.offer(3);
maxHeap.offer(7);
maxHeap.offer(1);
console.log(maxHeap.peek()); // 7 (largest)

// Create a heap with custom comparator
const customHeap = new Heap<number>((a, b) => a - b); // min-heap

// Basic operations
maxHeap.offer(10);        // Add element
const top = maxHeap.poll();  // Remove and return top element
const peek = maxHeap.peek(); // View top without removing
console.log(maxHeap.size);   // Number of elements
console.log(maxHeap.isEmpty()); // Check if empty

// Query operations
console.log(maxHeap.has(5));    // Check if value exists
const indices = maxHeap.find(3); // Find all indices of value

// Transform
const arr = maxHeap.toArray();   // Convert to array (heap order)
maxHeap.clear();                 // Remove all elements
```

## Advanced Examples

### Priority Queue for Task Management

```typescript
interface Task {
  name: string;
  priority: number;
  deadline: Date;
}

// Create a priority queue (min-heap based on priority)
const taskQueue = new Heap<Task>((a, b) => a.priority - b.priority);

taskQueue.offer({ name: 'Fix critical bug', priority: 1, deadline: new Date('2025-11-11') });
taskQueue.offer({ name: 'Write documentation', priority: 3, deadline: new Date('2025-11-15') });
taskQueue.offer({ name: 'Review PR', priority: 2, deadline: new Date('2025-11-12') });

// Process tasks by priority
while (!taskQueue.isEmpty()) {
  const task = taskQueue.poll();
  console.log(`Processing: ${task?.name}`);
}
// Output:
// Processing: Fix critical bug
// Processing: Review PR
// Processing: Write documentation
```

### Finding Top K Elements

```typescript
// Find the k largest elements in an array
function findKLargest(arr: number[], k: number): number[] {
  const minHeap = new MinHeap<number>();

  for (const num of arr) {
    minHeap.offer(num);
    if (minHeap.size > k) {
      minHeap.poll(); // Remove smallest
    }
  }

  return minHeap.toArray();
}

const numbers = [3, 1, 5, 12, 2, 11, 9, 6];
const top3 = findKLargest(numbers, 3);
console.log(top3); // [9, 11, 12]

// Find the k smallest elements
function findKSmallest(arr: number[], k: number): number[] {
  const maxHeap = new MaxHeap<number>();

  for (const num of arr) {
    maxHeap.offer(num);
    if (maxHeap.size > k) {
      maxHeap.poll(); // Remove largest
    }
  }

  return maxHeap.toArray();
}

const bottom3 = findKSmallest(numbers, 3);
console.log(bottom3); // [1, 2, 3]
```

### Running Median

```typescript
class MedianFinder {
  private maxHeap: MaxHeap<number>; // Lower half
  private minHeap: MinHeap<number>; // Upper half

  constructor() {
    this.maxHeap = new MaxHeap<number>();
    this.minHeap = new MinHeap<number>();
  }

  addNum(num: number): void {
    // Add to max heap first
    this.maxHeap.offer(num);

    // Balance: ensure max heap's largest <= min heap's smallest
    const largest = this.maxHeap.poll();
    if (largest !== null) {
      this.minHeap.offer(largest);
    }

    // Balance sizes: max heap can have at most 1 more element
    if (this.minHeap.size > this.maxHeap.size) {
      const smallest = this.minHeap.poll();
      if (smallest !== null) {
        this.maxHeap.offer(smallest);
      }
    }
  }

  findMedian(): number {
    if (this.maxHeap.size > this.minHeap.size) {
      return this.maxHeap.peek()!;
    }
    const maxTop = this.maxHeap.peek() ?? 0;
    const minTop = this.minHeap.peek() ?? 0;
    return (maxTop + minTop) / 2;
  }
}

const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // 2
```

### Custom Comparators for Complex Objects

```typescript
interface Meeting {
  title: string;
  startTime: number;
  duration: number;
}

// Sort by earliest start time
const meetingsByTime = new Heap<Meeting>(
  (a, b) => a.startTime - b.startTime
);

// Sort by shortest duration
const meetingsByDuration = new Heap<Meeting>(
  (a, b) => a.duration - b.duration
);

// Sort by end time (start + duration)
const meetingsByEndTime = new Heap<Meeting>(
  (a, b) => (a.startTime + a.duration) - (b.startTime + b.duration)
);

meetingsByTime.offer({ title: 'Standup', startTime: 900, duration: 15 });
meetingsByTime.offer({ title: 'Planning', startTime: 1000, duration: 60 });
meetingsByTime.offer({ title: 'Review', startTime: 930, duration: 30 });

const nextMeeting = meetingsByTime.peek();
console.log(nextMeeting?.title); // 'Standup' (earliest start)
```

### Method Chaining

```typescript
const heap = new MinHeap<number>();
heap
  .offer(10)
  .offer(5)
  .offer(15)
  .offer(3)
  .removeValue(5)
  .offer(1);

console.log(heap.peek()); // 1
```

## API Reference

### Heap Class

The base heap class that can be configured with any comparison function.

#### Constructor

- **`new Heap<T>(compareFn?)`** - Creates a new heap with optional comparison function
  - `compareFn`: `(a: T, b: T) => number` - Return negative if a < b, positive if a > b, zero if equal
  - Default: `(a, b) => a - b` (min-heap behavior)

#### Properties

- **`size`** - Number of elements in the heap
- **`container`** - Protected array storing heap elements

#### Insertion Methods

- **`offer(value)`** / **`add(value)`** - Add element to heap and maintain heap property. Returns `this` for chaining. *O(log n)*

#### Removal Methods

- **`poll()`** / **`remove()`** - Remove and return the top element (min or max). Returns `null` if empty. *O(log n)*
- **`removeValue(value)`** - Remove all occurrences of a specific value. Returns `this` for chaining. *O(n log n)*
- **`clear()`** - Remove all elements from the heap. *O(1)*

#### Access Methods

- **`peek()`** - Return the top element without removing it. Returns `null` if empty. *O(1)*

#### Query Methods

- **`isEmpty()`** - Check if heap has no elements. *O(1)*
- **`has(value)`** - Check if value exists in heap. *O(n)*
- **`find(value)`** - Find all indices where value exists. Returns array of indices. *O(n)*

#### Transformation Methods

- **`toArray()`** - Convert to array in heap order (not sorted). *O(1)*

#### Protected Methods

- **`heapifyUp(startIdx?)`** - Restore heap property by moving element up. *O(log n)*
- **`heapifyDown(startIdx?)`** - Restore heap property by moving element down. *O(log n)*

### MinHeap Class

Extends `Heap` with min-heap ordering (smallest element at top).

#### Constructor

- **`new MinHeap<T>()`** - Creates a min-heap where smallest element is at root

Inherits all methods from `Heap` class.

### MaxHeap Class

Extends `Heap` with max-heap ordering (largest element at top).

#### Constructor

- **`new MaxHeap<T>()`** - Creates a max-heap where largest element is at root

Inherits all methods from `Heap` class.

## When to Use

**Use Heap when:**
- You need to efficiently find and remove the minimum or maximum element repeatedly
- Implementing a priority queue
- Finding the k largest or smallest elements in a dataset
- Maintaining a running median of a stream of numbers
- Implementing Dijkstra's algorithm or A* search
- Scheduling tasks by priority
- Merging k sorted arrays or lists

**Consider alternatives when:**
- You need to access arbitrary elements efficiently → Use Array or HashMap
- You need sorted order iteration → Use BinarySearchTree
- You need both min and max operations on the same data → Use two heaps or TreeMap
- You need to frequently search for specific values → Use HashSet or BinarySearchTree

## Implementation Notes

This implementation:
- Uses array-based storage for cache-friendly memory layout
- Provides both `Heap` base class and specialized `MinHeap`/`MaxHeap` classes
- Supports custom comparison functions for complex objects
- Uses generic types for full TypeScript support
- Index calculations: parent at `⌈i/2⌉ - 1`, children at `2i + 1` and `2i + 2`
- All mutating operations that don't remove elements return the heap instance for method chaining
- Maintains the complete binary tree property for optimal O(log n) operations
- `poll()` and `offer()` operations maintain heap invariant through heapify operations

# DoublyLinkedList

A doubly linked list implementation that maintains references to both the first (head) and last (tail) elements, with each node containing references to both the next and previous nodes, enabling efficient bidirectional traversal and O(1) operations at both ends.

## Overview

A doubly linked list is a linear data structure where elements are stored in nodes. Each node contains a value, a reference to the next node, and a reference to the previous node in the sequence. This bidirectional linking allows for efficient traversal in both directions and enables O(1) deletion at both ends. Unlike singly linked lists, doubly linked lists use more memory due to the extra `prev` pointer but provide better performance for certain operations.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Access by index | O(n/2) | O(n/2) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(1) | O(1) |
| Insert at index | O(n) | O(n) |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(1) | O(1) |
| Delete at index | O(n) | O(n) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { DoublyLinkedList } from 'dstructures.js';

// Create an empty list
const list = new DoublyLinkedList<number>();

// Create from an iterable
const list2 = new DoublyLinkedList([1, 2, 3, 4, 5]);

// Add elements
list.push(1);        // Add to end: [1]
list.push(2);        // [1, 2]
list.unshift(0);     // Add to beginning: [0, 1, 2]
list.add(1, 99);     // Insert at index 1: [0, 99, 1, 2]

// Remove elements
list.pop();          // Remove from end: [0, 99, 1] - O(1)!
list.shift();        // Remove from beginning: [99, 1]
list.remove(0);      // Remove at index: [1]

// Access elements
const first = list.getFirst();    // Get first element
const last = list.getLast();      // Get last element
const at = list.get(0);           // Get element at index

// Query the list
console.log(list.size);           // Number of elements
console.log(list.isEmpty());      // Check if empty
console.log(list.contains(1));    // Check if value exists
console.log(list.indexOf(1));     // Get index of value

// Transform
list.reverse();                   // Reverse the list
const arr = list.toArray();       // Convert to array
```

## Advanced Examples

### Method Chaining

```typescript
const list = new DoublyLinkedList<number>();
list.push(1).push(2).push(3).push(4);
// [1, 2, 3, 4]
```

### Finding Elements

```typescript
const list = new DoublyLinkedList([10, 20, 30, 40]);

// Find first element matching condition
const found = list.find(value => value > 25);
console.log(found); // 30

// Get index of element
const index = list.indexOf(30);
console.log(index); // 2
```

### Bidirectional Iteration

```typescript
const list = new DoublyLinkedList(['a', 'b', 'c', 'd']);

// Forward iteration using for...of
for (const value of list) {
  console.log(value); // a, b, c, d
}

// Forward iteration using forEach
list.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// Manual backward iteration using nodes
let node = list.tail;
while (node) {
  console.log(node.value); // d, c, b, a
  node = node.prev;
}

// Convert to array
const array = [...list];
```

### Efficient Tail Deletion

```typescript
const queue = new DoublyLinkedList<string>();
queue.push('first');
queue.push('second');
queue.push('third');

// Efficient O(1) removal from both ends
const head = queue.shift();     // 'first' - O(1)
const tail = queue.pop();       // 'third' - O(1) unlike singly linked list!
console.log([...queue]);        // ['second']
```

### Working with Objects

```typescript
interface Task {
  id: number;
  name: string;
  priority: number;
}

const tasks = new DoublyLinkedList<Task>();
tasks.push({ id: 1, name: 'Write docs', priority: 1 });
tasks.push({ id: 2, name: 'Fix bug', priority: 2 });
tasks.push({ id: 3, name: 'Add feature', priority: 3 });

// Find high priority task
const urgent = tasks.find(task => task.priority === 1);
console.log(urgent?.name); // 'Write docs'

// Access from either end efficiently
const firstTask = tasks.getFirst();
const lastTask = tasks.getLast();

// Remove from either end in O(1)
tasks.pop(); // Remove last task efficiently
```

## API Reference

### Constructor

- **`new DoublyLinkedList<T>(iterable?)`** - Creates a new doubly linked list, optionally populated from an iterable

### Properties

- **`head`** - Reference to the first node in the list
- **`tail`** - Reference to the last node in the list
- **`size`** - Number of elements in the list

### Insertion Methods

- **`addFirst(value)`** / **`unshift(value)`** - Add element to the beginning. *O(1)*
- **`addLast(value)`** / **`push(value)`** - Add element to the end. *O(1)*
- **`add(index, value)`** - Insert element at specific position. *O(n)*

### Removal Methods

- **`removeFirst()`** / **`shift()`** - Remove and return first element. *O(1)*
- **`removeLast()`** / **`pop()`** - Remove and return last element. *O(1)*
- **`remove(index)`** - Remove element at specific position. *O(n)*
- **`clear()`** - Remove all elements. *O(1)*

### Access Methods

- **`get(index)`** - Get value at index. *O(n/2)* - optimized to search from closer end
- **`getFirst()`** - Get first element. *O(1)*
- **`getLast()`** - Get last element. *O(1)*
- **`getNode(index)`** - Get node at index. *O(n/2)* - optimized to search from closer end
- **`set(index, value)`** - Replace value at index. *O(n)*

### Query Methods

- **`contains(value)`** - Check if value exists. *O(n)*
- **`indexOf(value)`** - Get index of value. *O(n)*
- **`isEmpty()`** - Check if list is empty. *O(1)*
- **`find(predicate)`** - Find first element matching predicate. *O(n)*

### Transformation Methods

- **`reverse()`** - Reverse the list in place by swapping pointers. *O(n)*
- **`toArray()`** - Convert to array of values. *O(n)*
- **`toArrayNodes()`** - Convert to array of nodes. *O(n)*
- **`fromArray(array)`** - Populate from array. *O(n)*
- **`forEach(callback)`** - Execute callback for each element. *O(n)*

## When to Use

**Use DoublyLinkedList when:**
- You need frequent insertions/deletions at both ends
- You need O(1) removal from the tail (unlike singly linked lists)
- You need bidirectional traversal
- You're implementing data structures like deques or LRU caches
- The extra memory overhead is acceptable for better performance

**Consider alternatives when:**
- You need fast random access → Use Array
- Memory is constrained and you only need forward traversal → Use LinkedList
- You only insert/remove from one end → Use LinkedList
- You need efficient search → Use BinarySearchTree or HashMap

## Implementation Notes

This implementation:
- Maintains both `head` and `tail` references for O(1) operations at both ends
- Each node has both `next` and `prev` references for bidirectional traversal
- Optimizes `get()` and `getNode()` operations by searching from the closer end (head or tail), resulting in O(n/2) average case
- Uses generic types for full TypeScript support
- Implements the iterable protocol for modern JavaScript patterns
- Provides both traditional names and array-like aliases (push/pop/shift/unshift)
- All mutating insertion operations return the list instance for method chaining
- Removal operations return the removed value
- Uses more memory than singly linked lists due to the extra `prev` pointer in each node

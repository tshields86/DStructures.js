# LinkedList

A singly linked list implementation that maintains references to both the first (head) and last (tail) elements, enabling efficient O(1) operations at both ends.

## Overview

A linked list is a linear data structure where elements are stored in nodes. Each node contains a value and a reference to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation and provide efficient insertion/deletion operations.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Access by index | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(1) | O(1) |
| Insert at index | O(n) | O(n) |
| Delete at head | O(1) | O(1) |
| Delete at tail | O(n) | O(n) |
| Delete at index | O(n) | O(n) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { LinkedList } from 'dstructures.js';

// Create an empty list
const list = new LinkedList<number>();

// Create from an iterable
const list2 = new LinkedList([1, 2, 3, 4, 5]);

// Add elements
list.push(1);        // Add to end: [1]
list.push(2);        // [1, 2]
list.unshift(0);     // Add to beginning: [0, 1, 2]
list.add(1, 99);     // Insert at index 1: [0, 99, 1, 2]

// Remove elements
list.pop();          // Remove from end: [0, 99, 1]
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
const list = new LinkedList<number>();
list.push(1).push(2).push(3).push(4);
// [1, 2, 3, 4]
```

### Finding Elements

```typescript
const list = new LinkedList([10, 20, 30, 40]);

// Find first element matching condition
const found = list.find(value => value > 25);
console.log(found); // 30

// Get index of element
const index = list.indexOf(30);
console.log(index); // 2
```

### Iteration

```typescript
const list = new LinkedList(['a', 'b', 'c']);

// Using for...of
for (const value of list) {
  console.log(value);
}

// Using forEach
list.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// Convert to array
const array = [...list];
```

### Working with Objects

```typescript
interface Task {
  id: number;
  name: string;
  priority: number;
}

const tasks = new LinkedList<Task>();
tasks.push({ id: 1, name: 'Write docs', priority: 1 });
tasks.push({ id: 2, name: 'Fix bug', priority: 2 });
tasks.push({ id: 3, name: 'Add feature', priority: 3 });

// Find high priority task
const urgent = tasks.find(task => task.priority === 1);
console.log(urgent?.name); // 'Write docs'
```

## API Reference

### Constructor

- **`new LinkedList<T>(iterable?)`** - Creates a new linked list, optionally populated from an iterable

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
- **`removeLast()`** / **`pop()`** - Remove and return last element. *O(n)*
- **`remove(index)`** - Remove element at specific position. *O(n)*
- **`clear()`** - Remove all elements. *O(1)*

### Access Methods

- **`get(index)`** - Get value at index. *O(n)*
- **`getFirst()`** - Get first element. *O(1)*
- **`getLast()`** - Get last element. *O(1)*
- **`getNode(index)`** - Get node at index. *O(n)*
- **`set(index, value)`** - Replace value at index. *O(n)*

### Query Methods

- **`contains(value)`** - Check if value exists. *O(n)*
- **`indexOf(value)`** - Get index of value. *O(n)*
- **`isEmpty()`** - Check if list is empty. *O(1)*
- **`find(predicate)`** - Find first element matching predicate. *O(n)*

### Transformation Methods

- **`reverse()`** - Reverse the list in place. *O(n)*
- **`toArray()`** - Convert to array of values. *O(n)*
- **`toArrayNodes()`** - Convert to array of nodes. *O(n)*
- **`fromArray(array)`** - Populate from array. *O(n)*
- **`forEach(callback)`** - Execute callback for each element. *O(n)*

## When to Use

**Use LinkedList when:**
- You need frequent insertions/deletions at the beginning or end
- You don't need random access by index
- Memory is not contiguous
- The size of the collection changes frequently

**Consider alternatives when:**
- You need fast random access → Use Array
- You need fast deletions in the middle → Use DoublyLinkedList
- You need efficient search → Use BinarySearchTree or HashMap

## Implementation Notes

This implementation:
- Maintains both `head` and `tail` references for O(1) operations at both ends
- Uses generic types for full TypeScript support
- Implements the iterable protocol for modern JavaScript patterns
- Provides both traditional names and array-like aliases (push/pop/shift/unshift)
- All mutating operations return the list instance for method chaining (except removal operations which return the removed value)

# BinarySearchTree

A binary search tree implementation that maintains the BST property where for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater than the node's value, enabling efficient search, insertion, and deletion operations.

## Overview

A binary search tree (BST) is a node-based tree data structure where each node has at most two children (left and right). The BST property ensures that for any node:
- All values in the left subtree are **less than** the node's value
- All values in the right subtree are **greater than** the node's value

This property enables efficient searching, insertion, and deletion operations. When the tree is balanced, these operations run in O(log n) time. In-order traversal of a BST produces values in sorted order.

## Time Complexity

| Operation | Average (Balanced) | Worst Case (Unbalanced) |
|-----------|-------------------|-------------------------|
| Insert | O(log n) | O(n) |
| Remove | O(log n) | O(n) |
| Find/Search | O(log n) | O(n) |
| Contains | O(log n) | O(n) |
| Find Min/Max | O(log n) | O(n) |
| In-order Traversal | O(n) | O(n) |
| Pre-order Traversal | O(n) | O(n) |
| Post-order Traversal | O(n) | O(n) |
| BFS | O(n) | O(n) |
| DFS | O(n) | O(n) |

**Space Complexity:** O(n)

**Note:** Worst case occurs when the tree becomes unbalanced (e.g., inserting already sorted data creates a linear chain). Average case assumes a reasonably balanced tree.

## Basic Usage

```typescript
import { BinarySearchTree } from 'dstructures.js';

// Create an empty tree
const bst = new BinarySearchTree<number>();

// Create from an iterable
const bst2 = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6, 8]);

// Insert elements
bst.insert(5);        // Insert 5 as root
bst.insert(3);        // Insert 3 to left
bst.insert(7);        // Insert 7 to right
bst.insert(1);        // Insert 1 to left of 3
bst.insert(9);        // Insert 9 to right of 7

// Search for elements
const found = bst.find(3);           // Returns node with value 3
const exists = bst.contains(7);       // Returns true
const notFound = bst.find(100);       // Returns null

// Remove elements
bst.remove(3);        // Remove node with value 3
bst.remove(7);        // Remove node with value 7

// Query the tree
console.log(bst.size);                // Number of elements

// Convert to sorted array
const sorted = bst.toArray();         // [1, 5, 9] (in-order traversal)
```

## Advanced Examples

### Traversal Methods

```typescript
const bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6, 8]);

// In-order traversal (left-root-right) - produces sorted order
console.log([...bst.inOrderTraversal()]);
// Output: [null, 1, 3, 4, 5, 6, 7, 8, 9]

// Pre-order traversal (root-left-right) - useful for copying tree
console.log([...bst.preOrderTraversal()]);
// Output: [5, 3, 1, null, null, 4, null, null, 7, 6, null, null, 9, 8, null, null, null]

// Post-order traversal (left-right-root) - useful for deleting tree
console.log([...bst.postOrderTraversal()]);
// Output: [null, null, 1, null, null, 4, 3, null, null, 6, null, null, 8, 9, 7, 5]

// Breadth-first search (level-by-level)
console.log([...bst.bfs()]);
// Output: [5, 3, 7, 1, 4, 6, 9, null, null, null, null, null, null, 8, null, null, null]

// Depth-first search (deep first)
console.log([...bst.dfs()]);
// Output: [5, 3, 1, null, null, 4, null, null, 7, 6, null, null, 9, 8, null, null, null]

// Iterate using for...of (uses in-order by default)
for (const value of bst.inOrderTraversal()) {
  console.log(value);
}
```

### Finding Minimum and Maximum Values

```typescript
const bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6, 8]);

// Find minimum value (leftmost node)
const minNode = bst.root.findMin();
console.log(minNode.value); // 1

// Find maximum value (rightmost node)
function findMax<T>(bst: BinarySearchTree<T>): T | null {
  let node = bst.root;
  while (node.right) {
    node = node.right;
  }
  return node.value;
}

console.log(findMax(bst)); // 9
```

### Range Queries

```typescript
const bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6, 8, 2]);

// Find all values in a range
function findInRange<T>(
  bst: BinarySearchTree<T>,
  min: T,
  max: T
): T[] {
  const result: T[] = [];

  for (const value of bst.inOrderTraversal()) {
    if (value === null) continue;
    if (value >= min && value <= max) {
      result.push(value);
    }
  }

  return result;
}

console.log(findInRange(bst, 3, 7)); // [3, 4, 5, 6, 7]
console.log(findInRange(bst, 1, 4)); // [1, 2, 3, 4]
```

### Checking if Tree is Valid BST

```typescript
function isValidBST<T>(bst: BinarySearchTree<T>): boolean {
  function validate(
    node: BinarySearchTreeNode<T> | null,
    min: T | null,
    max: T | null
  ): boolean {
    if (!node || node.value === null) return true;

    if (min !== null && node.value <= min) return false;
    if (max !== null && node.value >= max) return false;

    return (
      validate(node.left, min, node.value) &&
      validate(node.right, node.value, max)
    );
  }

  return validate(bst.root, null, null);
}

const bst = new BinarySearchTree([5, 3, 7, 1, 9]);
console.log(isValidBST(bst)); // true
```

### Working with Duplicates

```typescript
const bst = new BinarySearchTree<number>();

// Insert duplicate values
bst.insert(5);
bst.insert(3);
bst.insert(5);  // Duplicate
bst.insert(3);  // Duplicate
bst.insert(5);  // Another duplicate

// Check multiplicity using meta
const node5 = bst.find(5);
console.log(node5?.meta.get('multiplicity')); // 3

const node3 = bst.find(3);
console.log(node3?.meta.get('multiplicity')); // 2

// Remove duplicates one at a time
bst.remove(5);  // Decrements multiplicity to 2
console.log(node5?.meta.get('multiplicity')); // 2

bst.remove(5);  // Decrements multiplicity to 1
console.log(node5?.meta.get('multiplicity')); // 1

bst.remove(5);  // Removes the node completely
console.log(bst.contains(5)); // false
```

### Building from Array

```typescript
const bst = new BinarySearchTree<number>();

// Build tree from array
bst.fromArray([5, 3, 7, 1, 9, 4, 6, 8]);
console.log(bst.size); // 8

// Convert back to sorted array
const sorted = bst.toArray();
console.log(sorted); // [null, 1, 3, 4, 5, 6, 7, 8, 9]
```

### Working with Objects

```typescript
interface Person {
  id: number;
  name: string;
  age: number;
}

// Custom comparator needed for objects
class PersonBST extends BinarySearchTree<Person> {
  constructor() {
    super();
  }
}

const people = new PersonBST();
// Note: Requires implementing custom comparison logic
// for object-based trees
```

## API Reference

### BinarySearchTree

#### Constructor

- **`new BinarySearchTree<T>(iterable?)`** - Creates a new binary search tree, optionally populated from an iterable

#### Properties

- **`root`** - Reference to the root node of the tree
- **`size`** - Number of elements in the tree

#### Insertion Methods

- **`insert(value)`** / **`add(value)`** / **`set(value)`** - Insert a value into the tree. Returns the node where value was inserted. *O(log n) average, O(n) worst*

#### Removal Methods

- **`remove(value)`** / **`delete(value)`** - Remove a value from the tree. Returns true if removed. *O(log n) average, O(n) worst*

#### Search Methods

- **`find(value)`** / **`has(value)`** - Find and return the node with specified value. Returns null if not found. *O(log n) average, O(n) worst*
- **`contains(value)`** / **`get(value)`** - Check if value exists in tree. Returns boolean. *O(log n) average, O(n) worst*

#### Traversal Methods

- **`inOrderTraversal(node?)`** - Generator that yields values in sorted order (left-root-right). *O(n)*
- **`preOrderTraversal(node?)`** - Generator that yields values in pre-order (root-left-right). *O(n)*
- **`postOrderTraversal(node?)`** - Generator that yields values in post-order (left-right-root). *O(n)*
- **`bfs()`** - Generator that yields values in breadth-first order (level by level). *O(n)*
- **`dfs()`** - Generator that yields values in depth-first order. *O(n)*

#### Transformation Methods

- **`fromArray(values)`** - Populate tree from array. Returns tree for chaining. *O(n log n) average*
- **`toArray()`** - Convert tree to array using in-order traversal (sorted). *O(n)*

### BinarySearchTreeNode

#### Constructor

- **`new BinarySearchTreeNode<T>(value?)`** - Creates a new node with optional initial value

#### Properties

- **`value`** - The value stored in the node
- **`left`** - Reference to the left child node
- **`right`** - Reference to the right child node
- **`parent`** - Reference to the parent node
- **`meta`** - Map for storing metadata (e.g., multiplicity for duplicates)

#### Node Methods

- **`insert(value)`** - Insert value into this node's subtree. *O(log n) average, O(n) worst*
- **`remove(value)`** - Remove value from this node's subtree. *O(log n) average, O(n) worst*
- **`find(value)`** - Find node with value in this subtree. *O(log n) average, O(n) worst*
- **`contains(value)`** - Check if value exists in this subtree. *O(log n) average, O(n) worst*
- **`findMin()`** - Find node with minimum value in this subtree. *O(log n) average, O(n) worst*
- **`setLeft(node)`** - Set the left child node. Returns this for chaining.
- **`setRight(node)`** - Set the right child node. Returns this for chaining.
- **`setValue(value)`** - Set the node's value.
- **`removeChild(node)`** - Remove a child node.
- **`replaceChild(nodeToReplace, replacementNode)`** - Replace one child with another.
- **`copyNode(sourceNode)`** - Copy values from source node to this node.

## When to Use

**Use BinarySearchTree when:**
- You need efficient searching, insertion, and deletion (O(log n) on average)
- You need to maintain elements in sorted order
- You want to perform range queries efficiently
- You need to find minimum/maximum values quickly
- You want in-order traversal to produce sorted results

**Consider alternatives when:**
- You need guaranteed O(log n) operations → Use AVL Tree or Red-Black Tree (self-balancing)
- You need the fastest possible search → Use Hash Table/HashMap (O(1) average)
- You only need to maintain sorted order → Use sorted Array with binary search
- You need to search by multiple criteria → Use multiple indices or database
- Your data is frequently already sorted → Consider a self-balancing tree to avoid O(n) worst case

## Implementation Notes

This implementation:
- Maintains the BST property (left < parent < right) automatically
- Handles duplicate values using a `multiplicity` counter stored in node metadata
- Provides multiple traversal methods (in-order, pre-order, post-order, BFS, DFS)
- Uses generators for memory-efficient traversal
- Supports generic types for full TypeScript type safety
- In-order traversal produces values in sorted order
- Does not self-balance, so worst-case performance degrades to O(n) for unbalanced trees
- Includes both primary method names and convenient aliases (add/set for insert, delete for remove, etc.)
- Properly handles three removal cases: leaf nodes, nodes with one child, and nodes with two children

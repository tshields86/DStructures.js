# Search Algorithms

A collection of efficient search algorithm implementations with support for custom comparators and type safety. Search algorithms locate specific elements within data structures or arrays.

## Overview

Search algorithms are fundamental operations for finding specific values within collections. The efficiency of a search algorithm depends on the structure of the data and whether it's sorted or unsorted.

## Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Requires Sorted Data |
|-----------|------|---------|-------|-------|---------------------|
| **Binary Search** | O(1) | O(log n) | O(log n) | O(1)* | Yes |
| **Binary Search (Recursive)** | O(1) | O(log n) | O(log n) | O(log n)* | Yes |

\* Binary Search iterative uses O(1) space, recursive uses O(log n) due to call stack

## Basic Usage

```typescript
import { binarySearch, binarySearchRecursive } from 'dstructures.js';

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// Find the index of value 7
const index = binarySearch(sortedArray, 7);
console.log(index); // 3

// Using recursive variant
const index2 = binarySearchRecursive(sortedArray, 13);
console.log(index2); // 6

// Value not found returns -1
const notFound = binarySearch(sortedArray, 100);
console.log(notFound); // -1
```

## Advanced Examples

### Searching Strings

```typescript
import { binarySearch } from 'dstructures.js';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

// Search with custom string comparator
const index = binarySearch(names, 'Charlie', (a, b) => a.localeCompare(b));
console.log(index); // 2

// Case-insensitive search
const caseInsensitiveCompare = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

const mixedCase = ['alice', 'Bob', 'CHARLIE', 'david'];
const idx = binarySearch(mixedCase, 'bob', caseInsensitiveCompare);
console.log(idx); // 1
```

### Searching Objects by Property

```typescript
import { binarySearch } from 'dstructures.js';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Widget', price: 10 },
  { id: 2, name: 'Gadget', price: 20 },
  { id: 3, name: 'Gizmo', price: 30 },
  { id: 4, name: 'Doohickey', price: 40 },
];

// Search by price
const targetPrice = 30;
const index = binarySearch(
  products,
  { id: 0, name: '', price: targetPrice },
  (a, b) => a.price - b.price
);

console.log(index); // 2
console.log(products[index]); // { id: 3, name: 'Gizmo', price: 30 }
```

### Finding Insertion Position

```typescript
import { binarySearch } from 'dstructures.js';

// Find where to insert a value to maintain sorted order
function findInsertPosition(arr: number[], target: number): number {
  const index = binarySearch(arr, target);

  // If found, return its position
  if (index !== -1) return index;

  // If not found, binary search can be modified to return insertion point
  // For now, use linear scan from the nearest position
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

const arr = [1, 3, 5, 7, 9];
console.log(findInsertPosition(arr, 6)); // 3 (insert at index 3)
console.log(findInsertPosition(arr, 0)); // 0 (insert at beginning)
console.log(findInsertPosition(arr, 10)); // 5 (insert at end)
```

### Range Queries - Finding First/Last Occurrence

```typescript
import { binarySearch } from 'dstructures.js';

// Find first occurrence of target
function findFirst(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Keep searching left
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// Find last occurrence of target
function findLast(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Keep searching right
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

const duplicates = [1, 2, 2, 2, 3, 4, 4, 5];
console.log(findFirst(duplicates, 2)); // 1
console.log(findLast(duplicates, 2));  // 3
console.log(findFirst(duplicates, 4)); // 5
console.log(findLast(duplicates, 4));  // 6
```

### Searching in Rotated Array

```typescript
// Binary search variant for rotated sorted arrays
function searchRotated(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    // Left half is sorted
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// Array rotated at index 4: [4, 5, 6, 7, 0, 1, 2]
const rotated = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotated(rotated, 0)); // 4
console.log(searchRotated(rotated, 6)); // 2
console.log(searchRotated(rotated, 3)); // -1
```

## Individual Algorithms

### Binary Search

**Best for:** Searching in sorted arrays with O(log n) time complexity

Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, search the left half; otherwise, search the right half. This process continues until the value is found or the interval is empty.

```typescript
import { binarySearch } from 'dstructures.js';

const arr = [1, 3, 5, 7, 9, 11, 13];
const target = 7;

const index = binarySearch(arr, target);
console.log(index); // 3
```

**Characteristics:**
- Requires sorted array
- O(log n) time complexity
- O(1) space complexity (iterative version)
- Returns index of found element or -1 if not found
- Much faster than linear search for large arrays

### Binary Search (Recursive)

**Best for:** Educational purposes, when call stack space is not a concern

Recursive variant of binary search that provides the same functionality but uses recursive function calls.

```typescript
import { binarySearchRecursive } from 'dstructures.js';

const arr = [2, 4, 6, 8, 10, 12, 14];
const target = 10;

const index = binarySearchRecursive(arr, target);
console.log(index); // 4
```

**Characteristics:**
- Requires sorted array
- O(log n) time complexity
- O(log n) space complexity due to recursive call stack
- Same functionality as iterative version
- More intuitive for understanding the algorithm

## Choosing the Right Algorithm

### Use Binary Search when:
- Array is already sorted
- You need O(log n) search time
- Memory is not extremely constrained (though iterative uses O(1))
- You'll perform multiple searches on the same sorted data

### Use Iterative Binary Search when:
- You want optimal space complexity (O(1))
- You're working in environments with limited stack space

### Use Recursive Binary Search when:
- Code clarity is more important than stack space
- You're learning the algorithm
- Stack space is not a concern

### Consider alternatives when:
- Array is unsorted → Use linear search or sort first
- Array is very small (< 10 elements) → Linear search may be faster
- You need to search by multiple criteria → Use hash table
- You need all occurrences → Modify algorithm or use linear search

## API Reference

### Binary Search Functions

Both binary search functions have the same signature:

```typescript
function binarySearch<T>(
  array: T[],
  target: T,
  compareFn?: (a: T, b: T) => number
): number

function binarySearchRecursive<T>(
  array: T[],
  target: T,
  compareFn?: (a: T, b: T) => number,
  left?: number,
  right?: number
): number
```

**Parameters:**
- `array` - The sorted array to search
- `target` - The value to find
- `compareFn` - Optional comparison function (default: numeric/lexicographic comparison)
  - Returns negative if `a < b`
  - Returns zero if `a === b`
  - Returns positive if `a > b`
- `left` - (Recursive only) Starting index (default: 0)
- `right` - (Recursive only) Ending index (default: array.length - 1)

**Returns:** Index of the target element, or -1 if not found

**Example Comparators:**

```typescript
// Ascending (default for numbers)
(a, b) => a - b

// Descending
(a, b) => b - a

// String comparison
(a, b) => a.localeCompare(b)

// Object property comparison
(a, b) => a.id - b.id
```

## Implementation Notes

- Both algorithms require the input array to be sorted
- Iterative version is more space-efficient (O(1) vs O(log n))
- Custom comparators enable searching any comparable type
- TypeScript generics ensure type safety
- Returns -1 when element is not found (standard convention)
- Works with any array size, including empty arrays

# Sorting Algorithms

A comprehensive collection of sorting algorithm implementations with support for custom comparators and type safety. All algorithms work in-place (except merge sort) and support any comparable data type.

## Overview

Sorting algorithms arrange elements in a specific order (usually ascending or descending). Different algorithms have different performance characteristics, making them suitable for various scenarios.

## Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable | When to Use |
|-----------|------|---------|-------|-------|--------|-------------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Educational, nearly sorted data |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Small arrays, nearly sorted data |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No | Small arrays, minimal swaps needed |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Predictable performance, stability needed |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²)* | O(log n) | No | General purpose, best average case |

\* Worst case avoided with good pivot selection (median-of-three, randomized)

**Stability:** A stable sort maintains the relative order of equal elements.

## Basic Usage

```typescript
import { bubbleSort, insertionSort, selectionSort, mergeSort, quickSort } from 'dstructures.js';

const numbers = [5, 2, 8, 1, 9, 3];

// All algorithms have the same interface
bubbleSort(numbers);      // [1, 2, 3, 5, 8, 9]
insertionSort(numbers);   // [1, 2, 3, 5, 8, 9]
selectionSort(numbers);   // [1, 2, 3, 5, 8, 9]
mergeSort(numbers);       // [1, 2, 3, 5, 8, 9]
quickSort(numbers);       // [1, 2, 3, 5, 8, 9]

// Descending order with custom comparator
quickSort(numbers, (a, b) => b - a); // [9, 8, 5, 3, 2, 1]
```

## Advanced Examples

### Sorting Strings

```typescript
import { mergeSort } from 'dstructures.js';

const words = ['banana', 'apple', 'cherry', 'date'];

// Alphabetical order
mergeSort(words, (a, b) => a.localeCompare(b));
console.log(words); // ['apple', 'banana', 'cherry', 'date']

// Reverse alphabetical
mergeSort(words, (a, b) => b.localeCompare(a));
console.log(words); // ['date', 'cherry', 'banana', 'apple']

// By length
mergeSort(words, (a, b) => a.length - b.length);
console.log(words); // ['date', 'apple', 'banana', 'cherry']
```

### Sorting Objects

```typescript
import { quickSort } from 'dstructures.js';

interface Person {
  name: string;
  age: number;
  salary: number;
}

const people: Person[] = [
  { name: 'Alice', age: 30, salary: 70000 },
  { name: 'Bob', age: 25, salary: 60000 },
  { name: 'Charlie', age: 35, salary: 80000 },
  { name: 'Diana', age: 25, salary: 65000 },
];

// Sort by age
quickSort(people, (a, b) => a.age - b.age);

// Sort by age, then by salary (stable sort required)
mergeSort(people, (a, b) => {
  if (a.age !== b.age) return a.age - b.age;
  return a.salary - b.salary;
});

// Sort by name
quickSort(people, (a, b) => a.name.localeCompare(b.name));
```

### Performance Comparison

```typescript
import { bubbleSort, quickSort, mergeSort } from 'dstructures.js';

// For small arrays (< 10 elements)
const small = [5, 2, 8, 1, 9];
insertionSort(small); // Often fastest for small arrays

// For medium arrays (10-1000 elements)
const medium = Array.from({ length: 100 }, () => Math.random());
quickSort(medium); // Usually fastest in practice

// For large arrays (> 1000 elements)
const large = Array.from({ length: 10000 }, () => Math.random());
quickSort(large); // Best average case
// or
mergeSort(large); // Guaranteed O(n log n), stable

// For nearly sorted data
const nearlySorted = [1, 2, 3, 5, 4, 6, 7, 8];
insertionSort(nearlySorted); // O(n) for nearly sorted data
```

## Individual Algorithms

### Bubble Sort

**Best for:** Educational purposes, nearly sorted data

Simple but inefficient algorithm that repeatedly swaps adjacent elements if they're in the wrong order.

```typescript
import { bubbleSort } from 'dstructures.js';

const arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(arr);
console.log(arr); // [11, 12, 22, 25, 34, 64, 90]
```

**Characteristics:**
- Stable sort (preserves order of equal elements)
- In-place sorting (O(1) extra space)
- Optimized with early termination if no swaps occur
- Best case O(n) when already sorted

### Insertion Sort

**Best for:** Small arrays, nearly sorted data, online sorting

Builds the sorted array one element at a time by inserting each element into its correct position.

```typescript
import { insertionSort } from 'dstructures.js';

const arr = [12, 11, 13, 5, 6];
insertionSort(arr);
console.log(arr); // [5, 6, 11, 12, 13]
```

**Characteristics:**
- Stable sort
- In-place sorting
- Efficient for small datasets (< 10 elements)
- O(n) for nearly sorted arrays
- Good for online sorting (sorting data as it arrives)

### Selection Sort

**Best for:** Small arrays, when minimizing writes is important

Repeatedly finds the minimum element and places it at the beginning.

```typescript
import { selectionSort } from 'dstructures.js';

const arr = [64, 25, 12, 22, 11];
selectionSort(arr);
console.log(arr); // [11, 12, 22, 25, 64]
```

**Characteristics:**
- Not stable (may change order of equal elements)
- In-place sorting
- Minimal number of swaps: O(n)
- Always O(n²) comparisons, even if sorted

### Merge Sort

**Best for:** Guaranteed performance, stable sorting, linked lists

Divide-and-conquer algorithm that divides array into halves, sorts them, and merges results.

```typescript
import { mergeSort } from 'dstructures.js';

const arr = [38, 27, 43, 3, 9, 82, 10];
mergeSort(arr);
console.log(arr); // [3, 9, 10, 27, 38, 43, 82]
```

**Characteristics:**
- Stable sort
- Requires O(n) extra space
- Guaranteed O(n log n) performance
- Predictable performance (no worst-case degradation)
- Excellent for sorting linked lists

### Quick Sort

**Best for:** General purpose sorting, best average-case performance

Divide-and-conquer algorithm using pivot-based partitioning.

```typescript
import { quickSort } from 'dstructures.js';

const arr = [10, 7, 8, 9, 1, 5];
quickSort(arr);
console.log(arr); // [1, 5, 7, 8, 9, 10]
```

**Characteristics:**
- Not stable
- In-place sorting (O(log n) stack space)
- Fastest average case performance
- Can degrade to O(n²) with poor pivot selection
- Most popular general-purpose sorting algorithm
- Cache-friendly due to locality of reference

## Choosing the Right Algorithm

### Use Bubble Sort when:
- Learning sorting algorithms
- Data is already nearly sorted
- Simplicity is more important than performance

### Use Insertion Sort when:
- Array size is small (< 10 elements)
- Data is nearly sorted or partially sorted
- You need online sorting (sort as data arrives)
- You want stable sorting with O(1) space

### Use Selection Sort when:
- Array size is very small
- Minimizing write operations is critical
- Memory writes are expensive

### Use Merge Sort when:
- You need guaranteed O(n log n) performance
- Stability is required
- You're sorting linked lists
- You have extra memory available

### Use Quick Sort when:
- General purpose sorting
- Average-case performance is priority
- You need in-place sorting
- Cache performance matters

## API Reference

All sorting functions have the same signature:

```typescript
function sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[]
```

**Parameters:**
- `array` - The array to sort (modified in-place)
- `compareFn` - Optional comparison function (default: ascending numeric/lexicographic)
  - Returns negative if `a < b`
  - Returns zero if `a === b`
  - Returns positive if `a > b`

**Returns:** The sorted array (same reference as input)

**Example Comparators:**

```typescript
// Ascending (default)
(a, b) => a - b

// Descending
(a, b) => b - a

// String comparison
(a, b) => a.localeCompare(b)

// Complex objects
(a, b) => a.property - b.property
```

## Implementation Notes

- All algorithms sort in-place except merge sort
- All algorithms support custom comparators
- All algorithms work with any comparable type
- TypeScript generics ensure type safety
- Optimizations include early termination and adaptive behavior where applicable

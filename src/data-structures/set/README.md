# HashSet

A hash-based set implementation that stores unique values with O(1) average time complexity for add, has, and delete operations.

## Overview

A HashSet is a collection that stores only unique values, automatically rejecting duplicates. It uses a HashMap internally for storage, leveraging hash functions to achieve constant-time operations on average. HashSets maintain insertion order, making them predictable when iterating over elements.

Key characteristics:
- **Uniqueness**: No duplicate values allowed
- **Fast lookups**: O(1) average time to check if a value exists
- **Insertion order**: Values are maintained in the order they were added
- **Hash-based**: Uses HashMap internally for efficient storage and retrieval

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Add | O(1) | O(n) |
| Has | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Clear | O(1) | O(1) |
| Iteration | O(n) | O(n) |
| Union | O(n + m) | O(n + m) |
| Intersection | O(min(n,m)) | O(min(n,m)) |
| Difference | O(n) | O(n) |

**Space Complexity:** O(n)

Note: Worst case O(n) occurs when all keys hash to the same bucket, though this is extremely rare with a good hash function.

## Basic Usage

```typescript
import { HashSet } from 'dstructures.js';

// Create an empty set
const set = new HashSet<number>();

// Create from an iterable
const set2 = new HashSet([1, 2, 3, 4, 5]);
const set3 = new HashSet(['apple', 'banana', 'cherry']);

// Add values
set.add(1);              // Add single value
set.add(2).add(3);       // Method chaining
set.add(1);              // Duplicate - ignored

// Check if value exists
console.log(set.has(1));        // true
console.log(set.has(99));       // false

// Remove values
set.delete(2);                  // Remove specific value
console.log(set.has(2));        // false

// Query the set
console.log(set.size);          // Number of elements
console.log(set.length);        // Alias for size

// Clear all values
set.clear();
console.log(set.size);          // 0
```

## Advanced Examples

### Removing Duplicates from Arrays

```typescript
// Remove duplicates from an array
const numbers = [1, 2, 2, 3, 4, 4, 5, 1, 3];
const uniqueNumbers = new HashSet(numbers);
console.log(uniqueNumbers.toArray());
// [1, 2, 3, 4, 5]

// One-liner to get unique values
const unique = [...new HashSet([1, 2, 2, 3, 3, 3])];
console.log(unique); // [1, 2, 3]
```

### Set Operations

```typescript
const setA = new HashSet([1, 2, 3, 4]);
const setB = new HashSet([3, 4, 5, 6]);

// Union - all values from both sets
const union = setA.union(setB);
console.log(union.toArray()); // [1, 2, 3, 4, 5, 6]

// Intersection - only values in both sets
const intersection = setA.intersection(setB);
console.log(intersection.toArray()); // [3, 4]

// Difference - values in setA but not in setB
const difference = setA.difference(setB);
console.log(difference.toArray()); // [1, 2]

// Symmetric difference - values in either set but not both
const symDiff = setA.symmetricDifference(setB);
console.log(symDiff.toArray()); // [1, 2, 5, 6]
```

### Set Relationships

```typescript
const smallSet = new HashSet([1, 2]);
const largeSet = new HashSet([1, 2, 3, 4, 5]);
const disjointSet = new HashSet([6, 7, 8]);

// Check if subset
console.log(smallSet.isSubsetOf(largeSet));    // true
console.log(largeSet.isSubsetOf(smallSet));    // false

// Check if superset
console.log(largeSet.isSupersetOf(smallSet));  // true

// Check if disjoint (no common values)
console.log(smallSet.isDisjointFrom(largeSet));    // false
console.log(smallSet.isDisjointFrom(disjointSet)); // true
```

### Counting Unique Elements

```typescript
const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'date'];
const uniqueWords = new HashSet(words);

console.log(`Total words: ${words.length}`);           // 6
console.log(`Unique words: ${uniqueWords.size}`);      // 4
console.log(`Duplicates: ${words.length - uniqueWords.size}`); // 2
```

### Iteration

```typescript
const fruits = new HashSet(['apple', 'banana', 'cherry']);

// Using for...of
for (const fruit of fruits) {
  console.log(fruit);
}

// Using forEach
fruits.forEach((value, value2, set) => {
  console.log(value); // Note: value === value2 for Set compatibility
});

// Using spread operator
const array = [...fruits];
console.log(array); // ['apple', 'banana', 'cherry']

// Using values iterator
for (const value of fruits.values()) {
  console.log(value);
}

// Using entries iterator (returns [value, value] pairs)
for (const [key, value] of fruits.entries()) {
  console.log(key, value); // key === value for sets
}
```

### Working with Objects

```typescript
interface User {
  id: number;
  name: string;
}

// HashSet works with objects by reference
const users = new HashSet<User>();
const user1 = { id: 1, name: 'Alice' };
const user2 = { id: 2, name: 'Bob' };

users.add(user1);
users.add(user2);
users.add(user1); // Duplicate reference - ignored

console.log(users.size); // 2
console.log(users.has(user1)); // true

// Note: Different objects with same values are considered different
const user1Copy = { id: 1, name: 'Alice' };
console.log(users.has(user1Copy)); // false (different reference)
```

### Finding Duplicates

```typescript
function findDuplicates<T>(array: T[]): T[] {
  const seen = new HashSet<T>();
  const duplicates = new HashSet<T>();

  for (const item of array) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return duplicates.toArray();
}

const numbers = [1, 2, 3, 2, 4, 3, 5, 1];
console.log(findDuplicates(numbers)); // [2, 3, 1]
```

## API Reference

### Constructor

- **`new HashSet<T>(iterable?)`** - Creates a new hash set, optionally populated from an iterable

### Properties

- **`size`** - Number of unique values in the set. *O(1)*
- **`length`** - Alias for size. *O(1)*

### Core Methods

- **`add(value)`** - Add a value to the set. Returns the set for chaining. *O(1) average*
- **`has(value)`** - Check if a value exists in the set. Returns boolean. *O(1) average*
- **`delete(value)`** - Remove a value from the set. Returns true if deleted. *O(1) average*
- **`clear()`** - Remove all values from the set. *O(1)*

### Iteration Methods

- **`values()`** - Returns an iterator over all values in insertion order. *O(n)*
- **`keys()`** - Alias for values() for Set compatibility. *O(n)*
- **`entries()`** - Returns an iterator over [value, value] pairs. *O(n)*
- **`forEach(callback)`** - Execute callback for each value. *O(n)*
- **`toArray()`** - Convert to array of values. *O(n)*

### Set Operations

- **`union(other)`** - Returns new set with all values from both sets. *O(n + m)*
- **`intersection(other)`** - Returns new set with only common values. *O(min(n, m))*
- **`difference(other)`** - Returns new set with values in this but not other. *O(n)*
- **`symmetricDifference(other)`** - Returns new set with values in either but not both. *O(n + m)*

### Set Relationships

- **`isSubsetOf(other)`** - Check if all values are in other set. *O(n)*
- **`isSupersetOf(other)`** - Check if this contains all values from other. *O(m)*
- **`isDisjointFrom(other)`** - Check if sets have no common values. *O(min(n, m))*

## When to Use

**Use HashSet when:**
- You need to store unique values only
- You need fast lookups to check if a value exists
- You want to remove duplicates from a collection
- You need to perform set operations (union, intersection, etc.)
- Order of insertion matters
- You need O(1) add/has/delete operations

**Consider alternatives when:**
- You need to store key-value pairs → Use HashMap
- You need sorted/ordered values → Use TreeSet (if available) or sort after
- You need to count occurrences → Use HashMap with counts
- You're working with primitive arrays and order doesn't matter → Use Array with Set conversion
- Memory is extremely constrained and you can accept O(n) lookups → Use Array

## Implementation Notes

This implementation:
- Uses HashMap internally for O(1) average time complexity
- Maintains insertion order through the underlying HashMap
- Supports generic types for full TypeScript support
- Implements the iterable protocol (Symbol.iterator)
- Provides standard Set API compatibility (values, keys, entries, forEach)
- All mutating operations except delete and clear return the set instance for method chaining
- Works with any type that can be used as a HashMap key (primitives, objects by reference)
- Includes rich set operations (union, intersection, difference, etc.)
- Provides set relationship methods (subset, superset, disjoint)

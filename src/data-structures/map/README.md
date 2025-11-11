# HashMap

A hash table implementation that provides constant-time average performance for get, set, has, and delete operations. Uses separate chaining for collision resolution and maintains insertion order of keys.

## Overview

A hash map (also known as a hash table) is a data structure that implements an associative array, mapping keys to values. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found. This implementation uses the FNV-1a hash function for generating hash codes and handles collisions through separate chaining with linked lists.

Key features:
- **Hashing**: Uses FNV-1a hash function to convert keys into array indices
- **Collision Handling**: Separate chaining with linked lists for entries that hash to the same index
- **Load Factor**: Automatically rehashes to a larger capacity when the load factor (size/capacity ratio) exceeds 0.75
- **Insertion Order**: Maintains the order in which keys were inserted for predictable iteration
- **Universal Keys**: Supports any key type by converting to string representation

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| set(key, value) | O(1) | O(n) |
| get(key) | O(1) | O(n) |
| has(key) | O(1) | O(n) |
| delete(key) | O(1) | O(n) |
| keys() | O(n) | O(n) |
| values() | O(n) | O(n) |
| entries() | O(n) | O(n) |
| clear() | O(1) | O(1) |

**Space Complexity:** O(n)

*Note: Worst case O(n) occurs when all keys hash to the same bucket. Average case assumes good hash distribution.*

## Basic Usage

```typescript
import { HashMap } from 'dstructures.js';

// Create an empty map
const map = new HashMap<string, number>();

// Create from an iterable
const map2 = new HashMap([
  ['one', 1],
  ['two', 2],
  ['three', 3]
]);

// Create with custom capacity and load factor
const map3 = new HashMap<string, number>(null, 50, 0.8);

// Set key-value pairs
map.set('apple', 100);
map.set('banana', 200);
map.set('cherry', 300);

// Method chaining
map.set('date', 400).set('elderberry', 500);

// Get values
const value = map.get('apple');     // 100
const missing = map.get('grape');   // undefined

// Check if key exists
console.log(map.has('banana'));     // true
console.log(map.has('grape'));      // false

// Delete entries
map.delete('cherry');               // true
map.delete('grape');                // false (key doesn't exist)

// Query the map
console.log(map.size);              // Number of entries
console.log(map.collisions);        // Number of hash collisions

// Clear all entries
map.clear();
```

## Advanced Examples

### Iteration

```typescript
const map = new HashMap([
  ['name', 'Alice'],
  ['age', '30'],
  ['city', 'New York']
]);

// Iterate over keys
for (const key of map.keys()) {
  console.log(key);
}
// Output: name, age, city

// Iterate over values
for (const value of map.values()) {
  console.log(value);
}
// Output: Alice, 30, New York

// Iterate over entries
for (const [key, value] of map.entries()) {
  console.log(`${key}: ${value}`);
}
// Output: name: Alice, age: 30, city: New York

// Using for...of (default iterator)
for (const [key, value] of map) {
  console.log(`${key} = ${value}`);
}

// Using forEach
map.forEach((value, key) => {
  console.log(`${key} -> ${value}`);
});

// Convert to array
const entries = [...map];
// [['name', 'Alice'], ['age', '30'], ['city', 'New York']]
```

### Working with Object Keys and Values

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Session {
  token: string;
  expiresAt: Date;
}

// Map user IDs to user objects
const users = new HashMap<number, User>();
users.set(1, { id: 1, name: 'Alice', email: 'alice@example.com' });
users.set(2, { id: 2, name: 'Bob', email: 'bob@example.com' });

// Retrieve user
const user = users.get(1);
console.log(user?.name); // 'Alice'

// Map session tokens to session data
const sessions = new HashMap<string, Session>();
sessions.set('abc123', {
  token: 'abc123',
  expiresAt: new Date('2025-12-31')
});

// Check if session exists
if (sessions.has('abc123')) {
  const session = sessions.get('abc123');
  console.log('Session expires:', session?.expiresAt);
}
```

### Collision Handling

```typescript
const map = new HashMap<string, number>(null, 5, 0.75);

// Add multiple entries
map.set('key1', 1);
map.set('key2', 2);
map.set('key3', 3);
map.set('key4', 4);

// Check collision statistics
console.log(`Size: ${map.size}`);
console.log(`Collisions: ${map.collisions}`);
console.log(`Load Factor: ${map.getLoadFactor().toFixed(2)}`);

// Adding more entries will trigger rehashing
map.set('key5', 5);
map.set('key6', 6);

console.log(`After rehashing:`);
console.log(`Size: ${map.size}`);
console.log(`Collisions: ${map.collisions}`);
console.log(`Load Factor: ${map.getLoadFactor().toFixed(2)}`);
```

### Caching Pattern

```typescript
interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

class Cache<K, V> {
  private cache: HashMap<K, CacheEntry<V>>;
  private ttl: number; // Time to live in milliseconds

  constructor(ttl: number = 60000) {
    this.cache = new HashMap<K, CacheEntry<V>>();
    this.ttl = ttl;
  }

  set(key: K, value: V): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: K): boolean {
    const value = this.get(key); // Triggers expiration check
    return value !== undefined;
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

// Usage
const apiCache = new Cache<string, any>(30000); // 30 second TTL

apiCache.set('/api/users', { data: [/* user data */] });
apiCache.set('/api/posts', { data: [/* post data */] });

// Retrieve from cache
const users = apiCache.get('/api/users');
console.log('Cached users:', users);

// Wait for expiration
setTimeout(() => {
  const expired = apiCache.get('/api/users');
  console.log('After expiration:', expired); // undefined
}, 31000);
```

### Insertion Order Preservation

```typescript
const map = new HashMap<string, number>();

// Insert in specific order
map.set('first', 1);
map.set('second', 2);
map.set('third', 3);

// Iteration maintains insertion order
console.log([...map.keys()]); // ['first', 'second', 'third']

// Even after modifications
map.delete('second');
map.set('fourth', 4);
map.set('second', 22); // Re-insert

console.log([...map.keys()]); // ['first', 'third', 'fourth', 'second']
```

## API Reference

### Constructor

- **`new HashMap<K, V>(iterable?, initialCapacity?, loadFactor?)`** - Creates a new hash map
  - `iterable` - Optional iterable of [key, value] pairs to populate the map
  - `initialCapacity` - Initial bucket array size (default: 19, a prime number)
  - `loadFactor` - Threshold for rehashing (default: 0.75)

### Properties

- **`size`** - Number of key-value pairs in the map
- **`collisions`** - Number of hash collisions (multiple keys hashing to same bucket)
- **`length`** - Alias for size property

### Mutation Methods

- **`set(key, value)`** - Sets a key-value pair. Returns the map for chaining. *O(1) average*
- **`delete(key)`** - Removes a key-value pair. Returns true if deleted, false if not found. *O(1) average*
- **`clear()`** - Removes all entries from the map. *O(1)*

### Access Methods

- **`get(key)`** - Returns the value associated with key, or undefined. *O(1) average*
- **`has(key)`** - Returns true if key exists in the map. *O(1) average*

### Query Methods

- **`getLoadFactor()`** - Returns current load factor (size/capacity). *O(1)*

### Iteration Methods

- **`keys()`** - Returns an iterator of keys in insertion order. *O(n)*
- **`values()`** - Returns an iterator of values in insertion order. *O(n)*
- **`entries()`** - Returns an iterator of [key, value] pairs in insertion order. *O(n)*
- **`forEach(callback)`** - Executes callback for each entry in insertion order. *O(n)*
- **`[Symbol.iterator]()`** - Default iterator (same as entries()). *O(n)*

## When to Use

**Use HashMap when:**
- You need fast lookups by key (O(1) average)
- You need to store key-value associations
- Keys are unique and hashable
- You need frequent insertions and deletions
- Order of insertion matters for iteration

**Consider alternatives when:**
- Keys are ordered integers → Use Array
- You need ordered keys → Use BinarySearchTree or native Map with sorted iteration
- Keys are sequential → Consider Array or simple object
- You only need to check membership → Use HashSet
- Keys need custom comparison logic → Use Map with custom comparator

## Implementation Notes

This implementation:
- Uses **FNV-1a hash function** for converting keys to bucket indices, providing good distribution and few collisions
- Implements **separate chaining** with linked lists to handle collisions (multiple keys hashing to same bucket)
- Automatically **rehashes** to the next prime number capacity when load factor exceeds threshold (default 0.75)
- Maintains **insertion order** through a keys tracker array, ensuring predictable iteration
- Supports **any key type** by converting keys to strings for hashing (numbers, strings, objects, etc.)
- Uses **generic types** for full TypeScript support
- Implements the **iterable protocol** for modern JavaScript patterns (for...of, spread operator)
- All mutation operations return the map instance for **method chaining** (except delete which returns boolean)
- Prime number capacities reduce clustering and improve hash distribution

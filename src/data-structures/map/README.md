# Hash Map

The hash map implementation in this directory provides a collection of key-value pairs, where each key is unique. It uses a combination of array indices (computed from hash codes) and linked lists to store its entries.

## Implementation Details

### HashMap

- **Properties**:
  - `initialCapacity`: The initial capacity of the hash map.
  - `loadFactor`: The load factor threshold that triggers rehashing.
  - `encoder`: An instance of `TextEncoder` used for encoding keys.
  - (Other internal properties that maintain the state of the hash map.)
- **Constructor**:
  - Constructs a new hash map with optional parameters for initial capacity, load factor, and an iterable to populate it.
- **Methods**:
  - `set(key, value)`: Sets a key-value pair in the hash map.
  - `get(key)`: Retrieves the value associated with a given key.
  - `has(key)`: Checks if a key exists in the hash map.
  - `delete(key)`: Removes a key-value pair from the hash map.
  - `keys()`: Returns an iterator over the keys in the hash map.
  - `values()`: Returns an iterator over the values in the hash map.
  - `entries()`: Returns an iterator over the key-value pairs in the hash map.
  - `clear()`: Clears all entries in the hash map.

## Usage

To use the hash map, you can import the `HashMap` class and create instances of it. The hash map ensures that each key is unique and provides efficient methods to manipulate key-value pairs.

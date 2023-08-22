# Hash Set

The hash set implementation in this directory provides a collection of unique values. It uses a hash map for internal storage, ensuring constant time complexity for most operations.

## Implementation Details

### HashSet

- **Properties**:
  - `hashMap`: An instance of a hash map used for internal storage.
- **Constructor**:
  - Takes an optional iterable to populate the hash set.
- **Methods**:
  - `add(value)`: Adds a value to the set. If the value already exists, it won't be added again.
  - `has(value)`: Checks if a value exists in the set and returns a boolean.
  - `delete(value)`: Removes a value from the set. Returns `true` if the value was removed, `false` otherwise.
  - `keys()`: Returns an iterator over the keys in the set.
  - `values()`: Returns an iterator over the values in the set.
  - `entries()`: Returns an iterator over the key-value pairs in the set.
  - `size`: A getter that returns the number of elements in the set.
  - `clear()`: Clears all elements from the set.

## Usage

To use the hash set, you can import the `HashSet` class and create instances of it. The hash set manages unique values internally and ensures no duplicates.

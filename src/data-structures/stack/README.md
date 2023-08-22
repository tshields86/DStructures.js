# Stack

The stack implementation in this directory follows the last-in, first-out (LIFO) principle. It uses a linked list for internal storage.

## Implementation Details

### Stack

- **Properties**:
  - `linkedList`: An instance of a linked list used for internal storage.
- **Constructor**:
  - Takes an optional iterable to populate the stack.
- **Methods**:
  - `push(value)`: Adds an element to the top of the stack.
  - `pop()`: Removes and returns the top element from the stack.
  - `size`: A getter that returns the number of elements in the stack.
  - `peek()`: Returns the top element in the stack without removing it.
  - `clear()`: Clears all elements from the stack.
  - `isEmpty()`: Checks if the stack is empty.
  - `fromArray(array)`: Populates the stack from an array.
  - `toArray()`: Converts the stack into an array.
  - `reverse()`: Reverses the order of elements in the stack.

## Usage

To use the stack, you can import the `Stack` class and create instances of it. Elements are added and removed in a LIFO manner.

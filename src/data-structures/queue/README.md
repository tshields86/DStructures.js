# Queue

The queue implementation in this directory follows the first-in, first-out (FIFO) principle. It uses a linked list for internal storage.

## Implementation Details

### Queue

- **Properties**:
  - `linkedList`: An instance of a linked list used for internal storage.
- **Constructor**:
  - Takes an optional iterable to populate the queue.
- **Methods**:
  - `enqueue(value)`: Adds an element to the end of the queue.
  - `dequeue()`: Removes and returns the front element from the queue.
  - `size`: A getter that returns the number of elements in the queue.
  - `peek()`: Returns the front element in the queue without removing it.
  - `clear()`: Clears all elements from the queue.
  - `isEmpty()`: Checks if the queue is empty.
  - `fromArray(array)`: Populates the queue from an array.
  - `toArray()`: Converts the queue into an array.

## Usage

To use the queue, you can import the `Queue` class and create instances of it. Elements are added and removed in a FIFO manner.

# Priority Queue

The priority queue implementation in this directory provides a collection of elements with assigned priorities. Elements with higher priorities are dequeued before elements with lower priorities. It extends the heap data structure to manage its elements efficiently.

## Implementation Details

### PriorityQueue

- **Properties**:
  - `container`: An array that stores the priority queue's elements.
  - `compare`: A comparison function used to determine the order of elements based on their priorities.
  
- **Constructor**:
  - Constructs a new priority queue. It accepts an optional compare function to determine the order of elements based on their priorities.
  
- **Methods**:
  - `offer(value, priority)`: Adds an element with a given priority to the priority queue.
  - `poll()`: Removes and returns the element with the highest priority from the priority queue.
  - `peek()`: Returns the element with the highest priority without removing it from the priority queue.
  - `changePriority(value, newPriority)`: Changes the priority of an existing element in the priority queue.
  - `removeValue(value)`: Removes a specific value from the priority queue.

### PriorityQueueNode

- **Properties**:
  - `value`: The value of the node.
  - `priority`: The priority assigned to the node.
  
- **Constructor**:
  - Constructs a new node with a given value and priority.

## Usage

To use the priority queue, you can import the `PriorityQueue` class and create instances of it. Elements are managed based on their assigned priorities.

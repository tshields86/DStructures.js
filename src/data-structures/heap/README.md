# Heap

The heap implementation in this directory provides a binary tree-based data structure that maintains a specific order between parent and child nodes. Heaps are commonly used to implement priority queues. This directory contains implementations for general heaps, as well as specialized `MaxHeap` and `MinHeap` structures.

## Implementation Details

### Heap

- **Properties**:
  - `container`: An array that stores the heap's elements.
  - `size`: The number of elements in the heap.
  - `compare`: A comparison function used to determine the order of elements.
  
- **Constructor**:
  - Constructs a new heap. It accepts an optional compare function.
  
- **Methods**:
  - `offer(value)`: Adds an element to the heap and reorders it to maintain the heap property.
  - `poll()`: Removes and returns the top of the heap. The heap is reordered to maintain the heap property.
  - `peek()`: Returns the head of the heap without removing it.
  - `isEmpty()`: Checks if the heap is empty and returns a boolean.
  - `removeValue(value)`: Removes a specific value from the heap.
  - `find(value)`: Finds the index of a specific value in the heap.
  - `clear()`: Clears all elements from the heap.
  - `heapifyUp()`: Adjusts the heap upwards to maintain its structure after adding an element.
  - `heapifyDown()`: Adjusts the heap downwards to maintain its structure after removing an element.

### MaxHeap

- **Properties**:
  - Inherits all properties from the `Heap` class.
  
- **Constructor**:
  - Constructs a new max heap that always ensures the maximum value is at the top.
  
- **Methods**:
  - Inherits all methods from the `Heap` class.

### MinHeap

- **Properties**:
  - Inherits all properties from the `Heap` class.
  
- **Constructor**:
  - Constructs a new min heap that always ensures the minimum value is at the top.
  
- **Methods**:
  - Inherits all methods from the `Heap` class.

## Usage

To use the heap, you can import the `Heap` class and create instances of it. The heap ensures that elements are ordered based on the provided comparison function or the default behavior.

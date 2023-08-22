# Doubly Linked List

The doubly linked list implementation in this directory maintains references to both its first (head) and last (tail) elements.

## Implementation Details

### DoublyLinkedList

- **Properties**:
  - `head`: Points to the first node in the list.
  - `tail`: Points to the last node in the list.
  - `size`: Keeps track of the number of elements in the list.
- **Constructor**:
  - Takes an optional iterable to populate the list.
- **Methods**:
  - `addFirst(value)`: Adds an element to the beginning of the list.
  - `addLast(value)`: Adds an element to the end of the list.
  - `add(value, index)`: Inserts an element at a specific position.
  - `getNode(index)`: Retrieves a node at a specific position.
  - `clear()`: Clears all elements from the list.
  - `contains(value)`: Checks if a value exists in the list.
  - `indexOf(value)`: Returns the index of a specific value.
  - `isEmpty()`: Checks if the list is empty.
  - `removeFirst()`: Removes and returns the first element from the list.
  - `removeLast()`: Removes and returns the last element from the list.
  - `remove(index)`: Removes an element at a specific position.
  - `set(value, index)`: Replaces the element at a specific position.
  - `get(index)`: Retrieves the value at a specific position.
  - `getFirst()`: Retrieves the first element in the list.
  - `getLast()`: Retrieves the last element in the list.
  - `fromArray(array)`: Populates the list from an array.
  - `toArray()`: Converts the list into an array.
  - `toArrayNodes()`: Converts the list into an array of nodes.
  - `reverse()`: Reverses the order of elements in the list.

### DoublyLinkedListNode

- **Properties**:
  - `value`: The value stored in the node.
  - `next`: Reference to the next node in the list (defaults to `null`).
  - `prev`: Reference to the previous node in the list (defaults to `null`).
- **Constructor**:
  - Takes in a value, an optional next node, and an optional previous node.

## Usage

To use the doubly linked list, you can import the `DoublyLinkedList` class and create instances of it. Nodes are created internally when elements are added to the list.

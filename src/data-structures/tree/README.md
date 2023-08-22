# Binary Search Tree

The binary search tree (BST) implementation in this directory ensures that for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node. This directory provides implementations for both the BST itself and its nodes.

## Implementation Details

### BinarySearchTree

- **Properties**:
  - `root`: The root node of the tree.
  - `size`: Keeps track of the number of elements in the tree.
- **Constructor**:
  - Takes an optional iterable to populate the tree.
- **Methods**:
  - `insert(value)`: Inserts a value into the BST.
  - `remove(value)`: Removes a value from the BST.
  - `find(value)`: Searches for a value in the BST.
  - `contains(value)`: Checks if a value exists in the BST.
  - `bfs()`: Performs a Breadth-First Search on the BST.
  - `dfs()`: Performs a Depth-First Search on the BST.
  - `inOrderTraversal()`: Traverses the BST in-order.
  - `preOrderTraversal()`: Traverses the BST pre-order.
  - `postOrderTraversal()`: Traverses the BST post-order.
  - `fromArray(array)`: Populates the BST from an array.
  - `toArray()`: Converts the BST into an array.

### BinarySearchTreeNode

- **Properties**:
  - `value`: The value stored in the node.
  - `left`: Reference to the left child node.
  - `right`: Reference to the right child node.
  - `meta`: A metadata map (used, for example, to track multiplicity of values).
- **Methods**:
  - `insert(value)`: Inserts a value into the node's subtree.
  - `setLeft(node)`: Sets the left child node.
  - `setRight(node)`: Sets the right child node.
  - `remove(value)`: Removes a value from the node's subtree.
  - `find(value)`: Finds a value in the node's subtree.
  - `removeChild(node)`: Removes a child node.
  - `setValue(value)`: Sets the node's value.
  - `findMin()`: Finds the node with the minimum value in the node's subtree.
  - `replaceChild(nodeToReplace, replacementNode)`: Replaces one child node with another.
  - `copyNode(sourceNode)`: Copies values from a source node.
  - `contains(value)`: Checks if a value exists in the node's subtree.

## Usage

To use the BST, you can import the `BinarySearchTree` class and create instances of it. The BST manages the nodes internally.

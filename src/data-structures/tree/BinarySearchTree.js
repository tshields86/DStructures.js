const BinarySearchTreeNode = require('./BinarySearchTreeNode');
const Queue = require('../queue/Queue');
const Stack = require('../stack/Stack');

/**
 * Binary Search Tree
 */
class BinarySearchTree {
  /**
   * @param {*} [iterable] - Iterable to populate the list.
   */
  constructor(iterable = null) {
    this.root = new BinarySearchTreeNode();
    this.size = 0;

    if (iterable) Array.from(iterable, value => this.insert(value));
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    const node = this.root.insert(value);
    this.size++;
    return node;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value) {
    const removed = this.root.remove(value);
    if (removed) this.size--;
    return removed;
  }

  /**
   * @param {*} value
   * @return {(BinarySearchTreeNode|null)}
   */
  find(value) {
    return this.root.find(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    return this.root.contains(value);
  }

  /**
   * Breath-first search for a tree.
   * @yields {BinaryTreeNode}
   */
  * bfs() {
    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      const { value, left, right } = node;
      yield value;

      if (left) queue.enqueue(left);
      if (right) queue.enqueue(right);
    }
  }

  /**
   * Depth-first search for a tree.
   * @yields {BinaryTreeNode}
   */
  * dfs() {
    const stack = new Stack();
    stack.push(this.root);

    while (!stack.isEmpty()) {
      const node = stack.pop();
      const { value, left, right } = node;
      yield value;

      if (right) stack.push(right);
      if (left) stack.push(left);
    }
  }

  /**
   * In-order traversal (left-root-right).
   * @param {BinaryTreeNode} node
   * @yields {BinaryTreeNode}
   */
  * inOrderTraversal(node = this.root) {
    const { value, left, right } = node;
    if (left) yield* this.inOrderTraversal(left);
    yield value;
    if (right) yield* this.inOrderTraversal(right);
  }

  /**
   * Pre-order traversal (root-left-right).
   * @param {BinaryTreeNode} node
   * @yields {BinaryTreeNode}
   */
  * preOrderTraversal(node = this.root) {
    const { value, left, right } = node;
    yield value;
    if (left) yield* this.preOrderTraversal(left);
    if (right) yield* this.preOrderTraversal(right);
  }

  /**
   * Post-order traversal (left-right-root).
   * @param {BinaryTreeNode} node
   * @yields {BinaryTreeNode}
   */
  * postOrderTraversal(node = this.root) {
    const { value, left, right } = node;
    if (left) yield* this.postOrderTraversal(left);
    if (right) yield* this.postOrderTraversal(right);
    yield value;
  }

  /**
   * Adds each element in the array to the BST.
   * @param {array} values
   * @return {BinarySearchTree}
   */
  fromArray(values) {
    values.forEach(value => this.insert(value));
    return this;
  }

  /**
   * Returns an array containing all of the elements in the BST.
   * @return {array}
   */
  toArray() {
    return Array.from(this.inOrderTraversal());
  }
}

/* Aliases */
BinarySearchTree.prototype.add = BinarySearchTree.prototype.insert;
BinarySearchTree.prototype.set = BinarySearchTree.prototype.insert;
BinarySearchTree.prototype.delete = BinarySearchTree.prototype.remove;
BinarySearchTree.prototype.has = BinarySearchTree.prototype.find;
BinarySearchTree.prototype.get = BinarySearchTree.prototype.contains;

module.exports = BinarySearchTree;

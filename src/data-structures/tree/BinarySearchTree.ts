import { BinarySearchTreeNode } from './BinarySearchTreeNode';
import { Queue } from '../queue/Queue';
import { Stack } from '../stack/Stack';

/**
 * Binary Search Tree - A tree structure where each node's left children
 * are smaller and right children are larger than the node's value.
 * Provides O(log n) average time for search, insert, and delete operations.
 *
 * @template T - The type of values stored in the tree (must be comparable)
 * @category Data Structures
 */
export class BinarySearchTree<T> {
  /**
   * The root node of the tree
   */
  public root: BinarySearchTreeNode<T>;

  /**
   * The number of elements in the tree
   */
  public size = 0;

  /**
   * Creates a new BinarySearchTree
   *
   * @param iterable - Optional iterable to populate the tree
   * @example
   * ```typescript
   * const bst = new BinarySearchTree([5, 3, 7, 1, 9]);
   * const emptyBst = new BinarySearchTree<number>();
   * ```
   */
  constructor(iterable?: Iterable<T>) {
    this.root = new BinarySearchTreeNode<T>();

    if (iterable) {
      for (const value of iterable) {
        this.insert(value);
      }
    }
  }

  /**
   * Inserts a value into the tree.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to insert
   * @returns The node where the value was inserted
   */
  insert(value: T): BinarySearchTreeNode<T> {
    const node = this.root.insert(value);
    this.size++;
    return node;
  }

  /**
   * Removes a value from the tree.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to remove
   * @returns True if the value was removed, false otherwise
   */
  remove(value: T): boolean {
    const removed = this.root.remove(value);
    if (removed) this.size--;
    return removed;
  }

  /**
   * Finds a node with the specified value.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to find
   * @returns The node with the value or null
   */
  find(value: T): BinarySearchTreeNode<T> | null {
    return this.root.find(value);
  }

  /**
   * Checks if a value exists in the tree.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to check for
   * @returns True if the value exists, false otherwise
   */
  contains(value: T): boolean {
    return this.root.contains(value);
  }

  /**
   * Breadth-first search traversal of the tree.
   * Visits nodes level by level from left to right.
   * Time complexity: O(n)
   *
   * @yields The values in BFS order
   */
  *bfs(): Generator<T | null, void, unknown> {
    const queue = new Queue<BinarySearchTreeNode<T>>();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (!node) continue;

      const { value, left, right } = node;
      yield value;

      if (left) queue.enqueue(left);
      if (right) queue.enqueue(right);
    }
  }

  /**
   * Depth-first search traversal of the tree.
   * Visits nodes by going deep into the tree first.
   * Time complexity: O(n)
   *
   * @yields The values in DFS order
   */
  *dfs(): Generator<T | null, void, unknown> {
    const stack = new Stack<BinarySearchTreeNode<T>>();
    stack.push(this.root);

    while (!stack.isEmpty()) {
      const node = stack.pop();
      if (!node) continue;

      const { value, left, right } = node;
      yield value;

      if (right) stack.push(right);
      if (left) stack.push(left);
    }
  }

  /**
   * In-order traversal (left-root-right).
   * Returns values in sorted order for a BST.
   * Time complexity: O(n)
   *
   * @param node - The node to start from (default: root)
   * @yields The values in sorted order
   */
  *inOrderTraversal(
    node: BinarySearchTreeNode<T> = this.root
  ): Generator<T | null, void, unknown> {
    const { value, left, right } = node;
    if (left) yield* this.inOrderTraversal(left);
    yield value;
    if (right) yield* this.inOrderTraversal(right);
  }

  /**
   * Pre-order traversal (root-left-right).
   * Useful for creating a copy of the tree.
   * Time complexity: O(n)
   *
   * @param node - The node to start from (default: root)
   * @yields The values in pre-order
   */
  *preOrderTraversal(
    node: BinarySearchTreeNode<T> = this.root
  ): Generator<T | null, void, unknown> {
    const { value, left, right } = node;
    yield value;
    if (left) yield* this.preOrderTraversal(left);
    if (right) yield* this.preOrderTraversal(right);
  }

  /**
   * Post-order traversal (left-right-root).
   * Useful for deleting the tree.
   * Time complexity: O(n)
   *
   * @param node - The node to start from (default: root)
   * @yields The values in post-order
   */
  *postOrderTraversal(
    node: BinarySearchTreeNode<T> = this.root
  ): Generator<T | null, void, unknown> {
    const { value, left, right } = node;
    if (left) yield* this.postOrderTraversal(left);
    if (right) yield* this.postOrderTraversal(right);
    yield value;
  }

  /**
   * Adds each element in the array to the tree.
   * Time complexity: O(n log n) average
   *
   * @param values - Array of values to add
   * @returns The tree instance for chaining
   */
  fromArray(values: T[]): this {
    values.forEach((value) => this.insert(value));
    return this;
  }

  /**
   * Returns an array containing all elements in sorted order.
   * Time complexity: O(n)
   *
   * @returns Array of all values in sorted order
   */
  toArray(): (T | null)[] {
    return Array.from(this.inOrderTraversal());
  }

  /**
   * Alias for insert. Adds a value to the tree.
   */
  add(value: T): BinarySearchTreeNode<T> {
    return this.insert(value);
  }

  /**
   * Alias for insert. Sets a value in the tree.
   */
  set(value: T): BinarySearchTreeNode<T> {
    return this.insert(value);
  }

  /**
   * Alias for remove. Deletes a value from the tree.
   */
  delete(value: T): boolean {
    return this.remove(value);
  }

  /**
   * Alias for find. Gets a node with the specified value.
   */
  has(value: T): BinarySearchTreeNode<T> | null {
    return this.find(value);
  }

  /**
   * Alias for contains. Checks if a value exists.
   */
  get(value: T): boolean {
    return this.contains(value);
  }
}

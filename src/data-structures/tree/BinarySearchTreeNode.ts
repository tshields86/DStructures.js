import { BinaryTreeNode } from './BinaryTreeNode';

const MULTIPLICITY = 'multiplicity';

/**
 * Binary Search Tree Node that maintains BST property (left < parent < right).
 * Supports duplicate values through multiplicity tracking.
 *
 * @template T - The type of value stored in the node (must be comparable)
 * @category Data Structures
 */
export class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {
  public override left: BinarySearchTreeNode<T> | null = null;
  public override right: BinarySearchTreeNode<T> | null = null;
  public override parent: BinarySearchTreeNode<T> | null = null;

  /**
   * Creates a new BinarySearchTreeNode
   *
   * @param value - The value to store in the node
   */
  constructor(value: T | null = null) {
    super(value);
  }

  /**
   * Inserts a value into the tree maintaining BST property.
   * Duplicate values increment a multiplicity counter.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to insert
   * @returns The node where the value was inserted
   */
  insert(value: T): BinarySearchTreeNode<T> {
    if (this.value === null) {
      this.value = value;
      return this;
    }

    if (value < this.value!) {
      if (this.left) return this.left.insert(value);

      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);
      return newNode;
    }

    if (value > this.value!) {
      if (this.right) return this.right.insert(value);

      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);
      return newNode;
    }

    // Duplicate value - increment multiplicity
    const multiplicity = this.meta.get(MULTIPLICITY) as number | undefined;
    this.meta.set(MULTIPLICITY, (multiplicity || 1) + 1);

    return this;
  }

  /**
   * Removes a value from the tree.
   * If the value has multiplicity > 1, decrements the counter.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to remove
   * @returns True if the value was removed, false otherwise
   */
  remove(value: T): boolean {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) return false;

    const multiplicity = nodeToRemove.meta.get(MULTIPLICITY) as
      | number
      | undefined;
    if (multiplicity && multiplicity > 1) {
      nodeToRemove.meta.set(MULTIPLICITY, multiplicity - 1);
      return true;
    }

    const { parent } = nodeToRemove;

    // Case 1: Node is a leaf
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(null);
      }
    }
    // Case 2: Node has two children
    else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value!);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    }
    // Case 3: Node has one child
    else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent && childNode) {
        parent.replaceChild(nodeToRemove, childNode);
      } else if (childNode) {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    return true;
  }

  /**
   * Finds the minimum value node in this subtree.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @returns The node with the minimum value
   */
  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) return this;
    return this.left.findMin();
  }

  /**
   * Finds a node with the specified value.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to find
   * @returns The node with the value or null
   */
  find(value: T): BinarySearchTreeNode<T> | null {
    if (this.value === value) {
      return this;
    }

    if (value < this.value! && this.left) {
      return this.left.find(value);
    }

    if (value > this.value! && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  /**
   * Checks if a value exists in the tree.
   * Time complexity: O(log n) average, O(n) worst case
   *
   * @param value - The value to check for
   * @returns True if the value exists, false otherwise
   */
  contains(value: T): boolean {
    return !!this.find(value);
  }

  /**
   * Override setLeft to maintain type safety
   */
  override setLeft(node: BinarySearchTreeNode<T> | null): this {
    super.setLeft(node);
    return this;
  }

  /**
   * Override setRight to maintain type safety
   */
  override setRight(node: BinarySearchTreeNode<T> | null): this {
    super.setRight(node);
    return this;
  }
}

/**
 * Binary Tree Node with parent, sibling, and family relationship tracking.
 *
 * @template T - The type of value stored in the node
 * @category Data Structures
 */
export class BinaryTreeNode<T> {
  /**
   * The value stored in this node
   */
  public value: T | null;

  /**
   * Reference to the left child node
   */
  public left: BinaryTreeNode<T> | null = null;

  /**
   * Reference to the right child node
   */
  public right: BinaryTreeNode<T> | null = null;

  /**
   * Metadata storage for additional node information
   */
  public meta: Map<string, unknown> = new Map();

  /**
   * Reference to the parent node
   */
  public parent: BinaryTreeNode<T> | null = null;

  /**
   * Which side of the parent this node is on ('left' or 'right')
   */
  public parentSide: 'left' | 'right' | null = null;

  /**
   * Creates a new BinaryTreeNode
   *
   * @param value - The value to store in the node
   */
  constructor(value: T | null = null) {
    this.value = value;
  }

  /**
   * Gets the height of the left subtree.
   * Time complexity: O(1)
   *
   * @returns The height of the left subtree
   */
  get leftHeight(): number {
    return this.left ? this.left.height + 1 : 0;
  }

  /**
   * Gets the height of the right subtree.
   * Time complexity: O(1)
   *
   * @returns The height of the right subtree
   */
  get rightHeight(): number {
    return this.right ? this.right.height + 1 : 0;
  }

  /**
   * Gets the height of this node (max of left and right heights).
   * Time complexity: O(1)
   *
   * @returns The height of this node
   */
  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * Gets the balance factor (left height - right height).
   * Used in AVL trees for balancing.
   * Time complexity: O(1)
   *
   * @returns The balance factor
   */
  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Gets the sibling node (the other child of this node's parent).
   * Time complexity: O(1)
   *
   * @returns The sibling node or null
   */
  get sibling(): BinaryTreeNode<T> | null {
    const { parent } = this;
    if (!parent) return null;
    return parent.right === this ? parent.left : parent.right;
  }

  /**
   * Gets the uncle node (parent's sibling).
   * Time complexity: O(1)
   *
   * @returns The uncle node or null
   */
  get uncle(): BinaryTreeNode<T> | null {
    const { parent } = this;
    if (!parent) return null;
    return parent.sibling;
  }

  /**
   * Gets the grandparent node (parent's parent).
   * Time complexity: O(1)
   *
   * @returns The grandparent node or null
   */
  get grandparent(): BinaryTreeNode<T> | null {
    const { parent } = this;
    if (!parent) return null;
    return parent.parent;
  }

  /**
   * Sets the value of this node.
   * Time complexity: O(1)
   *
   * @param value - The new value
   * @returns This node for chaining
   */
  setValue(value: T | null): this {
    this.value = value;
    return this;
  }

  /**
   * Sets the left child and updates parent relationships.
   * Time complexity: O(1)
   *
   * @param node - The node to set as left child
   * @returns This node for chaining
   */
  setLeft(node: BinaryTreeNode<T> | null): this {
    if (this.left) {
      this.left.parent = null;
      this.left.parentSide = null;
    }
    this.left = node;
    if (this.left) {
      this.left.parent = this;
      this.left.parentSide = 'left';
    }
    return this;
  }

  /**
   * Sets the right child and updates parent relationships.
   * Time complexity: O(1)
   *
   * @param node - The node to set as right child
   * @returns This node for chaining
   */
  setRight(node: BinaryTreeNode<T> | null): this {
    if (this.right) {
      this.right.parent = null;
      this.right.parentSide = null;
    }
    this.right = node;
    if (this.right) {
      this.right.parent = this;
      this.right.parentSide = 'right';
    }
    return this;
  }

  /**
   * Removes a child node.
   * Time complexity: O(1)
   *
   * @param nodeToRemove - The child node to remove
   * @returns True if the node was removed, false otherwise
   */
  removeChild(nodeToRemove: BinaryTreeNode<T>): boolean {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      nodeToRemove.parent = null;
      nodeToRemove.parentSide = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      nodeToRemove.parent = null;
      nodeToRemove.parentSide = null;
      return true;
    }

    return false;
  }

  /**
   * Replaces a child node with another node.
   * Time complexity: O(1)
   *
   * @param nodeToReplace - The child node to replace
   * @param replacementNode - The node to replace it with
   * @returns True if the replacement was successful, false otherwise
   */
  replaceChild(
    nodeToReplace: BinaryTreeNode<T>,
    replacementNode: BinaryTreeNode<T>
  ): boolean {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      replacementNode.parent = this;
      replacementNode.parentSide = 'left';
      nodeToReplace.parent = null;
      nodeToReplace.parentSide = null;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      replacementNode.parent = this;
      replacementNode.parentSide = 'right';
      nodeToReplace.parent = null;
      nodeToReplace.parentSide = null;
      return true;
    }

    return false;
  }

  /**
   * Copies the content of one node to another.
   * Time complexity: O(1)
   *
   * @param sourceNode - The node to copy from
   * @param targetNode - The node to copy to
   */
  static copyNode<T>(
    sourceNode: BinaryTreeNode<T>,
    targetNode: BinaryTreeNode<T>
  ): void {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }
}

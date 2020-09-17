const LEFT = Symbol('left');
const RIGHT = Symbol('right');

/**
 * Binary Tree Node
 */
class BinaryTreeNode {
  /**
   * @param {*} [value]
   */
  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.meta = new Map();
    this.parent = null;
    this.parentSide = null;
  }

  /**
   * @returns {number}
   */
  get leftHeight() {
    return this.left ? this.left.height + 1 : 0;
  }

  /**
   * @returns {number}
   */
  get rightHeight() {
    return this.right ? this.right.height + 1 : 0;
  }

  /**
   * @returns {number}
   */
  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * @return {number}
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * @return {(BinaryTreeNode|null)}
   */
  get sibling() {
    const { parent } = this;
    if (!parent) return null;
    return parent.right === this ? parent.left : parent.right;
  }

  /**
   * @return {(BinaryTreeNode|null)}
   */
  get uncle() {
    const { parent } = this;
    if (!parent) return null;
    return parent.sibling;
  }

  /**
   * @return {(BinaryTreeNode|null)}
   */
  get grandparent() {
    const { parent } = this;
    if (!parent) return null;
    return parent.parent;
  }

  /**
   * @param {*} value
   * @return {BinaryTreeNode}
   */
  setValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setLeft(node) {
    if (this.left) this.left.parent = null;
    this.left = node;
    if (this.left) this.left.parent = this;
    return this;
  }

  /**
   * @param {BinaryTreeNode} node
   * @return {BinaryTreeNode}
   */
  setRight(node) {
    if (this.right) this.right.parent = null;
    this.right = node;
    if (this.right) this.right.parent = this;
    return this;
  }

  /**
   * @param {BinaryTreeNode} nodeToRemove
   * @return {boolean}
   */
  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      nodeToRemove.parent = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      nodeToRemove.parent = null;
      return true;
    }

    return false;
  }

  /**
   * @param {BinaryTreeNode} nodeToReplace
   * @param {BinaryTreeNode} nodeToRemove
   * @return {boolean}
   */
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      nodeToReplace.parent = null;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      nodeToReplace.parent = null;
      return true;
    }

    return false;
  }


  /**
   * @param {BinaryTreeNode} sourceNode
   * @param {BinaryTreeNode} targetNode
   */
  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }
}

BinaryTreeNode.RIGHT = RIGHT;
BinaryTreeNode.LEFT = LEFT;

module.exports = BinaryTreeNode;

const BinaryTreeNode = require('./BinaryTreeNode');

const MULTIPLICITY = 'multiplicity';

/**
 * Binary Search Tree Node
 */
class BinarySearchTreeNode extends BinaryTreeNode {
  /**
   * @param {*} [value]
   */
  constructor(value = null) {
    super(value);
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    if (this.value === null) {
      this.value = value;

      return this;
    }

    if (value < this.value) {
      if (this.left) return this.left.insert(value);

      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      if (this.right) return this.right.insert(value);

      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);

      return newNode;
    }

    const multiplicity = this.meta.get(MULTIPLICITY);
    this.meta.set(MULTIPLICITY, (multiplicity || 1) + 1);

    return this;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) return false;

    const multiplicity = nodeToRemove.meta.get(MULTIPLICITY);
    if (multiplicity && multiplicity > 1) {
      nodeToRemove.meta.set(MULTIPLICITY, multiplicity - 1);
      return true;
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) parent.removeChild(nodeToRemove);
      else nodeToRemove.setValue(null);
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) parent.replaceChild(nodeToRemove, childNode);
      else BinaryTreeNode.copyNode(childNode, nodeToRemove);
    }

    return true;
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMin() {
    if (!this.left) return this;

    return this.left.findMin();
  }

  /**
   * @param {*} value
   * @return {(BinarySearchTreeNode|null)}
   */
  find(value) {
    if (this.value === value) {
      return this;
    }

    if (value < this.value && this.left) {
      return this.left.find(value);
    }

    if (value > this.value && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    return !!this.find(value);
  }
}

module.exports = BinarySearchTreeNode;

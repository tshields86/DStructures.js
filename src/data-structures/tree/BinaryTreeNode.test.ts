import { describe, it, expect, beforeEach } from 'vitest';
import { BinaryTreeNode } from './BinaryTreeNode';

describe('BinaryTreeNode', () => {
  let node: BinaryTreeNode<number>;

  beforeEach(() => {
    node = new BinaryTreeNode(10);
  });

  describe('Constructor', () => {
    it('should create node with value', () => {
      expect(node.value).toBe(10);
      expect(node.left).toBeNull();
      expect(node.right).toBeNull();
      expect(node.parent).toBeNull();
      expect(node.parentSide).toBeNull();
    });

    it('should create node with null value', () => {
      const nullNode = new BinaryTreeNode<number>(null);
      expect(nullNode.value).toBeNull();
    });

    it('should create node with no arguments', () => {
      const emptyNode = new BinaryTreeNode<number>();
      expect(emptyNode.value).toBeNull();
    });

    it('should initialize meta map', () => {
      expect(node.meta).toBeInstanceOf(Map);
      expect(node.meta.size).toBe(0);
    });
  });

  describe('#setValue', () => {
    it('should set value and return this for chaining', () => {
      const result = node.setValue(20);
      expect(node.value).toBe(20);
      expect(result).toBe(node);
    });

    it('should allow setting null value', () => {
      node.setValue(null);
      expect(node.value).toBeNull();
    });

    it('should allow chaining', () => {
      node.setValue(5).setValue(10).setValue(15);
      expect(node.value).toBe(15);
    });
  });

  describe('#setLeft', () => {
    it('should set left child and update parent relationships', () => {
      const leftChild = new BinaryTreeNode(5);
      node.setLeft(leftChild);

      expect(node.left).toBe(leftChild);
      expect(leftChild.parent).toBe(node);
      expect(leftChild.parentSide).toBe('left');
    });

    it('should clear old left child parent relationship', () => {
      const oldLeft = new BinaryTreeNode(3);
      const newLeft = new BinaryTreeNode(5);

      node.setLeft(oldLeft);
      expect(oldLeft.parent).toBe(node);

      node.setLeft(newLeft);
      expect(oldLeft.parent).toBeNull();
      expect(oldLeft.parentSide).toBeNull();
      expect(newLeft.parent).toBe(node);
    });

    it('should allow setting null to clear left child', () => {
      const leftChild = new BinaryTreeNode(5);
      node.setLeft(leftChild);
      node.setLeft(null);

      expect(node.left).toBeNull();
      expect(leftChild.parent).toBeNull();
      expect(leftChild.parentSide).toBeNull();
    });

    it('should return this for chaining', () => {
      const result = node.setLeft(new BinaryTreeNode(5));
      expect(result).toBe(node);
    });
  });

  describe('#setRight', () => {
    it('should set right child and update parent relationships', () => {
      const rightChild = new BinaryTreeNode(15);
      node.setRight(rightChild);

      expect(node.right).toBe(rightChild);
      expect(rightChild.parent).toBe(node);
      expect(rightChild.parentSide).toBe('right');
    });

    it('should clear old right child parent relationship', () => {
      const oldRight = new BinaryTreeNode(13);
      const newRight = new BinaryTreeNode(15);

      node.setRight(oldRight);
      expect(oldRight.parent).toBe(node);

      node.setRight(newRight);
      expect(oldRight.parent).toBeNull();
      expect(oldRight.parentSide).toBeNull();
      expect(newRight.parent).toBe(node);
    });

    it('should allow setting null to clear right child', () => {
      const rightChild = new BinaryTreeNode(15);
      node.setRight(rightChild);
      node.setRight(null);

      expect(node.right).toBeNull();
      expect(rightChild.parent).toBeNull();
      expect(rightChild.parentSide).toBeNull();
    });

    it('should return this for chaining', () => {
      const result = node.setRight(new BinaryTreeNode(15));
      expect(result).toBe(node);
    });
  });

  describe('Height properties', () => {
    it('should calculate leftHeight correctly', () => {
      expect(node.leftHeight).toBe(0);

      const leftChild = new BinaryTreeNode(5);
      node.setLeft(leftChild);
      expect(node.leftHeight).toBe(1);

      const leftLeftChild = new BinaryTreeNode(3);
      leftChild.setLeft(leftLeftChild);
      expect(node.leftHeight).toBe(2);
    });

    it('should calculate rightHeight correctly', () => {
      expect(node.rightHeight).toBe(0);

      const rightChild = new BinaryTreeNode(15);
      node.setRight(rightChild);
      expect(node.rightHeight).toBe(1);

      const rightRightChild = new BinaryTreeNode(20);
      rightChild.setRight(rightRightChild);
      expect(node.rightHeight).toBe(2);
    });

    it('should calculate height as max of left and right heights', () => {
      expect(node.height).toBe(0);

      node.setLeft(new BinaryTreeNode(5));
      expect(node.height).toBe(1);

      node.setRight(new BinaryTreeNode(15));
      expect(node.height).toBe(1);

      node.right!.setRight(new BinaryTreeNode(20));
      expect(node.height).toBe(2);
    });
  });

  describe('#balanceFactor', () => {
    it('should be 0 for balanced tree', () => {
      node.setLeft(new BinaryTreeNode(5));
      node.setRight(new BinaryTreeNode(15));
      expect(node.balanceFactor).toBe(0);
    });

    it('should be positive when left-heavy', () => {
      node.setLeft(new BinaryTreeNode(5));
      node.left!.setLeft(new BinaryTreeNode(3));
      expect(node.balanceFactor).toBe(2);
    });

    it('should be negative when right-heavy', () => {
      node.setRight(new BinaryTreeNode(15));
      node.right!.setRight(new BinaryTreeNode(20));
      expect(node.balanceFactor).toBe(-2);
    });
  });

  describe('#sibling', () => {
    it('should return null when node has no parent', () => {
      expect(node.sibling).toBeNull();
    });

    it('should return right sibling for left child', () => {
      const leftChild = new BinaryTreeNode(5);
      const rightChild = new BinaryTreeNode(15);

      node.setLeft(leftChild);
      node.setRight(rightChild);

      expect(leftChild.sibling).toBe(rightChild);
    });

    it('should return left sibling for right child', () => {
      const leftChild = new BinaryTreeNode(5);
      const rightChild = new BinaryTreeNode(15);

      node.setLeft(leftChild);
      node.setRight(rightChild);

      expect(rightChild.sibling).toBe(leftChild);
    });

    it('should return null when sibling does not exist', () => {
      const leftChild = new BinaryTreeNode(5);
      node.setLeft(leftChild);

      expect(leftChild.sibling).toBeNull();
    });
  });

  describe('#uncle', () => {
    it('should return null when node has no parent', () => {
      expect(node.uncle).toBeNull();
    });

    it('should return null when parent has no parent', () => {
      const child = new BinaryTreeNode(5);
      node.setLeft(child);

      expect(child.uncle).toBeNull();
    });

    it('should return uncle node correctly', () => {
      const root = new BinaryTreeNode(10);
      const left = new BinaryTreeNode(5);
      const right = new BinaryTreeNode(15);
      const leftLeft = new BinaryTreeNode(3);

      root.setLeft(left);
      root.setRight(right);
      left.setLeft(leftLeft);

      expect(leftLeft.uncle).toBe(right);
    });

    it('should work for right uncle', () => {
      const root = new BinaryTreeNode(10);
      const left = new BinaryTreeNode(5);
      const right = new BinaryTreeNode(15);
      const rightRight = new BinaryTreeNode(20);

      root.setLeft(left);
      root.setRight(right);
      right.setRight(rightRight);

      expect(rightRight.uncle).toBe(left);
    });
  });

  describe('#grandparent', () => {
    it('should return null when node has no parent', () => {
      expect(node.grandparent).toBeNull();
    });

    it('should return null when parent has no parent', () => {
      const child = new BinaryTreeNode(5);
      node.setLeft(child);

      expect(child.grandparent).toBeNull();
    });

    it('should return grandparent node correctly', () => {
      const root = new BinaryTreeNode(10);
      const child = new BinaryTreeNode(5);
      const grandchild = new BinaryTreeNode(3);

      root.setLeft(child);
      child.setLeft(grandchild);

      expect(grandchild.grandparent).toBe(root);
    });
  });

  describe('#removeChild', () => {
    it('should remove left child', () => {
      const leftChild = new BinaryTreeNode(5);
      node.setLeft(leftChild);

      const result = node.removeChild(leftChild);

      expect(result).toBe(true);
      expect(node.left).toBeNull();
      expect(leftChild.parent).toBeNull();
      expect(leftChild.parentSide).toBeNull();
    });

    it('should remove right child', () => {
      const rightChild = new BinaryTreeNode(15);
      node.setRight(rightChild);

      const result = node.removeChild(rightChild);

      expect(result).toBe(true);
      expect(node.right).toBeNull();
      expect(rightChild.parent).toBeNull();
      expect(rightChild.parentSide).toBeNull();
    });

    it('should return false for non-child node', () => {
      const otherNode = new BinaryTreeNode(99);
      const result = node.removeChild(otherNode);

      expect(result).toBe(false);
    });

    it('should return false when trying to remove from node with no children', () => {
      const otherNode = new BinaryTreeNode(99);
      const result = node.removeChild(otherNode);

      expect(result).toBe(false);
      expect(node.left).toBeNull();
      expect(node.right).toBeNull();
    });
  });

  describe('#replaceChild', () => {
    it('should replace left child', () => {
      const oldChild = new BinaryTreeNode(5);
      const newChild = new BinaryTreeNode(7);

      node.setLeft(oldChild);
      const result = node.replaceChild(oldChild, newChild);

      expect(result).toBe(true);
      expect(node.left).toBe(newChild);
      expect(newChild.parent).toBe(node);
      expect(newChild.parentSide).toBe('left');
      expect(oldChild.parent).toBeNull();
      expect(oldChild.parentSide).toBeNull();
    });

    it('should replace right child', () => {
      const oldChild = new BinaryTreeNode(15);
      const newChild = new BinaryTreeNode(17);

      node.setRight(oldChild);
      const result = node.replaceChild(oldChild, newChild);

      expect(result).toBe(true);
      expect(node.right).toBe(newChild);
      expect(newChild.parent).toBe(node);
      expect(newChild.parentSide).toBe('right');
      expect(oldChild.parent).toBeNull();
      expect(oldChild.parentSide).toBeNull();
    });

    it('should return false for non-child node', () => {
      const nonChild = new BinaryTreeNode(99);
      const replacement = new BinaryTreeNode(100);

      const result = node.replaceChild(nonChild, replacement);

      expect(result).toBe(false);
    });

    it('should return false when nodeToReplace is null', () => {
      const replacement = new BinaryTreeNode(100);

      // @ts-expect-error Testing null input
      const result = node.replaceChild(null, replacement);

      expect(result).toBe(false);
    });

    it('should return false when replacementNode is null', () => {
      const oldChild = new BinaryTreeNode(5);
      node.setLeft(oldChild);

      // @ts-expect-error Testing null input
      const result = node.replaceChild(oldChild, null);

      expect(result).toBe(false);
    });
  });

  describe('Static copyNode', () => {
    it('should copy value and children from source to target', () => {
      const source = new BinaryTreeNode(20);
      const sourceLeft = new BinaryTreeNode(15);
      const sourceRight = new BinaryTreeNode(25);
      source.setLeft(sourceLeft);
      source.setRight(sourceRight);

      const target = new BinaryTreeNode(10);

      BinaryTreeNode.copyNode(source, target);

      expect(target.value).toBe(20);
      expect(target.left).toBe(sourceLeft);
      expect(target.right).toBe(sourceRight);
      expect(sourceLeft.parent).toBe(target);
      expect(sourceRight.parent).toBe(target);
    });

    it('should handle copying node with no children', () => {
      const source = new BinaryTreeNode(20);
      const target = new BinaryTreeNode(10);
      target.setLeft(new BinaryTreeNode(5));
      target.setRight(new BinaryTreeNode(15));

      BinaryTreeNode.copyNode(source, target);

      expect(target.value).toBe(20);
      expect(target.left).toBeNull();
      expect(target.right).toBeNull();
    });
  });

  describe('Meta property', () => {
    it('should allow storing metadata', () => {
      node.meta.set('color', 'red');
      node.meta.set('count', 5);

      expect(node.meta.get('color')).toBe('red');
      expect(node.meta.get('count')).toBe(5);
    });

    it('should maintain separate meta for different nodes', () => {
      const node2 = new BinaryTreeNode(20);

      node.meta.set('key', 'value1');
      node2.meta.set('key', 'value2');

      expect(node.meta.get('key')).toBe('value1');
      expect(node2.meta.get('key')).toBe('value2');
    });
  });

  describe('Complex tree structures', () => {
    it('should maintain proper relationships in complex tree', () => {
      //        10
      //       /  \
      //      5    15
      //     / \   / \
      //    3   7 12 20

      const root = new BinaryTreeNode(10);
      const n5 = new BinaryTreeNode(5);
      const n15 = new BinaryTreeNode(15);
      const n3 = new BinaryTreeNode(3);
      const n7 = new BinaryTreeNode(7);
      const n12 = new BinaryTreeNode(12);
      const n20 = new BinaryTreeNode(20);

      root.setLeft(n5);
      root.setRight(n15);
      n5.setLeft(n3);
      n5.setRight(n7);
      n15.setLeft(n12);
      n15.setRight(n20);

      // Test parent relationships
      expect(n3.parent).toBe(n5);
      expect(n7.parent).toBe(n5);
      expect(n12.parent).toBe(n15);
      expect(n20.parent).toBe(n15);

      // Test siblings
      expect(n3.sibling).toBe(n7);
      expect(n7.sibling).toBe(n3);
      expect(n12.sibling).toBe(n20);

      // Test uncles
      expect(n3.uncle).toBe(n15);
      expect(n12.uncle).toBe(n5);

      // Test grandparents
      expect(n3.grandparent).toBe(root);
      expect(n20.grandparent).toBe(root);

      // Test heights
      expect(root.height).toBe(2);
      expect(n5.height).toBe(1);
      expect(n15.height).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle chain of left children', () => {
      const root = new BinaryTreeNode(1);
      const n2 = new BinaryTreeNode(2);
      const n3 = new BinaryTreeNode(3);

      root.setLeft(n2);
      n2.setLeft(n3);

      expect(root.leftHeight).toBe(2);
      expect(root.rightHeight).toBe(0);
      expect(root.balanceFactor).toBe(2);
    });

    it('should handle chain of right children', () => {
      const root = new BinaryTreeNode(1);
      const n2 = new BinaryTreeNode(2);
      const n3 = new BinaryTreeNode(3);

      root.setRight(n2);
      n2.setRight(n3);

      expect(root.leftHeight).toBe(0);
      expect(root.rightHeight).toBe(2);
      expect(root.balanceFactor).toBe(-2);
    });

    it('should update height when child is removed', () => {
      const root = new BinaryTreeNode(1);
      const child = new BinaryTreeNode(2);

      root.setLeft(child);
      expect(root.height).toBe(1);

      root.setLeft(null);
      expect(root.height).toBe(0);
    });
  });
});

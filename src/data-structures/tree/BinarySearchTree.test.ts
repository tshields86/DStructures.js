import { describe, it, expect, beforeEach } from 'vitest';
import { BinarySearchTree } from './BinarySearchTree';
import { BinarySearchTreeNode } from './BinarySearchTreeNode';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  it('should create empty BST', () => {
    bst = new BinarySearchTree<number>();
    expect(bst.size).toBe(0);
    expect(bst.root.value).toBeNull();
  });

  it('should create BST from iterable', () => {
    bst = new BinarySearchTree([5, 3, 7, 1, 9]);
    expect(bst.size).toBe(5);
    expect(bst.root.value).toBe(5);
  });

  describe('#insert', () => {
    beforeEach(() => {
      bst = new BinarySearchTree<number>();
    });

    it('should insert values maintaining BST property', () => {
      bst.insert(5);
      expect(bst.root.value).toBe(5);
      expect(bst.size).toBe(1);

      bst.insert(3);
      expect(bst.root.left?.value).toBe(3);
      expect(bst.size).toBe(2);

      bst.insert(7);
      expect(bst.root.right?.value).toBe(7);
      expect(bst.size).toBe(3);

      bst.insert(1);
      expect(bst.root.left?.left?.value).toBe(1);
      expect(bst.size).toBe(4);
    });

    it('should handle duplicate values with multiplicity', () => {
      bst.insert(5);
      bst.insert(5);
      bst.insert(5);
      expect(bst.size).toBe(3);
      expect(bst.root.meta.get('multiplicity')).toBe(3);
    });

    it('should work with alias add', () => {
      bst.add(10);
      expect(bst.root.value).toBe(10);
    });

    it('should work with alias set', () => {
      bst.set(10);
      expect(bst.root.value).toBe(10);
    });
  });

  describe('#find', () => {
    beforeEach(() => {
      bst = new BinarySearchTree([5, 3, 7, 1, 9, 6, 8]);
    });

    it('should find existing values', () => {
      expect(bst.find(5)?.value).toBe(5);
      expect(bst.find(3)?.value).toBe(3);
      expect(bst.find(7)?.value).toBe(7);
      expect(bst.find(1)?.value).toBe(1);
      expect(bst.find(9)?.value).toBe(9);
    });

    it('should return null for non-existent values', () => {
      expect(bst.find(100)).toBeNull();
      expect(bst.find(0)).toBeNull();
    });

    it('should work with alias has', () => {
      expect(bst.has(5)?.value).toBe(5);
    });
  });

  describe('#contains', () => {
    beforeEach(() => {
      bst = new BinarySearchTree([5, 3, 7, 1, 9]);
    });

    it('should return true for existing values', () => {
      expect(bst.contains(5)).toBe(true);
      expect(bst.contains(3)).toBe(true);
      expect(bst.contains(7)).toBe(true);
    });

    it('should return false for non-existent values', () => {
      expect(bst.contains(100)).toBe(false);
      expect(bst.contains(0)).toBe(false);
    });

    it('should work with alias get', () => {
      expect(bst.get(5)).toBe(true);
      expect(bst.get(100)).toBe(false);
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      bst = new BinarySearchTree([5, 3, 7, 1, 4, 6, 9]);
    });

    it('should remove leaf nodes', () => {
      expect(bst.remove(1)).toBe(true);
      expect(bst.size).toBe(6);
      expect(bst.find(1)).toBeNull();
      expect(bst.root.left?.left).toBeNull();
    });

    it('should remove nodes with one child', () => {
      bst = new BinarySearchTree([5, 3, 7, 1]);
      expect(bst.remove(3)).toBe(true);
      expect(bst.size).toBe(3);
      expect(bst.find(3)).toBeNull();
      expect(bst.root.left?.value).toBe(1);
    });

    it('should remove nodes with two children', () => {
      expect(bst.remove(3)).toBe(true);
      expect(bst.size).toBe(6);
      expect(bst.find(3)).toBeNull();
      // Should be replaced by in-order successor
      expect(bst.root.left?.value).toBe(4);
    });

    it('should remove root node', () => {
      expect(bst.remove(5)).toBe(true);
      expect(bst.size).toBe(6);
      expect(bst.find(5)).toBeNull();
      // Root should be replaced
      expect(bst.root.value).not.toBe(5);
    });

    it('should handle duplicates with multiplicity', () => {
      bst.insert(5);
      bst.insert(5);
      const initialSize = bst.size;
      expect(bst.remove(5)).toBe(true);
      expect(bst.size).toBe(initialSize - 1);
      expect(bst.root.meta.get('multiplicity')).toBe(2);
    });

    it('should return false for non-existent values', () => {
      expect(bst.remove(100)).toBe(false);
      expect(bst.size).toBe(7);
    });

    it('should work with alias delete', () => {
      expect(bst.delete(1)).toBe(true);
      expect(bst.find(1)).toBeNull();
    });
  });

  describe('#bfs', () => {
    it('should traverse tree in breadth-first order', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 4, 6, 9]);
      const values = Array.from(bst.bfs());
      expect(values).toEqual([5, 3, 7, 1, 4, 6, 9]);
    });

    it('should handle single node', () => {
      bst = new BinarySearchTree([5]);
      const values = Array.from(bst.bfs());
      expect(values).toEqual([5]);
    });
  });

  describe('#dfs', () => {
    it('should traverse tree in depth-first order', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 4, 6, 9]);
      const values = Array.from(bst.dfs());
      // DFS pre-order: root, left subtree, right subtree
      expect(values).toEqual([5, 3, 1, 4, 7, 6, 9]);
    });

    it('should handle single node', () => {
      bst = new BinarySearchTree([5]);
      const values = Array.from(bst.dfs());
      expect(values).toEqual([5]);
    });
  });

  describe('#inOrderTraversal', () => {
    it('should return values in sorted order', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6]);
      const values = Array.from(bst.inOrderTraversal()).filter(
        (v) => v !== null
      );
      expect(values).toEqual([1, 3, 4, 5, 6, 7, 9]);
    });

    it('should handle single node', () => {
      bst = new BinarySearchTree([5]);
      const values = Array.from(bst.inOrderTraversal());
      expect(values).toEqual([5]);
    });
  });

  describe('#preOrderTraversal', () => {
    it('should traverse in pre-order (root-left-right)', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 4, 6, 9]);
      const values = Array.from(bst.preOrderTraversal());
      expect(values).toEqual([5, 3, 1, 4, 7, 6, 9]);
    });
  });

  describe('#postOrderTraversal', () => {
    it('should traverse in post-order (left-right-root)', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 4, 6, 9]);
      const values = Array.from(bst.postOrderTraversal());
      expect(values).toEqual([1, 4, 3, 6, 9, 7, 5]);
    });
  });

  describe('#fromArray', () => {
    it('should build tree from array', () => {
      bst = new BinarySearchTree<number>();
      bst.fromArray([5, 3, 7, 1, 9]);
      expect(bst.size).toBe(5);
      expect(bst.root.value).toBe(5);
    });

    it('should append to existing tree', () => {
      bst = new BinarySearchTree([5]);
      bst.fromArray([3, 7]);
      expect(bst.size).toBe(3);
    });
  });

  describe('#toArray', () => {
    it('should return sorted array', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6]);
      const array = bst.toArray().filter((v) => v !== null);
      expect(array).toEqual([1, 3, 4, 5, 6, 7, 9]);
    });

    it('should return array with null for empty tree', () => {
      bst = new BinarySearchTree<number>();
      expect(bst.toArray()).toEqual([null]);
    });
  });

  describe('BST property', () => {
    it('should maintain left < parent < right property', () => {
      bst = new BinarySearchTree([5, 3, 7, 1, 9, 4, 6]);

      // Check root
      expect(bst.root.value).toBe(5);
      expect(bst.root.left?.value).toBeLessThan(5);
      expect(bst.root.right?.value).toBeGreaterThan(5);

      // Check left subtree
      const leftChild = bst.root.left;
      if (leftChild && leftChild.value !== null) {
        expect(leftChild.left?.value).toBeLessThan(leftChild.value);
        expect(leftChild.right?.value).toBeGreaterThan(leftChild.value);
      }

      // Check right subtree
      const rightChild = bst.root.right;
      if (rightChild && rightChild.value !== null) {
        expect(rightChild.left?.value).toBeLessThan(rightChild.value);
        expect(rightChild.right?.value).toBeGreaterThan(rightChild.value);
      }
    });
  });

  describe('Complex operations', () => {
    it('should handle sequential insertions and removals', () => {
      bst = new BinarySearchTree<number>();
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      expect(bst.size).toBe(3);

      bst.remove(3);
      expect(bst.size).toBe(2);
      expect(bst.contains(3)).toBe(false);

      bst.insert(4);
      bst.insert(6);
      expect(bst.size).toBe(4);
      expect(bst.toArray().filter((v) => v !== null)).toEqual([4, 5, 6, 7]);
    });

    it('should handle removing all nodes', () => {
      bst = new BinarySearchTree([5, 3, 7]);
      bst.remove(3);
      bst.remove(7);
      bst.remove(5);
      expect(bst.size).toBe(0);
      expect(bst.root.value).toBeNull();
    });
  });

  describe('Type safety', () => {
    it('should work with strings', () => {
      const stringBst = new BinarySearchTree<string>(['dog', 'cat', 'elephant']);
      expect(stringBst.contains('dog')).toBe(true);
      expect(stringBst.toArray().filter((v) => v !== null)).toEqual([
        'cat',
        'dog',
        'elephant',
      ]);
    });

    it('should work with custom comparable objects', () => {
      interface Person {
        name: string;
        age: number;
      }
      const personBst = new BinarySearchTree<Person>();
      const alice = { name: 'Alice', age: 30 };
      const bob = { name: 'Bob', age: 25 };

      // Note: This would require custom comparator in real implementation
      // For now, just test that the structure accepts the type
      expect(personBst.size).toBe(0);
    });
  });
});

describe('BinarySearchTreeNode', () => {
  let node: BinarySearchTreeNode<number>;

  beforeEach(() => {
    node = new BinarySearchTreeNode(5);
  });

  describe('#findMin', () => {
    it('should find minimum value in subtree', () => {
      node.insert(3);
      node.insert(7);
      node.insert(1);
      node.insert(4);

      const minNode = node.findMin();
      expect(minNode.value).toBe(1);
    });

    it('should return self if no left child', () => {
      const minNode = node.findMin();
      expect(minNode).toBe(node);
      expect(minNode.value).toBe(5);
    });
  });

  describe('Parent relationships', () => {
    it('should maintain parent pointers', () => {
      node.insert(3);
      node.insert(7);

      expect(node.left?.parent).toBe(node);
      expect(node.right?.parent).toBe(node);
    });

    it('should update parent on removal', () => {
      node.insert(3);
      node.insert(1);
      node.remove(3);

      expect(node.left?.value).toBe(1);
      expect(node.left?.parent).toBe(node);
    });
  });

  describe('Multiplicity', () => {
    it('should track duplicate insertions', () => {
      node.insert(5);
      node.insert(5);

      expect(node.meta.get('multiplicity')).toBe(3);
    });

    it('should decrement multiplicity on removal', () => {
      node.insert(5);
      node.insert(5);
      node.remove(5);

      expect(node.meta.get('multiplicity')).toBe(2);
    });
  });
});

const BinarySearchTree = require('../BinarySearchTree');

const ITERABLE = [3, 1, 5, 0, 2, 4];
const MULTIPLICITY = 'multiplicity';

describe('BinarySearchTree', () => {
  it('should create empty BST', () => {
    const binarySearchTree = new BinarySearchTree();

    expect(binarySearchTree.root.value).toBeNull();
    expect(binarySearchTree.size).toBe(0);
  });

  it('should create BST from iterable', () => {
    const binarySearchTree = new BinarySearchTree(ITERABLE);

    expect(binarySearchTree.root.value).toBe(3);
    expect(binarySearchTree.root.left.value).toBe(1);
    expect(binarySearchTree.root.right.value).toBe(5);
    expect(binarySearchTree.size).toBe(6);
  });

  describe('#insert', () => {
    const binarySearchTree = new BinarySearchTree();

    it('should set itself to value if iteself is null', () => {
      binarySearchTree.insert(3);
      expect(binarySearchTree.root.value).toEqual(3);
      expect(binarySearchTree.size).toBe(1);
    });

    it('should insert BST node to the left if value is less than itself', () => {
      binarySearchTree.insert(1);
      expect(binarySearchTree.root.left.value).toEqual(1);
      expect(binarySearchTree.size).toBe(2);
    });

    it('should insert BST node to the right if value is greater than itself', () => {
      binarySearchTree.insert(5);
      expect(binarySearchTree.root.right.value).toEqual(5);
      expect(binarySearchTree.size).toBe(3);
    });

    it('should increase the meta multiplicity if value is equal to itself', () => {
      binarySearchTree.insert(1);
      expect(binarySearchTree.root.left.value).toEqual(1);
      expect(binarySearchTree.root.left.meta.get(MULTIPLICITY)).toEqual(2);
      expect(binarySearchTree.size).toBe(4);
    });
  });

  let binarySearchTree;

  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(ITERABLE);

    /*
            3
        1       5
      0   2   4
    */
  });

  describe('#remove', () => {
    it('should return false if value does not exist', () => {
      expect(binarySearchTree.remove(10)).toBeFalsy();
    });

    it('should decrease the meta multiplicity if greater than 1', () => {
      binarySearchTree.insert(3);
      expect(binarySearchTree.root.meta.get(MULTIPLICITY)).toEqual(2);
      binarySearchTree.remove(3);
      expect(binarySearchTree.root.meta.get(MULTIPLICITY)).toEqual(1);
    });

    describe('it is a leaf node', () => {
      it('should remove node if it has a parent', () => {
        expect(binarySearchTree.remove(0)).toBeTruthy();
        expect(binarySearchTree.root.left.left).toBeNull();
      });

      it('should set value to null if it does not have a parent', () => {
        const binarySearchTree2 = new BinarySearchTree();
        binarySearchTree2.insert(10);
        expect(binarySearchTree2.remove(10)).toBeTruthy();
        expect(binarySearchTree2.root.value).toBeNull();
      });
    });

    describe('it has both left and right child nodes', () => {
      it('should remove node and restructure tree', () => {
        expect(binarySearchTree.remove(1)).toBeTruthy();
        expect(binarySearchTree.root.left.value).toBe(2);
        expect(binarySearchTree.root.left.left.value).toBe(0);
      });
    });

    describe('it has only one child node', () => {
      it('should replace child node with itself', () => {
        expect(binarySearchTree.remove(5)).toBeTruthy();
        expect(binarySearchTree.root.right.value).toBe(4);
      });
    });
  });

  describe('#find', () => {
    it('should return node if value exists', () => {
      expect(binarySearchTree.find(1).value).toEqual(1);
    });

    it('should return null if value does not exist', () => {
      expect(binarySearchTree.find(10)).toBeNull();
    });
  });

  describe('#contains', () => {
    it('should return node if value exists', () => {
      expect(binarySearchTree.find(1)).toBeTruthy();
    });

    it('should return null if value does not exist', () => {
      expect(binarySearchTree.find(10)).toBeFalsy();
    });
  });

  describe('#toArray', () => {
    it('should add node values from BST to array', () => {
      expect(binarySearchTree.toArray()).toEqual([0, 1, 2, 3, 4, 5]);
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to BST from array', () => {
      const binarySearchTree2 = new BinarySearchTree();
      binarySearchTree2.fromArray(ITERABLE);
      expect(binarySearchTree2.toArray()).toEqual([0, 1, 2, 3, 4, 5]);
    });
  });

  describe('#bfs', () => {
    it('should perform a bfs iteration over tree', () => {
      expect(Array.from(binarySearchTree.bfs())).toEqual([3, 1, 5, 0, 2, 4]);
    });
  });

  describe('#dfs', () => {
    it('should perform a dfs iteration over tree', () => {
      expect(Array.from(binarySearchTree.dfs())).toEqual([3, 1, 0, 2, 5, 4]);
    });
  });

  describe('#inOrderTraversal', () => {
    it('should perform a inOrderTraversal iteration over tree', () => {
      expect(Array.from(binarySearchTree.inOrderTraversal())).toEqual([0, 1, 2, 3, 4, 5]);
    });
  });

  describe('#preOrderTraversal', () => {
    it('should perform a preOrderTraversal iteration over tree', () => {
      expect(Array.from(binarySearchTree.preOrderTraversal())).toEqual([3, 1, 0, 2, 5, 4]);
    });
  });

  describe('#postOrderTraversal', () => {
    it('should perform a postOrderTraversal iteration over tree', () => {
      expect(Array.from(binarySearchTree.postOrderTraversal())).toEqual([0, 2, 1, 4, 5, 3]);
    });
  });
});

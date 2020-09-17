const BinarySearchTreeNode = require('../BinarySearchTreeNode');

describe('BinarySearchTreeNode', () => {
  it('should create BST node with value', () => {
    const node = new BinarySearchTreeNode('foo');

    expect(node.value).toBe('foo');
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  describe('#insert', () => {
    const node3 = new BinarySearchTreeNode(3);

    it('should set itself to value if iteself is null', () => {
      node3.value = null;
      expect(node3.value).toBeNull();

      node3.insert(3);
      expect(node3.value).toEqual(3);
    });

    it('should insert BST node to the left if value is less than itself', () => {
      node3.insert(1);
      expect(node3.left.value).toEqual(1);
      expect(node3.left.parent.value).toEqual(3);
    });

    it('should insert BST node to the right if value is greater than itself', () => {
      node3.insert(5);
      expect(node3.right.value).toEqual(5);
      expect(node3.right.parent.value).toEqual(3);
    });

    it('should increase the meta multiplicity if value is equal to itself', () => {
      node3.insert(3);
      expect(node3.meta.multiplicity).toEqual(2);
    });
  });

  let node3;

  beforeEach(() => {
    node3 = new BinarySearchTreeNode(3);
    node3.insert(1);
    node3.insert(5);
    node3.insert(0);
    node3.insert(2);
    node3.insert(4);

    /*
            3
        1       5
      0   2   4
    */
  });

  describe('#remove', () => {
    it('should return false if value does not exist', () => {
      expect(node3.remove(10)).toBeFalsy();
    });

    it('should decrease the meta multiplicity if greater than 1', () => {
      node3.insert(3);
      expect(node3.meta.multiplicity).toEqual(2);
      node3.remove(3);
      expect(node3.meta.multiplicity).toEqual(1);
    });

    describe('it is a leaf node', () => {
      it('should remove node if it has a parent', () => {
        expect(node3.remove(0)).toBeTruthy();
        expect(node3.left.left).toBeNull();
      });

      it('should set value to null if it does not have a parent', () => {
        const node10 = new BinarySearchTreeNode(10);
        expect(node10.remove(10)).toBeTruthy();
        expect(node10.value).toBeNull();
      });
    });

    describe('it has both left and right child nodes', () => {
      it('should remove node and restructure tree', () => {
        expect(node3.remove(1)).toBeTruthy();
        expect(node3.left.value).toBe(2);
        expect(node3.left.left.value).toBe(0);
      });
    });

    describe('it has only one child node', () => {
      it('should replace child node with itself', () => {
        expect(node3.remove(5)).toBeTruthy();
        expect(node3.right.value).toBe(4);
      });
    });
  });

  describe('#findMin', () => {
    it('should find the min in a subtree', () => {
      expect(node3.findMin().value).toEqual(0);
      expect(node3.right.findMin().value).toEqual(4);
    });
  });

  describe('#find', () => {
    it('should return node if value exists', () => {
      expect(node3.find(1).value).toEqual(1);
    });

    it('should return null if value does not exist', () => {
      expect(node3.find(10)).toBeNull();
    });
  });

  describe('#contains', () => {
    it('should return node if value exists', () => {
      expect(node3.find(1)).toBeTruthy();
    });

    it('should return null if value does not exist', () => {
      expect(node3.find(10)).toBeFalsy();
    });
  });
});

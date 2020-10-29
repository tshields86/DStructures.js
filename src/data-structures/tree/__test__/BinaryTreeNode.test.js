const BinaryTreeNode = require('../BinaryTreeNode');

describe('BinaryTreeNode', () => {
  it('should create binary tree node with value', () => {
    const node = new BinaryTreeNode('foo');

    expect(node.value).toBe('foo');
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  let node0;
  let node1;
  let node2;
  let node3;
  let node4;
  let node5;
  let node6;
  let node7;
  let nodeX;

  beforeEach(() => {
    node0 = new BinaryTreeNode(0);
    node1 = new BinaryTreeNode(1);
    node2 = new BinaryTreeNode(2);
    node3 = new BinaryTreeNode(3);
    node4 = new BinaryTreeNode(4);
    node5 = new BinaryTreeNode(5);
    node6 = new BinaryTreeNode(6);
    node7 = new BinaryTreeNode(7);
    nodeX = new BinaryTreeNode('X');

    node0.left = node1;
    node0.right = node2;
    node1.parent = node0;
    node2.parent = node0;
    node1.left = node3;
    node1.right = node4;
    node3.parent = node1;
    node4.parent = node1;
    node2.left = node5;
    node2.right = node6;
    node5.parent = node2;
    node6.parent = node2;
    node3.left = node7;
    node7.parent = node3;

    /*
              0
          1       2
        3   4   5   6
      7
    */
  });

  it('should link nodes together', () => {
    expect(node0.left).toEqual(node1);
    expect(node0.right).toEqual(node2);
    expect(node1.left).toEqual(node3);
    expect(node1.right).toEqual(node4);
  });

  describe('#leftHeight', () => {
    it('should return the left side height of the node', () => {
      expect(node0.leftHeight).toEqual(3);
      expect(node1.leftHeight).toEqual(2);
      expect(node3.leftHeight).toEqual(1);
      expect(node7.leftHeight).toEqual(0);
    });
  });

  describe('#rightHeight', () => {
    it('should return the right side height of the node', () => {
      expect(node0.rightHeight).toEqual(2);
      expect(node1.rightHeight).toEqual(1);
      expect(node3.rightHeight).toEqual(0);
      expect(node7.rightHeight).toEqual(0);
    });
  });

  describe('#height', () => {
    it('should return the height of the node', () => {
      expect(node0.height).toEqual(3);
      expect(node1.height).toEqual(2);
      expect(node3.height).toEqual(1);
      expect(node7.height).toEqual(0);
    });
  });

  describe('#balanceFactor', () => {
    it('should return the balance factor', () => {
      expect(node0.height).toEqual(3);
      expect(node1.height).toEqual(2);
      expect(node3.height).toEqual(1);
      expect(node7.height).toEqual(0);
    });
  });

  describe('#sibling', () => {
    it('should return the sibling of the node', () => {
      expect(node1.sibling).toEqual(node2);
      expect(node2.sibling).toEqual(node1);
      expect(node3.sibling).toEqual(node4);
      expect(node4.sibling).toEqual(node3);
      expect(node7.sibling).toBeNull();
    });
  });

  describe('#uncle', () => {
    it('should return the uncle of the node', () => {
      expect(node3.uncle).toEqual(node2);
      expect(node4.uncle).toEqual(node2);
      expect(node5.uncle).toEqual(node1);
      expect(node6.uncle).toEqual(node1);
      expect(node1.uncle).toBeNull();
      expect(node2.uncle).toBeNull();
    });
  });

  describe('#grandparent', () => {
    it('should return the grandparent of the node', () => {
      expect(node3.grandparent).toEqual(node0);
      expect(node4.grandparent).toEqual(node0);
      expect(node7.grandparent).toEqual(node1);
      expect(node1.grandparent).toBeNull();
      expect(node2.grandparent).toBeNull();
    });
  });

  describe('#setValue', () => {
    it('should set the value of the node', () => {
      node0.setValue(5);
      node7.setValue(10);

      expect(node0.value).toEqual(5);
      expect(node7.value).toEqual(10);
    });
  });

  describe('#setLeft', () => {
    it('should set the left side node', () => {
      node1.setLeft(nodeX);

      expect(node1.left).toEqual(nodeX);
      expect(nodeX.parent).toEqual(node1);
      expect(node3.parent).toBeNull();
    });
  });

  describe('#setRight', () => {
    it('should set the right side node', () => {
      node1.setRight(nodeX);

      expect(node1.right).toEqual(nodeX);
      expect(nodeX.parent).toEqual(node1);
      expect(node4.parent).toBeNull();
    });
  });

  describe('#removeChild', () => {
    it('should remove left child node and return boolean true', () => {
      expect(node3.removeChild(node7)).toBe(true);
      expect(node3.left).toBeNull();
      expect(node7.parent).toBeNull();
    });

    it('should remove right child node and return boolean true', () => {
      expect(node1.removeChild(node4)).toBe(true);
      expect(node1.right).toBeNull();
      expect(node4.parent).toBeNull();
    });

    it('should not remove if not a child node and return boolean false', () => {
      expect(node1.removeChild(node0)).toBe(false);
      expect(node1.left).toEqual(node3);
      expect(node1.right).toEqual(node4);
    });
  });

  describe('#replaceChild', () => {
    it('should replace left child node and return boolean true', () => {
      expect(node3.replaceChild(node7, nodeX)).toBe(true);
      expect(node3.left).toEqual(nodeX);
      expect(node7.parent).toBeNull();
    });

    it('should replace right child node and return boolean true', () => {
      expect(node1.replaceChild(node4, nodeX)).toBe(true);
      expect(node1.right).toEqual(nodeX);
      expect(node4.parent).toBeNull();
    });

    it('should not replace if not a child node and return boolean false', () => {
      expect(node1.replaceChild(node0, nodeX)).toBe(false);
      expect(node1.left).toEqual(node3);
      expect(node1.right).toEqual(node4);
    });
  });

  describe('#copyNode', () => {
    it('should copy source node to target node', () => {
      BinaryTreeNode.copyNode(node7, node3);
      expect(node3.left).toBeNull();
      expect(node3.right).toBeNull();
    });
  });
});

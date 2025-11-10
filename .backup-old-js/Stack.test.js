const Stack = require('../Stack');

const ITERABLE = [1, 2, 3];

describe('Stack', () => {
  let stack;

  it('should create empty stack', () => {
    stack = new Stack();
    expect([...stack]).toEqual([]);
  });

  it('should create stack from iterable', () => {
    stack = new Stack(ITERABLE);
    expect([...stack]).toEqual([3, 2, 1]);
  });

  describe('#push', () => {
    it('should add element to the beginning of the stack', () => {
      stack = new Stack();
      expect(stack.linkedList.head).toBeNull();
      expect(stack.linkedList.tail).toBeNull();

      stack.push(1);
      expect(stack.linkedList.head.value).toBe(1);
      expect(stack.linkedList.tail.value).toBe(1);

      stack
        .push(2)
        .push(3);

      expect([...stack]).toEqual([3, 2, 1]);
    });

    it('should add element to the beginning of the stack (alias add)', () => {
      stack = new Stack();
      expect(stack.linkedList.head).toBeNull();
      expect(stack.linkedList.tail).toBeNull();

      stack.add(1);
      expect(stack.linkedList.head.value).toBe(1);
      expect(stack.linkedList.tail.value).toBe(1);

      stack
        .add(2)
        .add(3);

      expect([...stack]).toEqual([3, 2, 1]);
    });
  });

  describe('#pop', () => {
    it('should remove node from the beginning of the stack', () => {
      stack = new Stack();
      stack
        .push(1)
        .push(2);

      expect([...stack]).toEqual([2, 1]);
      expect(stack.pop()).toBe(2);
      expect(stack.peek()).toBe(1);
    });

    it('should remove node from the beginning of the stack (alias remove)', () => {
      stack = new Stack();
      stack
        .push(1)
        .push(2);

      expect([...stack]).toEqual([2, 1]);
      expect(stack.remove()).toBe(2);
      expect(stack.peek()).toBe(1);
    });
  });

  describe('#size', () => {
    it('should return the number of nodes in the stack', () => {
      stack = new Stack();
      expect(stack.size).toBe(0);

      stack.push(1);
      expect(stack.size).toBe(1);

      stack.push(2);
      expect(stack.size).toBe(2);

      stack.clear();
      expect(stack.size).toBe(0);
    });
  });

  describe('#peek', () => {
    it('should return value from the beginning of the stack', () => {
      stack = new Stack();
      stack.push(1);
      expect(stack.peek()).toBe(1);

      stack.push(2);
      expect(stack.peek()).toBe(2);
    });
  });

  describe('#clear', () => {
    it('should all nodes from the stack', () => {
      stack = new Stack(ITERABLE);
      expect([...stack]).toEqual([3, 2, 1]);

      stack.clear();
      expect([...stack]).toEqual([]);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether stack is empty', () => {
      stack = new Stack();
      expect(stack.isEmpty()).toBe(true);

      stack.push(1);
      expect(stack.isEmpty()).toBe(false);

      stack.clear();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to stack from array', () => {
      stack = new Stack();
      stack.fromArray(ITERABLE);
      expect([...stack]).toEqual([3, 2, 1]);
    });
  });

  describe('#toArray', () => {
    it('should add node values from stack to array', () => {
      stack = new Stack();
      stack.fromArray(ITERABLE);
      expect(stack.toArray()).toEqual(ITERABLE);
    });
  });


  describe('#[Symbol.iterator]', () => {
    it('should iterate through queue and yield each node value', () => {
      stack = new Stack(ITERABLE);

      expect([...stack]).toEqual([3, 2, 1]);
    });
  });
});

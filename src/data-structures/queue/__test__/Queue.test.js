const Queue = require('../Queue');

const ITERABLE = [1, 2, 3];

describe('Queue', () => {
  let queue;

  it('should create empty queue', () => {
    queue = new Queue();
    expect(queue.toString()).toBe('');
  });

  it('should create queue from iterable', () => {
    queue = new Queue(ITERABLE);
    expect(queue.toString()).toBe('1,2,3');
  });

  describe('#enqueue', () => {
    it('should add element to the end of the queue', () => {
      queue = new Queue();
      expect(queue.linkedList.head).toBeNull();
      expect(queue.linkedList.tail).toBeNull();

      queue.enqueue(1);
      expect(queue.linkedList.head.toString()).toBe('1');
      expect(queue.linkedList.tail.toString()).toBe('1');

      queue
        .enqueue(2)
        .enqueue(3);

      expect(queue.toString()).toBe('1,2,3');
    });

    it('should add element to the end of the queue (alias add)', () => {
      queue = new Queue();
      expect(queue.linkedList.head).toBeNull();
      expect(queue.linkedList.tail).toBeNull();

      queue.add(1);
      expect(queue.linkedList.head.toString()).toBe('1');
      expect(queue.linkedList.tail.toString()).toBe('1');

      queue
        .add(2)
        .add(3);

      expect(queue.toString()).toBe('1,2,3');
    });
  });

  describe('#dequeue', () => {
    it('should remove node from the beginning of the queue', () => {
      queue = new Queue();
      queue
        .enqueue(1)
        .enqueue(2);

      expect(queue.toString()).toBe('1,2');
      expect(queue.dequeue()).toBe(1);
      expect(queue.peek()).toBe(2);
    });

    it('should remove node from the beginning of the queue (alias remove)', () => {
      queue = new Queue();
      queue
        .enqueue(1)
        .enqueue(2);

      expect(queue.toString()).toBe('1,2');
      expect(queue.remove()).toBe(1);
      expect(queue.peek()).toBe(2);
    });
  });

  describe('#size', () => {
    it('should return the number of nodes in the queue', () => {
      queue = new Queue();
      expect(queue.size).toBe(0);

      queue.enqueue(1);
      expect(queue.size).toBe(1);

      queue.enqueue(2);
      expect(queue.size).toBe(2);

      queue.clear();
      expect(queue.size).toBe(0);
    });
  });

  describe('#peek', () => {
    it('should return value from the beginning of the queue', () => {
      queue = new Queue();
      queue.enqueue(1);
      expect(queue.peek()).toBe(1);

      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
    });
  });

  describe('#clear', () => {
    it('should all nodes from the queue', () => {
      queue = new Queue(ITERABLE);
      expect(queue.toString()).toBe('1,2,3');

      queue.clear();
      expect(queue.toString()).toBe('');
    });
  });

  describe('#isEmpty', () => {
    it('should check whether queue is empty', () => {
      queue = new Queue();
      expect(queue.isEmpty()).toBeTruthy();

      queue.enqueue(1);
      expect(queue.isEmpty()).toBeFalsy();

      queue.clear();
      expect(queue.isEmpty()).toBeTruthy();
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to queue from array', () => {
      queue = new Queue();
      queue.fromArray(ITERABLE);
      expect(queue.toString()).toBe('1,2,3');
    });
  });

  describe('#toArray', () => {
    it('should add node values from queue to array', () => {
      queue = new Queue();
      queue.fromArray(ITERABLE);
      expect(queue.toArray()).toEqual(ITERABLE);
    });
  });

  describe('#toString', () => {
    it('should stringify queue values', () => {
      queue = new Queue();
      queue.fromArray(ITERABLE);
      expect(queue.toString()).toBe('1,2,3');
    });

    it('should handle a custom nodeStringifier for object values', () => {
      queue = new Queue();

      const nodeValue1 = { name: 'John', age: 20 };
      const nodeValue2 = { name: 'Smith', age: 30 };

      queue
        .enqueue(nodeValue1)
        .enqueue(nodeValue2);

      const nodeStringifier = value => `${value.name}: ${value.age}`;

      expect(queue.toString(nodeStringifier)).toBe('John: 20,Smith: 30');
    });
  });
});

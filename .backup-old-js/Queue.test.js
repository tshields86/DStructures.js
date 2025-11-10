const Queue = require('../Queue');

const ITERABLE = [1, 2, 3];

describe('Queue', () => {
  let queue;

  it('should create empty queue', () => {
    queue = new Queue();
    expect([...queue]).toEqual([]);
  });

  it('should create queue from iterable', () => {
    queue = new Queue(ITERABLE);
    expect([...queue]).toEqual([1, 2, 3]);
  });

  describe('#enqueue', () => {
    it('should add element to the end of the queue', () => {
      queue = new Queue();
      expect(queue.linkedList.head).toBeNull();
      expect(queue.linkedList.tail).toBeNull();

      queue.enqueue(1);
      expect(queue.linkedList.head.value).toBe(1);
      expect(queue.linkedList.tail.value).toBe(1);

      queue
        .enqueue(2)
        .enqueue(3);

      expect([...queue]).toEqual([1, 2, 3]);
    });

    it('should add element to the end of the queue (alias add)', () => {
      queue = new Queue();
      expect(queue.linkedList.head).toBeNull();
      expect(queue.linkedList.tail).toBeNull();

      queue.add(1);
      expect(queue.linkedList.head.value).toBe(1);
      expect(queue.linkedList.tail.value).toBe(1);

      queue
        .add(2)
        .add(3);

      expect([...queue]).toEqual([1, 2, 3]);
    });
  });

  describe('#dequeue', () => {
    it('should remove node from the beginning of the queue', () => {
      queue = new Queue();
      queue
        .enqueue(1)
        .enqueue(2);

      expect([...queue]).toEqual([1, 2]);
      expect(queue.dequeue()).toBe(1);
      expect(queue.peek()).toBe(2);
    });

    it('should remove node from the beginning of the queue (alias remove)', () => {
      queue = new Queue();
      queue
        .enqueue(1)
        .enqueue(2);

      expect([...queue]).toEqual([1, 2]);
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
      expect([...queue]).toEqual([1, 2, 3]);

      queue.clear();
      expect([...queue]).toEqual([]);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether queue is empty', () => {
      queue = new Queue();
      expect(queue.isEmpty()).toBe(true);

      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);

      queue.clear();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to queue from array', () => {
      queue = new Queue();
      queue.fromArray(ITERABLE);
      expect([...queue]).toEqual([1, 2, 3]);
    });
  });

  describe('#toArray', () => {
    it('should add node values from queue to array', () => {
      queue = new Queue();
      queue.fromArray(ITERABLE);
      expect(queue.toArray()).toEqual(ITERABLE);
    });
  });

  describe('#[Symbol.iterator]', () => {
    it('should iterate through queue and yield each node value', () => {
      queue = new Queue(ITERABLE);

      expect([...queue]).toEqual([1, 2, 3]);
    });
  });
});

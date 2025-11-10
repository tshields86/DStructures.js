import { describe, it, expect, beforeEach } from 'vitest';
import { Queue } from './Queue';

const ITERABLE = [1, 2, 3];

describe('Queue', () => {
  let queue: Queue<number>;

  it('should create empty queue', () => {
    queue = new Queue<number>();
    expect([...queue]).toEqual([]);
    expect(queue.size).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });

  it('should create queue from iterable', () => {
    queue = new Queue(ITERABLE);
    expect([...queue]).toEqual([1, 2, 3]);
    expect(queue.size).toBe(3);
  });

  describe('#enqueue', () => {
    beforeEach(() => {
      queue = new Queue<number>();
    });

    it('should add element to the back of the queue', () => {
      queue.enqueue(1);
      expect(queue.size).toBe(1);
      expect(queue.peek()).toBe(1);

      queue.enqueue(2).enqueue(3);
      expect(queue.size).toBe(3);
      expect(queue.peek()).toBe(1); // Front element unchanged
    });

    it('should work with alias add', () => {
      queue.add(1).add(2).add(3);
      expect([...queue]).toEqual([1, 2, 3]);
      expect(queue.size).toBe(3);
    });
  });

  describe('#dequeue', () => {
    beforeEach(() => {
      queue = new Queue(ITERABLE);
    });

    it('should remove and return the front element (FIFO)', () => {
      const value = queue.dequeue();
      expect(value).toBe(1); // First in, first out
      expect(queue.size).toBe(2);
      expect([...queue]).toEqual([2, 3]);

      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.size).toBe(0);
    });

    it('should return null for empty queue', () => {
      queue.clear();
      expect(queue.dequeue()).toBeNull();
    });

    it('should work with alias remove', () => {
      const value = queue.remove();
      expect(value).toBe(1);
      expect(queue.size).toBe(2);
    });
  });

  describe('#peek', () => {
    it('should return front element without removing it', () => {
      queue = new Queue(ITERABLE);
      expect(queue.peek()).toBe(1);
      expect(queue.size).toBe(3); // Size unchanged
      expect(queue.peek()).toBe(1); // Still the same
    });

    it('should return null for empty queue', () => {
      queue = new Queue<number>();
      expect(queue.peek()).toBeNull();
    });
  });

  describe('#size', () => {
    it('should return the number of elements', () => {
      queue = new Queue<number>();
      expect(queue.size).toBe(0);

      queue.enqueue(1);
      expect(queue.size).toBe(1);

      queue.enqueue(2).enqueue(3);
      expect(queue.size).toBe(3);

      queue.dequeue();
      expect(queue.size).toBe(2);
    });
  });

  describe('#clear', () => {
    it('should remove all elements', () => {
      queue = new Queue(ITERABLE);
      expect(queue.size).toBe(3);

      queue.clear();
      expect(queue.size).toBe(0);
      expect(queue.isEmpty()).toBe(true);
      expect(queue.peek()).toBeNull();
    });
  });

  describe('#isEmpty', () => {
    it('should return true for empty queue', () => {
      queue = new Queue<number>();
      expect(queue.isEmpty()).toBe(true);
    });

    it('should return false for non-empty queue', () => {
      queue = new Queue(ITERABLE);
      expect(queue.isEmpty()).toBe(false);
    });

    it('should return true after clearing', () => {
      queue = new Queue(ITERABLE);
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('#fromArray', () => {
    it('should add all elements from array', () => {
      queue = new Queue<number>();
      queue.fromArray([1, 2, 3, 4]);
      expect(queue.size).toBe(4);
      expect(queue.peek()).toBe(1); // First element is at front
    });

    it('should append to existing queue', () => {
      queue = new Queue([1, 2]);
      queue.fromArray([3, 4]);
      expect(queue.size).toBe(4);
      expect([...queue]).toEqual([1, 2, 3, 4]);
    });
  });

  describe('#toArray', () => {
    it('should return array from front to back', () => {
      queue = new Queue(ITERABLE);
      const array = queue.toArray();
      expect(array).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty queue', () => {
      queue = new Queue<number>();
      expect(queue.toArray()).toEqual([]);
    });
  });

  describe('Iterator', () => {
    it('should iterate from front to back', () => {
      queue = new Queue(ITERABLE);
      const values: number[] = [];
      for (const value of queue) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      queue = new Queue(ITERABLE);
      expect([...queue]).toEqual([1, 2, 3]);
    });

    it('should work with Array.from', () => {
      queue = new Queue(ITERABLE);
      expect(Array.from(queue)).toEqual([1, 2, 3]);
    });
  });

  describe('FIFO behavior', () => {
    it('should follow first-in-first-out principle', () => {
      queue = new Queue<string>();
      queue.enqueue('first');
      queue.enqueue('second');
      queue.enqueue('third');

      expect(queue.dequeue()).toBe('first');
      expect(queue.dequeue()).toBe('second');
      expect(queue.dequeue()).toBe('third');
      expect(queue.dequeue()).toBeNull();
    });

    it('should work correctly with mixed operations', () => {
      queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety with strings', () => {
      const stringQueue = new Queue<string>(['a', 'b', 'c']);
      expect(stringQueue.peek()).toBe('a');
      stringQueue.enqueue('d');
      expect(stringQueue.dequeue()).toBe('a');
    });

    it('should maintain type safety with objects', () => {
      interface Customer {
        name: string;
        id: number;
      }
      const customerQueue = new Queue<Customer>([
        { name: 'Alice', id: 1 },
        { name: 'Bob', id: 2 },
      ]);
      expect(customerQueue.size).toBe(2);
      const firstCustomer = customerQueue.peek();
      expect(firstCustomer?.name).toBe('Alice');
    });
  });
});

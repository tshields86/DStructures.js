import { describe, it, expect, beforeEach } from 'vitest';
import { Stack } from './Stack';

const ITERABLE = [1, 2, 3];

describe('Stack', () => {
  let stack: Stack<number>;

  it('should create empty stack', () => {
    stack = new Stack<number>();
    expect([...stack]).toEqual([]);
    expect(stack.size).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });

  it('should create stack from iterable', () => {
    stack = new Stack(ITERABLE);
    // Stack is LIFO, so the last pushed element is on top
    expect([...stack]).toEqual([3, 2, 1]);
    expect(stack.size).toBe(3);
  });

  describe('#push', () => {
    beforeEach(() => {
      stack = new Stack<number>();
    });

    it('should add element to the stack', () => {
      stack.push(1);
      expect(stack.size).toBe(1);
      expect(stack.peek()).toBe(1);

      stack.push(2).push(3);
      expect(stack.size).toBe(3);
      expect(stack.peek()).toBe(3);
    });

    it('should work with alias add', () => {
      stack.add(1).add(2).add(3);
      expect([...stack]).toEqual([3, 2, 1]);
      expect(stack.size).toBe(3);
    });
  });

  describe('#pop', () => {
    beforeEach(() => {
      stack = new Stack(ITERABLE);
    });

    it('should remove and return the top element (LIFO)', () => {
      const value = stack.pop();
      expect(value).toBe(3); // Last pushed is first popped
      expect(stack.size).toBe(2);
      expect([...stack]).toEqual([2, 1]);

      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.size).toBe(0);
    });

    it('should return null for empty stack', () => {
      stack.clear();
      expect(stack.pop()).toBeNull();
    });

    it('should work with alias remove', () => {
      const value = stack.remove();
      expect(value).toBe(3);
      expect(stack.size).toBe(2);
    });
  });

  describe('#peek', () => {
    it('should return top element without removing it', () => {
      stack = new Stack(ITERABLE);
      expect(stack.peek()).toBe(3);
      expect(stack.size).toBe(3); // Size unchanged
      expect(stack.peek()).toBe(3); // Still the same
    });

    it('should return null for empty stack', () => {
      stack = new Stack<number>();
      expect(stack.peek()).toBeNull();
    });
  });

  describe('#size', () => {
    it('should return the number of elements', () => {
      stack = new Stack<number>();
      expect(stack.size).toBe(0);

      stack.push(1);
      expect(stack.size).toBe(1);

      stack.push(2).push(3);
      expect(stack.size).toBe(3);

      stack.pop();
      expect(stack.size).toBe(2);
    });
  });

  describe('#clear', () => {
    it('should remove all elements', () => {
      stack = new Stack(ITERABLE);
      expect(stack.size).toBe(3);

      stack.clear();
      expect(stack.size).toBe(0);
      expect(stack.isEmpty()).toBe(true);
      expect(stack.peek()).toBeNull();
    });
  });

  describe('#isEmpty', () => {
    it('should return true for empty stack', () => {
      stack = new Stack<number>();
      expect(stack.isEmpty()).toBe(true);
    });

    it('should return false for non-empty stack', () => {
      stack = new Stack(ITERABLE);
      expect(stack.isEmpty()).toBe(false);
    });

    it('should return true after clearing', () => {
      stack = new Stack(ITERABLE);
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('#fromArray', () => {
    it('should add all elements from array', () => {
      stack = new Stack<number>();
      stack.fromArray([1, 2, 3, 4]);
      expect(stack.size).toBe(4);
      expect(stack.peek()).toBe(4); // Last element added is on top
    });

    it('should append to existing stack', () => {
      stack = new Stack([1, 2]);
      stack.fromArray([3, 4]);
      expect(stack.size).toBe(4);
      expect(stack.peek()).toBe(4);
    });
  });

  describe('#toArray', () => {
    it('should return array from top to bottom', () => {
      stack = new Stack(ITERABLE);
      const array = stack.toArray();
      expect(array).toEqual([3, 2, 1]); // Top to bottom
    });

    it('should return empty array for empty stack', () => {
      stack = new Stack<number>();
      expect(stack.toArray()).toEqual([]);
    });
  });

  describe('Iterator', () => {
    it('should iterate from top to bottom', () => {
      stack = new Stack(ITERABLE);
      const values: number[] = [];
      for (const value of stack) {
        values.push(value);
      }
      expect(values).toEqual([3, 2, 1]);
    });

    it('should work with spread operator', () => {
      stack = new Stack(ITERABLE);
      expect([...stack]).toEqual([3, 2, 1]);
    });

    it('should work with Array.from', () => {
      stack = new Stack(ITERABLE);
      expect(Array.from(stack)).toEqual([3, 2, 1]);
    });
  });

  describe('LIFO behavior', () => {
    it('should follow last-in-first-out principle', () => {
      stack = new Stack<string>();
      stack.push('first');
      stack.push('second');
      stack.push('third');

      expect(stack.pop()).toBe('third');
      expect(stack.pop()).toBe('second');
      expect(stack.pop()).toBe('first');
      expect(stack.pop()).toBeNull();
    });

    it('should work correctly with mixed operations', () => {
      stack = new Stack<number>();
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety with strings', () => {
      const stringStack = new Stack<string>(['a', 'b', 'c']);
      expect(stringStack.peek()).toBe('c');
      stringStack.push('d');
      expect(stringStack.pop()).toBe('d');
    });

    it('should maintain type safety with objects', () => {
      interface Task {
        name: string;
        priority: number;
      }
      const taskStack = new Stack<Task>([
        { name: 'Task 1', priority: 1 },
        { name: 'Task 2', priority: 2 },
      ]);
      expect(taskStack.size).toBe(2);
      const topTask = taskStack.peek();
      expect(topTask?.name).toBe('Task 2');
    });
  });
});

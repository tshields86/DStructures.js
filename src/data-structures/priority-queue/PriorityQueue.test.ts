import { describe, it, expect, beforeEach } from 'vitest';
import { PriorityQueue } from './PriorityQueue';
import { PriorityQueueNode } from './PriorityQueueNode';

describe('PriorityQueue', () => {
  let pq: PriorityQueue<string>;

  beforeEach(() => {
    pq = new PriorityQueue<string>();
  });

  it('should create empty priority queue', () => {
    expect(pq.size).toBe(0);
    expect(pq.isEmpty()).toBe(true);
  });

  describe('#offer', () => {
    it('should add elements with priority', () => {
      pq.offer('low priority', 5);
      expect(pq.size).toBe(1);
      expect(pq.peek()).toBe('low priority');

      pq.offer('high priority', 1);
      expect(pq.size).toBe(2);
      expect(pq.peek()).toBe('high priority'); // Lower number = higher priority
    });

    it('should maintain priority order', () => {
      pq.offer('priority 5', 5);
      pq.offer('priority 3', 3);
      pq.offer('priority 7', 7);
      pq.offer('priority 1', 1);

      expect(pq.peek()).toBe('priority 1');
    });

    it('should handle equal priorities', () => {
      pq.offer('first', 5);
      pq.offer('second', 5);
      pq.offer('third', 3);

      expect(pq.peek()).toBe('third');
      pq.poll();
      expect(['first', 'second']).toContain(pq.peek());
    });

    it('should work with alias add', () => {
      pq.add('task', 3);
      expect(pq.peek()).toBe('task');
    });
  });

  describe('#poll', () => {
    beforeEach(() => {
      pq.offer('priority 5', 5);
      pq.offer('priority 3', 3);
      pq.offer('priority 7', 7);
      pq.offer('priority 1', 1);
    });

    it('should remove and return highest priority element', () => {
      expect(pq.poll()).toBe('priority 1');
      expect(pq.size).toBe(3);
      expect(pq.peek()).toBe('priority 3');

      expect(pq.poll()).toBe('priority 3');
      expect(pq.size).toBe(2);
      expect(pq.peek()).toBe('priority 5');
    });

    it('should return null for empty queue', () => {
      pq.clear();
      expect(pq.poll()).toBeNull();
    });

    it('should return elements in priority order', () => {
      const values: string[] = [];
      while (!pq.isEmpty()) {
        values.push(pq.poll()!);
      }
      expect(values).toEqual(['priority 1', 'priority 3', 'priority 5', 'priority 7']);
    });

    it('should work with alias remove', () => {
      expect(pq.remove()).toBe('priority 1');
      expect(pq.size).toBe(3);
    });
  });

  describe('#peek', () => {
    it('should return highest priority element without removing', () => {
      pq.offer('low', 5);
      pq.offer('high', 1);

      expect(pq.peek()).toBe('high');
      expect(pq.size).toBe(2); // Size unchanged
      expect(pq.peek()).toBe('high'); // Still the same
    });

    it('should return null for empty queue', () => {
      expect(pq.peek()).toBeNull();
    });
  });

  describe('#changePriority', () => {
    beforeEach(() => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
      pq.offer('task C', 7);
    });

    it('should change priority of an element', () => {
      expect(pq.peek()).toBe('task B'); // Priority 3

      pq.changePriority('task C', 1); // Change from 7 to 1
      expect(pq.peek()).toBe('task C'); // Now highest priority

      pq.poll();
      expect(pq.peek()).toBe('task B');
    });

    it('should handle changing priority to same value', () => {
      pq.changePriority('task B', 3);
      expect(pq.peek()).toBe('task B');
    });

    it('should work with non-existent elements', () => {
      const initialSize = pq.size;
      pq.changePriority('non-existent', 1);
      expect(pq.size).toBe(initialSize + 1);
      expect(pq.peek()).toBe('non-existent');
    });
  });

  describe('#find', () => {
    beforeEach(() => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
      pq.offer('task A', 7); // Duplicate
    });

    it('should find all indices of a value', () => {
      const indices = pq.find('task A');
      expect(indices.length).toBe(2);
    });

    it('should return empty array for non-existent value', () => {
      expect(pq.find('task C')).toEqual([]);
    });
  });

  describe('#has', () => {
    beforeEach(() => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
    });

    it('should return true for existing values', () => {
      expect(pq.has('task A')).toBe(true);
      expect(pq.has('task B')).toBe(true);
    });

    it('should return false for non-existent values', () => {
      expect(pq.has('task C')).toBe(false);
    });
  });

  describe('#removeValue', () => {
    beforeEach(() => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
      pq.offer('task A', 7); // Duplicate
      pq.offer('task C', 1);
    });

    it('should remove all occurrences of a value', () => {
      expect(pq.size).toBe(4);
      pq.removeValue('task A');
      expect(pq.size).toBe(2);
      expect(pq.has('task A')).toBe(false);
    });

    it('should maintain priority queue property after removal', () => {
      pq.removeValue('task B');
      expect(pq.peek()).toBe('task C'); // Priority 1
    });
  });

  describe('#toValueArray', () => {
    it('should return array of all values', () => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
      pq.offer('task C', 7);

      const values = pq.toValueArray();
      expect(values.length).toBe(3);
      expect(values).toContain('task A');
      expect(values).toContain('task B');
      expect(values).toContain('task C');
    });

    it('should return empty array for empty queue', () => {
      expect(pq.toValueArray()).toEqual([]);
    });
  });

  describe('#clear', () => {
    it('should remove all elements', () => {
      pq.offer('task A', 5);
      pq.offer('task B', 3);
      expect(pq.size).toBe(2);

      pq.clear();
      expect(pq.size).toBe(0);
      expect(pq.isEmpty()).toBe(true);
      expect(pq.peek()).toBeNull();
    });
  });

  describe('Custom comparator', () => {
    it('should work with max-priority (higher number = higher priority)', () => {
      const maxPQ = new PriorityQueue<string>((a, b) => b - a);

      maxPQ.offer('priority 5', 5);
      maxPQ.offer('priority 3', 3);
      maxPQ.offer('priority 7', 7);

      expect(maxPQ.peek()).toBe('priority 7');
      expect(maxPQ.poll()).toBe('priority 7');
      expect(maxPQ.poll()).toBe('priority 5');
      expect(maxPQ.poll()).toBe('priority 3');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle task scheduling', () => {
      interface Task {
        name: string;
        description: string;
      }

      const taskQueue = new PriorityQueue<Task>();

      taskQueue.offer({ name: 'Bug fix', description: 'Fix login bug' }, 1);
      taskQueue.offer({ name: 'Feature', description: 'Add search' }, 5);
      taskQueue.offer({ name: 'Critical', description: 'Server down' }, 0);
      taskQueue.offer({ name: 'Enhancement', description: 'UI polish' }, 10);

      expect(taskQueue.poll()?.name).toBe('Critical');
      expect(taskQueue.poll()?.name).toBe('Bug fix');
      expect(taskQueue.poll()?.name).toBe('Feature');
      expect(taskQueue.poll()?.name).toBe('Enhancement');
    });

    it('should handle event scheduling with timestamps', () => {
      const eventQueue = new PriorityQueue<string>();

      eventQueue.offer('Event at 10:00', 1000);
      eventQueue.offer('Event at 09:00', 900);
      eventQueue.offer('Event at 11:30', 1130);
      eventQueue.offer('Event at 09:30', 930);

      const events: string[] = [];
      while (!eventQueue.isEmpty()) {
        events.push(eventQueue.poll()!);
      }

      expect(events).toEqual([
        'Event at 09:00',
        'Event at 09:30',
        'Event at 10:00',
        'Event at 11:30',
      ]);
    });

    it('should handle Dijkstra-style shortest path with distances', () => {
      const nodeQueue = new PriorityQueue<string>();

      nodeQueue.offer('A', 0);
      nodeQueue.offer('B', 5);
      nodeQueue.offer('C', 2);
      nodeQueue.offer('D', 8);

      // Update distance to B
      nodeQueue.changePriority('B', 3);

      expect(nodeQueue.poll()).toBe('A');
      expect(nodeQueue.poll()).toBe('C');
      expect(nodeQueue.poll()).toBe('B');
      expect(nodeQueue.poll()).toBe('D');
    });
  });

  describe('Type safety', () => {
    it('should work with numbers', () => {
      const numQueue = new PriorityQueue<number>();
      numQueue.offer(100, 5);
      numQueue.offer(200, 3);
      numQueue.offer(300, 7);

      expect(numQueue.poll()).toBe(200);
      expect(numQueue.poll()).toBe(100);
      expect(numQueue.poll()).toBe(300);
    });

    it('should work with complex objects', () => {
      interface Customer {
        id: number;
        name: string;
        vip: boolean;
      }

      const customerQueue = new PriorityQueue<Customer>();

      customerQueue.offer(
        { id: 1, name: 'John', vip: false },
        10
      );
      customerQueue.offer(
        { id: 2, name: 'Jane', vip: true },
        1
      );
      customerQueue.offer(
        { id: 3, name: 'Bob', vip: false },
        15
      );

      expect(customerQueue.poll()?.name).toBe('Jane');
      expect(customerQueue.poll()?.name).toBe('John');
      expect(customerQueue.poll()?.name).toBe('Bob');
    });
  });
});

describe('PriorityQueueNode', () => {
  it('should create node with value and priority', () => {
    const node = new PriorityQueueNode('task', 5);
    expect(node.value).toBe('task');
    expect(node.priority).toBe(5);
  });

  it('should work with different types', () => {
    const stringNode = new PriorityQueueNode('hello', 1);
    expect(stringNode.value).toBe('hello');

    const numberNode = new PriorityQueueNode(42, 2);
    expect(numberNode.value).toBe(42);

    const objectNode = new PriorityQueueNode({ id: 1 }, 3);
    expect(objectNode.value).toEqual({ id: 1 });
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { Heap } from './Heap';
import { MinHeap } from './MinHeap';
import { MaxHeap } from './MaxHeap';

describe('Heap (base class)', () => {
  let heap: Heap<number>;

  describe('MinHeap behavior (default)', () => {
    beforeEach(() => {
      heap = new Heap<number>((a, b) => a - b);
    });

    it('should create empty heap', () => {
      expect(heap.size).toBe(0);
      expect(heap.isEmpty()).toBe(true);
    });

    describe('#offer', () => {
      it('should add elements maintaining min-heap property', () => {
        heap.offer(5);
        expect(heap.peek()).toBe(5);
        expect(heap.size).toBe(1);

        heap.offer(3);
        expect(heap.peek()).toBe(3);
        expect(heap.size).toBe(2);

        heap.offer(7);
        expect(heap.peek()).toBe(3);
        expect(heap.size).toBe(3);

        heap.offer(1);
        expect(heap.peek()).toBe(1);
        expect(heap.size).toBe(4);
      });

      it('should handle duplicate values', () => {
        heap.offer(5).offer(5).offer(5);
        expect(heap.size).toBe(3);
        expect(heap.peek()).toBe(5);
      });

      it('should work with alias add', () => {
        heap.add(10);
        expect(heap.peek()).toBe(10);
      });
    });

    describe('#poll', () => {
      beforeEach(() => {
        heap.offer(5).offer(3).offer(7).offer(1).offer(9);
      });

      it('should remove and return minimum element', () => {
        expect(heap.poll()).toBe(1);
        expect(heap.size).toBe(4);
        expect(heap.peek()).toBe(3);

        expect(heap.poll()).toBe(3);
        expect(heap.size).toBe(3);
        expect(heap.peek()).toBe(5);
      });

      it('should return null for empty heap', () => {
        heap.clear();
        expect(heap.poll()).toBeNull();
      });

      it('should maintain heap property after polling', () => {
        const values: number[] = [];
        while (!heap.isEmpty()) {
          values.push(heap.poll()!);
        }
        expect(values).toEqual([1, 3, 5, 7, 9]); // Sorted order
      });

      it('should work with alias remove', () => {
        expect(heap.remove()).toBe(1);
        expect(heap.size).toBe(4);
      });
    });

    describe('#peek', () => {
      it('should return minimum without removing', () => {
        heap.offer(5).offer(3).offer(7);
        expect(heap.peek()).toBe(3);
        expect(heap.size).toBe(3); // Size unchanged
        expect(heap.peek()).toBe(3); // Still the same
      });

      it('should return null for empty heap', () => {
        expect(heap.peek()).toBeNull();
      });
    });

    describe('#find', () => {
      beforeEach(() => {
        heap.offer(5).offer(3).offer(7).offer(3).offer(9);
      });

      it('should find all indices of a value', () => {
        const indices = heap.find(3);
        expect(indices.length).toBe(2);
        indices.forEach((idx) => {
          expect(heap.toArray()[idx]).toBe(3);
        });
      });

      it('should return empty array for non-existent value', () => {
        expect(heap.find(100)).toEqual([]);
      });
    });

    describe('#has', () => {
      beforeEach(() => {
        heap.offer(5).offer(3).offer(7);
      });

      it('should return true for existing values', () => {
        expect(heap.has(5)).toBe(true);
        expect(heap.has(3)).toBe(true);
        expect(heap.has(7)).toBe(true);
      });

      it('should return false for non-existent values', () => {
        expect(heap.has(100)).toBe(false);
        expect(heap.has(0)).toBe(false);
      });
    });

    describe('#removeValue', () => {
      beforeEach(() => {
        heap.offer(5).offer(3).offer(7).offer(1).offer(9);
      });

      it('should remove all occurrences of a value', () => {
        heap.offer(5).offer(5);
        const initialSize = heap.size;
        heap.removeValue(5);
        expect(heap.size).toBe(initialSize - 3);
        expect(heap.has(5)).toBe(false);
      });

      it('should maintain heap property after removal', () => {
        heap.removeValue(3);
        expect(heap.peek()).toBe(1);
        heap.poll();
        expect(heap.peek()).toBe(5);
      });

      it('should handle removing non-existent value', () => {
        const initialSize = heap.size;
        heap.removeValue(100);
        expect(heap.size).toBe(initialSize);
      });
    });

    describe('#isEmpty', () => {
      it('should return true for empty heap', () => {
        expect(heap.isEmpty()).toBe(true);
      });

      it('should return false for non-empty heap', () => {
        heap.offer(5);
        expect(heap.isEmpty()).toBe(false);
      });
    });

    describe('#clear', () => {
      it('should remove all elements', () => {
        heap.offer(5).offer(3).offer(7);
        expect(heap.size).toBe(3);

        heap.clear();
        expect(heap.size).toBe(0);
        expect(heap.isEmpty()).toBe(true);
        expect(heap.peek()).toBeNull();
      });
    });

    describe('#toArray', () => {
      it('should return array of all elements in heap order', () => {
        heap.offer(5).offer(3).offer(7).offer(1).offer(9);
        const array = heap.toArray();
        expect(array.length).toBe(5);
        expect(array).toContain(1);
        expect(array).toContain(3);
        expect(array).toContain(5);
        expect(array).toContain(7);
        expect(array).toContain(9);
      });

      it('should return empty array for empty heap', () => {
        expect(heap.toArray()).toEqual([]);
      });
    });
  });

  describe('MaxHeap behavior', () => {
    beforeEach(() => {
      heap = new Heap<number>((a, b) => b - a);
    });

    it('should maintain max-heap property', () => {
      heap.offer(5).offer(3).offer(7).offer(1).offer(9);
      expect(heap.peek()).toBe(9);

      expect(heap.poll()).toBe(9);
      expect(heap.peek()).toBe(7);

      expect(heap.poll()).toBe(7);
      expect(heap.peek()).toBe(5);
    });

    it('should return elements in descending order', () => {
      heap.offer(5).offer(3).offer(7).offer(1).offer(9);
      const values: number[] = [];
      while (!heap.isEmpty()) {
        values.push(heap.poll()!);
      }
      expect(values).toEqual([9, 7, 5, 3, 1]);
    });
  });

  describe('Custom comparator', () => {
    it('should work with custom objects', () => {
      interface Task {
        name: string;
        priority: number;
      }

      const taskHeap = new Heap<Task>((a, b) => a.priority - b.priority);

      taskHeap.offer({ name: 'Task A', priority: 5 });
      taskHeap.offer({ name: 'Task B', priority: 3 });
      taskHeap.offer({ name: 'Task C', priority: 7 });

      expect(taskHeap.peek()?.priority).toBe(3);
      expect(taskHeap.poll()?.name).toBe('Task B');
      expect(taskHeap.peek()?.priority).toBe(5);
    });
  });
});

describe('MinHeap', () => {
  let minHeap: MinHeap<number>;

  beforeEach(() => {
    minHeap = new MinHeap<number>();
  });

  it('should create min heap', () => {
    expect(minHeap.size).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);
  });

  it('should maintain min-heap property', () => {
    minHeap.offer(5).offer(3).offer(7).offer(1).offer(9);
    expect(minHeap.peek()).toBe(1);
  });

  it('should return elements in ascending order', () => {
    minHeap.offer(5).offer(3).offer(7).offer(1).offer(9);
    const values: number[] = [];
    while (!minHeap.isEmpty()) {
      values.push(minHeap.poll()!);
    }
    expect(values).toEqual([1, 3, 5, 7, 9]);
  });

  it('should handle mixed operations', () => {
    minHeap.offer(5);
    minHeap.offer(3);
    expect(minHeap.poll()).toBe(3);
    minHeap.offer(1);
    minHeap.offer(7);
    expect(minHeap.poll()).toBe(1);
    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(7);
    expect(minHeap.isEmpty()).toBe(true);
  });

  it('should maintain heap property with duplicates', () => {
    minHeap.offer(5).offer(5).offer(3).offer(3).offer(7);
    expect(minHeap.poll()).toBe(3);
    expect(minHeap.poll()).toBe(3);
    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(7);
  });
});

describe('MaxHeap', () => {
  let maxHeap: MaxHeap<number>;

  beforeEach(() => {
    maxHeap = new MaxHeap<number>();
  });

  it('should create max heap', () => {
    expect(maxHeap.size).toBe(0);
    expect(maxHeap.isEmpty()).toBe(true);
  });

  it('should maintain max-heap property', () => {
    maxHeap.offer(5).offer(3).offer(7).offer(1).offer(9);
    expect(maxHeap.peek()).toBe(9);
  });

  it('should return elements in descending order', () => {
    maxHeap.offer(5).offer(3).offer(7).offer(1).offer(9);
    const values: number[] = [];
    while (!maxHeap.isEmpty()) {
      values.push(maxHeap.poll()!);
    }
    expect(values).toEqual([9, 7, 5, 3, 1]);
  });

  it('should handle mixed operations', () => {
    maxHeap.offer(5);
    maxHeap.offer(3);
    expect(maxHeap.poll()).toBe(5);
    maxHeap.offer(9);
    maxHeap.offer(7);
    expect(maxHeap.poll()).toBe(9);
    expect(maxHeap.poll()).toBe(7);
    expect(maxHeap.poll()).toBe(3);
    expect(maxHeap.isEmpty()).toBe(true);
  });

  it('should maintain heap property with duplicates', () => {
    maxHeap.offer(5).offer(5).offer(3).offer(3).offer(7);
    expect(maxHeap.poll()).toBe(7);
    expect(maxHeap.poll()).toBe(5);
    expect(maxHeap.poll()).toBe(5);
    expect(maxHeap.poll()).toBe(3);
    expect(maxHeap.poll()).toBe(3);
  });
});

describe('Heap property verification', () => {
  it('MinHeap should satisfy min-heap property', () => {
    const minHeap = new MinHeap<number>();
    minHeap.offer(10).offer(20).offer(15).offer(30).offer(40);

    const array = minHeap.toArray();
    // Check parent <= children for all nodes
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < array.length) {
        expect(array[i]).toBeLessThanOrEqual(array[leftChild]!);
      }
      if (rightChild < array.length) {
        expect(array[i]).toBeLessThanOrEqual(array[rightChild]!);
      }
    }
  });

  it('MaxHeap should satisfy max-heap property', () => {
    const maxHeap = new MaxHeap<number>();
    maxHeap.offer(10).offer(20).offer(15).offer(30).offer(40);

    const array = maxHeap.toArray();
    // Check parent >= children for all nodes
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < array.length) {
        expect(array[i]).toBeGreaterThanOrEqual(array[leftChild]!);
      }
      if (rightChild < array.length) {
        expect(array[i]).toBeGreaterThanOrEqual(array[rightChild]!);
      }
    }
  });
});

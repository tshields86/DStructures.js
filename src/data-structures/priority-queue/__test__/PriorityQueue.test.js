const PriorityQueue = require('../PriorityQueue');

describe('PriorityQueue', () => {
  let priorityQueue;

  describe('Min-PriorityQueue', () => {
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
    });

    it('should create an empty priority queue', () => {
      expect(priorityQueue.size).toBe(0);
    });

    describe('#offer', () => {
      it('should offer an element to the priority queue', () => {
        expect(priorityQueue.offer('foo', 1)).toBe(priorityQueue);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
        expect(priorityQueue.size).toBe(1);
      });

      it('should keep the priority queue in order', () => {
        priorityQueue.offer('bar', 2);
        expect(priorityQueue.container[0]).toEqual({ value: 'bar', priority: 2 });
        priorityQueue.offer('foo', 1);
        expect(priorityQueue.container[0]).toEqual({ value: 'foo', priority: 1 });
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.container[0]).toEqual({ value: 'baz', priority: 0 });
        expect(priorityQueue.size).toEqual(3);
      });

      it('should offer an element to the priority queue (alias add)', () => {
        expect(priorityQueue.add('foo', 1)).toBe(priorityQueue);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
        expect(priorityQueue.size).toBe(1);
      });

      it('should keep the priority queue in order (alias add)', () => {
        priorityQueue.add('bar', 2);
        expect(priorityQueue.container[0]).toEqual({ value: 'bar', priority: 2 });
        priorityQueue.add('foo', 1);
        expect(priorityQueue.container[0]).toEqual({ value: 'foo', priority: 1 });
        priorityQueue.add('baz', 0);
        expect(priorityQueue.container[0]).toEqual({ value: 'baz', priority: 0 });
        expect(priorityQueue.size).toEqual(3);
      });
    });

    describe('#poll', () => {
      it('should poll an element from the priority queue', () => {
        priorityQueue.offer('foo', 1);
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.poll()).toBe('baz');
        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
      });

      it('should return null if the priority queue is empty', () => {
        expect(priorityQueue.poll()).toBe(null);
      });

      it('should poll an element from the priority queue (alias remove)', () => {
        priorityQueue.add('foo', 1);
        priorityQueue.add('baz', 0);
        expect(priorityQueue.remove()).toBe('baz');
        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
      });

      it('should return null if the priority queue is empty (alias remove)', () => {
        expect(priorityQueue.remove()).toBe(null);
      });
    });

    describe('#peek', () => {
      it('should peek an element from the priority queue', () => {
        priorityQueue.offer('bar', 2);
        expect(priorityQueue.peek()).toBe('bar');
        priorityQueue.offer('foo', 1);
        expect(priorityQueue.peek()).toBe('foo');
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.peek()).toBe('baz');
      });

      it('should return null if the priority queue is empty', () => {
        expect(priorityQueue.peek()).toBe(null);
      });
    });

    describe('#changePriority', () => {
      it('should change the priority of an element in the priority queue', () => {
        priorityQueue
          .offer('bar', 2)
          .offer('foo', 1)
          .offer('baz', 0);
        expect(priorityQueue.peek()).toBe('baz');
        priorityQueue.changePriority('baz', 3);
        expect(priorityQueue.peek()).toBe('foo');
        priorityQueue.changePriority('foo', 4);
        expect(priorityQueue.peek()).toBe('bar');
        priorityQueue.changePriority('baz', 0);
        expect(priorityQueue.peek()).toBe('baz');
      });
    });

    describe('#size', () => {
      it('should return the number of elements in the priority queue', () => {
        expect(priorityQueue.size).toBe(0);

        priorityQueue.offer('foo', 1);
        expect(priorityQueue.size).toBe(1);

        priorityQueue.offer('bar', 2);
        expect(priorityQueue.size).toBe(2);

        priorityQueue.clear();
        expect(priorityQueue.size).toBe(0);
      });
    });

    describe('#clear', () => {
      it('should all elements from the priority queue', () => {
        priorityQueue
          .offer('foo', 1)
          .offer('bar', 2)
          .offer('qux', 3);

        expect(priorityQueue.size).toBe(3);

        priorityQueue.clear();
        expect(priorityQueue.size).toBe(0);
      });
    });

    describe('#isEmpty', () => {
      it('should check whether priority queue is empty', () => {
        expect(priorityQueue.isEmpty()).toBeTruthy();

        priorityQueue.offer('foo', 1);
        expect(priorityQueue.isEmpty()).toBeFalsy();

        priorityQueue.clear();
        expect(priorityQueue.isEmpty()).toBeTruthy();
      });
    });
  });

  describe('Max-PriorityQueue', () => {
    beforeEach(() => {
      priorityQueue = new PriorityQueue((a, b) => b - a);
    });

    it('should create an empty priority queue', () => {
      expect(priorityQueue.size).toBe(0);
    });

    describe('#offer', () => {
      it('should offer an element to the priority queue', () => {
        expect(priorityQueue.offer('foo', 1)).toBe(priorityQueue);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
        expect(priorityQueue.size).toBe(1);
      });

      it('should keep the priority queue in order', () => {
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.container[0]).toEqual({ value: 'baz', priority: 0 });
        priorityQueue.offer('foo', 1);
        expect(priorityQueue.container[0]).toEqual({ value: 'foo', priority: 1 });
        priorityQueue.offer('bar', 2);
        expect(priorityQueue.container[0]).toEqual({ value: 'bar', priority: 2 });
        expect(priorityQueue.size).toEqual(3);
      });

      it('should offer an element to the priority queue (alias add)', () => {
        expect(priorityQueue.add('foo', 1)).toBe(priorityQueue);
        expect(priorityQueue.container).toEqual([{ value: 'foo', priority: 1 }]);
        expect(priorityQueue.size).toBe(1);
      });

      it('should keep the priority queue in order (alias add)', () => {
        priorityQueue.add('baz', 0);
        expect(priorityQueue.container[0]).toEqual({ value: 'baz', priority: 0 });
        priorityQueue.add('foo', 1);
        expect(priorityQueue.container[0]).toEqual({ value: 'foo', priority: 1 });
        priorityQueue.add('bar', 2);
        expect(priorityQueue.container[0]).toEqual({ value: 'bar', priority: 2 });
        expect(priorityQueue.size).toEqual(3);
      });
    });

    describe('#poll', () => {
      it('should poll an element from the priority queue', () => {
        priorityQueue.add('foo', 1);
        priorityQueue.add('baz', 0);
        expect(priorityQueue.poll()).toBe('foo');
        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.container).toEqual([{ value: 'baz', priority: 0 }]);
      });

      it('should return null if the priority queue is empty', () => {
        expect(priorityQueue.poll()).toBe(null);
      });

      it('should poll an element from the priority queue (alias remove)', () => {
        priorityQueue.offer('foo', 1);
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.remove()).toBe('foo');
        expect(priorityQueue.size).toBe(1);
        expect(priorityQueue.container).toEqual([{ value: 'baz', priority: 0 }]);
      });

      it('should return null if the priority queue is empty (alias remove)', () => {
        expect(priorityQueue.remove()).toBe(null);
      });
    });

    describe('#peek', () => {
      it('should peek an element from the priority queue', () => {
        priorityQueue.offer('baz', 0);
        expect(priorityQueue.peek()).toBe('baz');
        priorityQueue.offer('foo', 1);
        expect(priorityQueue.peek()).toBe('foo');
        priorityQueue.offer('bar', 2);
        expect(priorityQueue.peek()).toBe('bar');
      });

      it('should return null if the priority queue is empty', () => {
        expect(priorityQueue.peek()).toBe(null);
      });
    });

    describe('#changePriority', () => {
      it('should change the priority of an element in the priority queue', () => {
        priorityQueue
          .offer('baz', 0)
          .offer('foo', 1)
          .offer('bar', 2);
        expect(priorityQueue.peek()).toBe('bar');
        priorityQueue.changePriority('baz', 3);
        expect(priorityQueue.peek()).toBe('baz');
        priorityQueue.changePriority('foo', 4);
        expect(priorityQueue.peek()).toBe('foo');
        priorityQueue.changePriority('foo', 1);
        expect(priorityQueue.peek()).toBe('baz');
      });
    });

    describe('#size', () => {
      it('should return the number of elements in the priority queue', () => {
        expect(priorityQueue.size).toBe(0);

        priorityQueue.offer('foo', 1);
        expect(priorityQueue.size).toBe(1);

        priorityQueue.offer('bar', 2);
        expect(priorityQueue.size).toBe(2);

        priorityQueue.clear();
        expect(priorityQueue.size).toBe(0);
      });
    });

    describe('#clear', () => {
      it('should all elements from the priority queue', () => {
        priorityQueue
          .offer('foo', 1)
          .offer('bar', 2)
          .offer('qux', 3);

        expect(priorityQueue.size).toBe(3);

        priorityQueue.clear();
        expect(priorityQueue.size).toBe(0);
      });
    });

    describe('#isEmpty', () => {
      it('should check whether priority queue is empty', () => {
        expect(priorityQueue.isEmpty()).toBeTruthy();

        priorityQueue.offer('foo', 1);
        expect(priorityQueue.isEmpty()).toBeFalsy();

        priorityQueue.clear();
        expect(priorityQueue.isEmpty()).toBeTruthy();
      });
    });
  });
});

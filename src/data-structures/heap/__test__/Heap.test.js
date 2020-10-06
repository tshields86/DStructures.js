const Heap = require('../Heap');

describe('Heap', () => {
  let heap;

  describe('Min-Heap', () => {
    beforeEach(() => {
      heap = new Heap();
    });

    it('should create an empty heap', () => {
      expect(heap.size).toBe(0);
    });

    describe('#offer', () => {
      it('should offer an element to the heap', () => {
        expect(heap.offer(1)).toBe(heap);
        expect(heap.container).toEqual([1]);
        expect(heap.size).toBe(1);
      });

      it('should keep the heap in order', () => {
        heap.offer(2);
        expect(heap.container[0]).toEqual(2);
        heap.offer(1);
        expect(heap.container[0]).toEqual(1);
        heap.offer(0);
        expect(heap.container[0]).toEqual(0);
        expect(heap.size).toEqual(3);
      });

      it('should offer an element to the heap (alias add)', () => {
        expect(heap.add(1)).toBe(heap);
        expect(heap.container).toEqual([1]);
        expect(heap.size).toBe(1);
      });

      it('should keep the heap in order (alias add)', () => {
        heap.add(2);
        expect(heap.container[0]).toEqual(2);
        heap.add(1);
        expect(heap.container[0]).toEqual(1);
        heap.add(0);
        expect(heap.container[0]).toEqual(0);
        expect(heap.size).toEqual(3);
      });
    });

    describe('#poll', () => {
      it('should poll an element from the heap', () => {
        heap.add(1);
        heap.add(0);
        expect(heap.poll()).toBe(0);
        expect(heap.size).toBe(1);
        expect(heap.container).toEqual([1]);
      });

      it('should return null if the heap is empty', () => {
        expect(heap.poll()).toBe(null);
      });

      it('should poll an element from the heap (alias remove)', () => {
        heap.add(1);
        heap.add(0);
        expect(heap.remove()).toBe(0);
        expect(heap.size).toBe(1);
        expect(heap.container).toEqual([1]);
      });

      it('should return null if the heap is empty (alias remove)', () => {
        expect(heap.remove()).toBe(null);
      });
    });

    describe('#peek', () => {
      it('should peek an element from the heap', () => {
        heap.offer(2);
        expect(heap.peek()).toBe(2);
        heap.offer(1);
        expect(heap.peek()).toBe(1);
        heap.offer(0);
        expect(heap.peek()).toBe(0);
      });

      it('should return null if the heap is empty', () => {
        expect(heap.peek()).toBe(null);
      });
    });

    describe('#removeValue', () => {
      it('should remove an element from the heap', () => {
        heap
          .offer(3)
          .offer(12)
          .offer(10)
          .offer(11)
          .offer(11);

        expect(heap.container).toEqual([3, 11, 10, 12, 11]);
        expect(heap.removeValue(3).container).toEqual([10, 11, 11, 12]);
        expect(heap.peek()).toEqual(10);
        expect(heap.size).toBe(4);
        expect(heap.removeValue(11).container).toEqual([10, 12]);
        expect(heap.peek()).toEqual(10);
        expect(heap.size).toBe(2);
      });
    });

    describe('#find', () => {
      it('should all indices of an element in the heap', () => {
        heap
          .offer(3)
          .offer(12)
          .offer(10)
          .offer(11)
          .offer(11);

        expect(heap.container).toEqual([3, 11, 10, 12, 11]);
        expect(heap.find(3)).toEqual([0]);
        expect(heap.find(11)).toEqual([1, 4]);
        expect(heap.find(5)).toEqual([]);
      });
    });

    describe('#has', () => {
      it('should all indices of an element in the heap', () => {
        heap
          .offer(1)
          .offer(2);

        expect(heap.has(1)).toBeTruthy();
        expect(heap.has(3)).toBeFalsy();
      });
    });

    describe('#size', () => {
      it('should return the number of elements in the heap', () => {
        expect(heap.size).toBe(0);

        heap.offer(1);
        expect(heap.size).toBe(1);

        heap.offer(2);
        expect(heap.size).toBe(2);

        heap.clear();
        expect(heap.size).toBe(0);
      });
    });

    describe('#clear', () => {
      it('should all elements from the heap', () => {
        heap
          .offer(1)
          .offer(2)
          .offer(3);

        expect(heap.size).toBe(3);

        heap.clear();
        expect(heap.size).toBe(0);
      });
    });

    describe('#isEmpty', () => {
      it('should check whether heap is empty', () => {
        expect(heap.isEmpty()).toBeTruthy();

        heap.offer(1);
        expect(heap.isEmpty()).toBeFalsy();

        heap.clear();
        expect(heap.isEmpty()).toBeTruthy();
      });
    });
  });

  describe('Max-Heap', () => {
    beforeEach(() => {
      heap = new Heap((a, b) => b - a);
    });

    it('should create an empty heap', () => {
      expect(heap.size).toBe(0);
    });

    describe('#offer', () => {
      it('should offer an element to the heap', () => {
        expect(heap.offer(1)).toBe(heap);
        expect(heap.container).toEqual([1]);
        expect(heap.size).toBe(1);
      });

      it('should keep the heap in order', () => {
        heap.offer(0);
        expect(heap.container[0]).toEqual(0);
        heap.offer(1);
        expect(heap.container[0]).toEqual(1);
        heap.offer(2);
        expect(heap.container[0]).toEqual(2);
        expect(heap.size).toEqual(3);
      });

      it('should offer an element to the heap (alias add)', () => {
        expect(heap.add(1)).toBe(heap);
        expect(heap.container).toEqual([1]);
        expect(heap.size).toBe(1);
      });

      it('should keep the heap in order (alias add)', () => {
        heap.add(0);
        expect(heap.container[0]).toEqual(0);
        heap.add(1);
        expect(heap.container[0]).toEqual(1);
        heap.add(2);
        expect(heap.container[0]).toEqual(2);
        expect(heap.size).toEqual(3);
      });
    });

    describe('#poll', () => {
      it('should poll an element from the heap', () => {
        heap.add(1);
        heap.add(0);
        expect(heap.poll()).toBe(1);
        expect(heap.size).toBe(1);
        expect(heap.container).toEqual([0]);
      });

      it('should return null if the heap is empty', () => {
        expect(heap.poll()).toBe(null);
      });

      it('should poll an element from the heap (alias remove)', () => {
        heap.add(1);
        heap.add(0);
        expect(heap.remove()).toBe(1);
        expect(heap.size).toBe(1);
        expect(heap.container).toEqual([0]);
      });

      it('should return null if the heap is empty (alias remove)', () => {
        expect(heap.remove()).toBe(null);
      });
    });

    describe('#peek', () => {
      it('should peek an element from the heap', () => {
        heap.offer(0);
        expect(heap.peek()).toBe(0);
        heap.offer(1);
        expect(heap.peek()).toBe(1);
        heap.offer(2);
        expect(heap.peek()).toBe(2);
      });

      it('should return null if the heap is empty', () => {
        expect(heap.peek()).toBe(null);
      });
    });

    describe('#removeValue', () => {
      it('should remove an element from the heap', () => {
        heap
          .offer(3)
          .offer(12)
          .offer(10)
          .offer(11)
          .offer(11);

        expect(heap.container).toEqual([12, 11, 10, 3, 11]);
        expect(heap.removeValue(12).container).toEqual([11, 11, 10, 3]);
        expect(heap.peek()).toEqual(11);
        expect(heap.size).toBe(4);
        expect(heap.removeValue(11).container).toEqual([10, 3]);
        expect(heap.peek()).toEqual(10);
        expect(heap.size).toBe(2);
      });
    });

    describe('#find', () => {
      it('should all indices of an element in the heap', () => {
        heap
          .offer(3)
          .offer(12)
          .offer(10)
          .offer(11)
          .offer(11);

        expect(heap.container).toEqual([12, 11, 10, 3, 11]);
        expect(heap.find(3)).toEqual([3]);
        expect(heap.find(11)).toEqual([1, 4]);
        expect(heap.find(5)).toEqual([]);
      });
    });

    describe('#has', () => {
      it('should all indices of an element in the heap', () => {
        heap
          .offer(1)
          .offer(2);

        expect(heap.has(1)).toBeTruthy();
        expect(heap.has(3)).toBeFalsy();
      });
    });

    describe('#size', () => {
      it('should return the number of elements in the heap', () => {
        expect(heap.size).toBe(0);

        heap.offer(1);
        expect(heap.size).toBe(1);

        heap.offer(2);
        expect(heap.size).toBe(2);

        heap.clear();
        expect(heap.size).toBe(0);
      });
    });

    describe('#clear', () => {
      it('should all elements from the heap', () => {
        heap
          .offer(1)
          .offer(2)
          .offer(3);

        expect(heap.size).toBe(3);

        heap.clear();
        expect(heap.size).toBe(0);
      });
    });

    describe('#isEmpty', () => {
      it('should check whether heap is empty', () => {
        expect(heap.isEmpty()).toBeTruthy();

        heap.offer(1);
        expect(heap.isEmpty()).toBeFalsy();

        heap.clear();
        expect(heap.isEmpty()).toBeTruthy();
      });
    });
  });
});

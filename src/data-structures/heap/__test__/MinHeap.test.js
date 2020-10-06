const MinHeap = require('../MinHeap');

describe('MinHeap', () => {
  let minHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  it('should create an empty heap', () => {
    expect(minHeap.size).toBe(0);
  });

  describe('#offer', () => {
    it('should offer an element to the heap', () => {
      expect(minHeap.offer(1)).toBe(minHeap);
      expect(minHeap.container).toEqual([1]);
      expect(minHeap.size).toBe(1);
    });

    it('should keep the heap in order', () => {
      minHeap.offer(2);
      expect(minHeap.container[0]).toEqual(2);
      minHeap.offer(1);
      expect(minHeap.container[0]).toEqual(1);
      minHeap.offer(0);
      expect(minHeap.container[0]).toEqual(0);
      expect(minHeap.size).toEqual(3);
    });

    it('should offer an element to the heap (alias add)', () => {
      expect(minHeap.add(1)).toBe(minHeap);
      expect(minHeap.container).toEqual([1]);
      expect(minHeap.size).toBe(1);
    });

    it('should keep the heap in order (alias add)', () => {
      minHeap.add(2);
      expect(minHeap.container[0]).toEqual(2);
      minHeap.add(1);
      expect(minHeap.container[0]).toEqual(1);
      minHeap.add(0);
      expect(minHeap.container[0]).toEqual(0);
      expect(minHeap.size).toEqual(3);
    });
  });

  describe('#poll', () => {
    it('should poll an element from the heap', () => {
      minHeap.add(1);
      minHeap.add(0);
      expect(minHeap.poll()).toBe(0);
      expect(minHeap.size).toBe(1);
      expect(minHeap.container).toEqual([1]);
    });

    it('should return null if the heap is empty', () => {
      expect(minHeap.poll()).toBe(null);
    });

    it('should poll an element from the heap (alias remove)', () => {
      minHeap.add(1);
      minHeap.add(0);
      expect(minHeap.remove()).toBe(0);
      expect(minHeap.size).toBe(1);
      expect(minHeap.container).toEqual([1]);
    });

    it('should return null if the heap is empty (alias remove)', () => {
      expect(minHeap.remove()).toBe(null);
    });
  });

  describe('#peek', () => {
    it('should peek an element from the heap', () => {
      minHeap.offer(2);
      expect(minHeap.peek()).toBe(2);
      minHeap.offer(1);
      expect(minHeap.peek()).toBe(1);
      minHeap.offer(0);
      expect(minHeap.peek()).toBe(0);
    });

    it('should return null if the heap is empty', () => {
      expect(minHeap.peek()).toBe(null);
    });
  });

  describe('#removeValue', () => {
    it('should remove an element from the heap', () => {
      minHeap
        .offer(3)
        .offer(12)
        .offer(10)
        .offer(11)
        .offer(11);

      expect(minHeap.container).toEqual([3, 11, 10, 12, 11]);
      expect(minHeap.removeValue(3).container).toEqual([10, 11, 11, 12]);
      expect(minHeap.peek()).toEqual(10);
      expect(minHeap.size).toBe(4);
      expect(minHeap.removeValue(11).container).toEqual([10, 12]);
      expect(minHeap.peek()).toEqual(10);
      expect(minHeap.size).toBe(2);
    });
  });

  describe('#find', () => {
    it('should all indices of an element in the heap', () => {
      minHeap
        .offer(3)
        .offer(12)
        .offer(10)
        .offer(11)
        .offer(11);

      expect(minHeap.container).toEqual([3, 11, 10, 12, 11]);
      expect(minHeap.find(3)).toEqual([0]);
      expect(minHeap.find(11)).toEqual([1, 4]);
      expect(minHeap.find(5)).toEqual([]);
    });
  });

  describe('#has', () => {
    it('should all indices of an element in the heap', () => {
      minHeap
        .offer(1)
        .offer(2);

      expect(minHeap.has(1)).toBeTruthy();
      expect(minHeap.has(3)).toBeFalsy();
    });
  });

  describe('#size', () => {
    it('should return the number of elements in the heap', () => {
      expect(minHeap.size).toBe(0);

      minHeap.offer(1);
      expect(minHeap.size).toBe(1);

      minHeap.offer(2);
      expect(minHeap.size).toBe(2);

      minHeap.clear();
      expect(minHeap.size).toBe(0);
    });
  });

  describe('#clear', () => {
    it('should all elements from the heap', () => {
      minHeap
        .offer(1)
        .offer(2)
        .offer(3);

      expect(minHeap.size).toBe(3);

      minHeap.clear();
      expect(minHeap.size).toBe(0);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether heap is empty', () => {
      expect(minHeap.isEmpty()).toBeTruthy();

      minHeap.offer(1);
      expect(minHeap.isEmpty()).toBeFalsy();

      minHeap.clear();
      expect(minHeap.isEmpty()).toBeTruthy();
    });
  });
});

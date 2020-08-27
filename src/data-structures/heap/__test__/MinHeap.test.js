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

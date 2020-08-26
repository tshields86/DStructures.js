const MaxHeap = require('../MaxHeap');

describe('MaxHeap', () => {
  let maxHeap;

  beforeEach(() => {
    maxHeap = new MaxHeap();
  });

  it('should create an empty heap', () => {
    expect(maxHeap.size).toBe(0);
  });

  describe('#offer', () => {
    it('should offer an element to the heap', () => {
      expect(maxHeap.offer(1)).toBe(maxHeap);
      expect(maxHeap.container).toEqual([1]);
      expect(maxHeap.size).toBe(1);
    });

    it('should keep the heap in order', () => {
      maxHeap.offer(0);
      expect(maxHeap.container[0]).toEqual(0);
      maxHeap.offer(1);
      expect(maxHeap.container[0]).toEqual(1);
      maxHeap.offer(2);
      expect(maxHeap.container[0]).toEqual(2);
      expect(maxHeap.size).toEqual(3);
    });

    it('should offer an element to the heap (alias add)', () => {
      expect(maxHeap.add(1)).toBe(maxHeap);
      expect(maxHeap.container).toEqual([1]);
      expect(maxHeap.size).toBe(1);
    });

    it('should keep the heap in order (alias add)', () => {
      maxHeap.add(0);
      expect(maxHeap.container[0]).toEqual(0);
      maxHeap.add(1);
      expect(maxHeap.container[0]).toEqual(1);
      maxHeap.add(2);
      expect(maxHeap.container[0]).toEqual(2);
      expect(maxHeap.size).toEqual(3);
    });
  });

  describe('#poll', () => {
    it('should poll an element from the heap', () => {
      maxHeap.add(1);
      maxHeap.add(0);
      expect(maxHeap.poll()).toBe(1);
      expect(maxHeap.size).toBe(1);
      expect(maxHeap.container).toEqual([0]);
    });

    it('should return null if the heap is empty', () => {
      expect(maxHeap.poll()).toBe(null);
    });

    it('should poll an element from the heap (alias remove)', () => {
      maxHeap.add(1);
      maxHeap.add(0);
      expect(maxHeap.remove()).toBe(1);
      expect(maxHeap.size).toBe(1);
      expect(maxHeap.container).toEqual([0]);
    });

    it('should return null if the heap is empty (alias remove)', () => {
      expect(maxHeap.remove()).toBe(null);
    });
  });

  describe('#peek', () => {
    it('should peek an element from the heap', () => {
      maxHeap.add(0);
      expect(maxHeap.peek()).toBe(0);
      maxHeap.add(1);
      expect(maxHeap.peek()).toBe(1);
      maxHeap.add(2);
      expect(maxHeap.peek()).toBe(2);
    });

    it('should return null if the heap is empty', () => {
      expect(maxHeap.peek()).toBe(null);
    });
  });

  describe('#size', () => {
    it('should return the number of elements in the heap', () => {
      expect(maxHeap.size).toBe(0);

      maxHeap.offer(1);
      expect(maxHeap.size).toBe(1);

      maxHeap.offer(2);
      expect(maxHeap.size).toBe(2);

      maxHeap.clear();
      expect(maxHeap.size).toBe(0);
    });
  });

  describe('#clear', () => {
    it('should all elements from the heap', () => {
      maxHeap
        .offer(1)
        .offer(2)
        .offer(3);

      expect(maxHeap.size).toBe(3);

      maxHeap.clear();
      expect(maxHeap.size).toBe(0);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether heap is empty', () => {
      expect(maxHeap.isEmpty()).toBeTruthy();

      maxHeap.offer(1);
      expect(maxHeap.isEmpty()).toBeFalsy();

      maxHeap.clear();
      expect(maxHeap.isEmpty()).toBeTruthy();
    });
  });
});

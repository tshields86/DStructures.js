const GraphVertex = require('../GraphVertex');

describe('GraphVertex', () => {
  let vertex1;

  it('should create a graph vertex', () => {
    vertex1 = new GraphVertex('foo');
    expect(vertex1.value).toBe('foo');
  });

  let vertex2;
  let vertex3;

  beforeEach(() => {
    vertex1 = new GraphVertex('foo');
    vertex2 = new GraphVertex('bar');
    vertex3 = new GraphVertex('baz');
  });

  describe('#addAdjacent', () => {
    it('should add vertex to the adjacents without weight', () => {
      expect(vertex1.adjacents.size).toBe(0);
      vertex1.addAdjacent(vertex2);
      expect(vertex1.adjacents.size).toBe(1);
      expect(vertex1.isAdjacent(vertex2)).toBe(true);
      expect(vertex1.getAdjacentWeight(vertex2)).toEqual(0);
    });

    it('should add vertex to the adjacents with weight', () => {
      expect(vertex1.adjacents.size).toBe(0);
      vertex1.addAdjacent(vertex2, 5);
      expect(vertex1.adjacents.size).toBe(1);
      expect(vertex1.isAdjacent(vertex2)).toBe(true);
      expect(vertex1.getAdjacentWeight(vertex2)).toEqual(5);
    });
  });

  describe('#removeAdjacent', () => {
    it('should remove vertex from the adjacents', () => {
      vertex1.addAdjacent(vertex2);
      expect(vertex1.adjacents.size).toBe(1);
      vertex1.removeAdjacent(vertex2);
      expect(vertex1.adjacents.size).toBe(0);
    });
  });

  describe('#isAdjacent', () => {
    it('should return true if they are adjacent', () => {
      vertex1.addAdjacent(vertex2);
      expect(vertex1.isAdjacent(vertex2)).toBe(true);
    });

    it('should return false if they are not adjacent', () => {
      vertex1.addAdjacent(vertex2);
      expect(vertex1.isAdjacent(vertex3)).toBe(false);
    });
  });

  describe('#getAdjacents', () => {
    it('should return array of vertices in the adjacents', () => {
      vertex1.addAdjacent(vertex2);
      vertex1.addAdjacent(vertex3);
      expect(vertex1.getAdjacents()).toEqual([vertex2, vertex3]);
    });
  });

  describe('#getAdjacentWeight', () => {
    it('should return 0 if weight was not set', () => {
      vertex1.addAdjacent(vertex2);
      expect(vertex1.getAdjacentWeight(vertex2)).toEqual(0);
    });

    it('should return weight if weight was set', () => {
      vertex1.addAdjacent(vertex2, 5);
      expect(vertex1.getAdjacentWeight(vertex2)).toEqual(5);
    });

    it('should return undefined if not adjacent', () => {
      vertex1.addAdjacent(vertex2);
      expect(vertex1.getAdjacentWeight(vertex3)).toBeUndefined();
    });
  });
});

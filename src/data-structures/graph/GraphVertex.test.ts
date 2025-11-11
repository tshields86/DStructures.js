import { describe, it, expect, beforeEach } from 'vitest';
import { GraphVertex } from './GraphVertex';

describe('GraphVertex', () => {
  let vertex: GraphVertex<string>;

  beforeEach(() => {
    vertex = new GraphVertex('A');
  });

  it('should create vertex with value', () => {
    expect(vertex.value).toBe('A');
    expect(vertex.degree).toBe(0);
  });

  describe('#addAdjacent', () => {
    it('should add adjacent vertex', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex);

      expect(vertex.degree).toBe(1);
      expect(vertex.isAdjacent(adjacentVertex)).toBe(true);
    });

    it('should add adjacent vertex with weight', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex, 5);

      expect(vertex.getAdjacentWeight(adjacentVertex)).toBe(5);
    });

    it('should support method chaining', () => {
      const b = new GraphVertex('B');
      const c = new GraphVertex('C');

      vertex.addAdjacent(b).addAdjacent(c, 10);

      expect(vertex.degree).toBe(2);
      expect(vertex.isAdjacent(b)).toBe(true);
      expect(vertex.isAdjacent(c)).toBe(true);
      expect(vertex.getAdjacentWeight(c)).toBe(10);
    });

    it('should update weight if vertex is already adjacent', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex, 5);
      vertex.addAdjacent(adjacentVertex, 10);

      expect(vertex.degree).toBe(1);
      expect(vertex.getAdjacentWeight(adjacentVertex)).toBe(10);
    });
  });

  describe('#removeAdjacent', () => {
    it('should remove adjacent vertex', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex);

      expect(vertex.removeAdjacent(adjacentVertex)).toBe(true);
      expect(vertex.degree).toBe(0);
      expect(vertex.isAdjacent(adjacentVertex)).toBe(false);
    });

    it('should return false if vertex is not adjacent', () => {
      const adjacentVertex = new GraphVertex('B');

      expect(vertex.removeAdjacent(adjacentVertex)).toBe(false);
    });
  });

  describe('#isAdjacent', () => {
    it('should return true for adjacent vertices', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex);

      expect(vertex.isAdjacent(adjacentVertex)).toBe(true);
    });

    it('should return false for non-adjacent vertices', () => {
      const adjacentVertex = new GraphVertex('B');

      expect(vertex.isAdjacent(adjacentVertex)).toBe(false);
    });
  });

  describe('#getAdjacents', () => {
    it('should return all adjacent vertices', () => {
      const b = new GraphVertex('B');
      const c = new GraphVertex('C');
      const d = new GraphVertex('D');

      vertex.addAdjacent(b).addAdjacent(c).addAdjacent(d);

      const adjacents = vertex.getAdjacents();
      expect(adjacents.length).toBe(3);
      expect(adjacents).toContain(b);
      expect(adjacents).toContain(c);
      expect(adjacents).toContain(d);
    });

    it('should return empty array if no adjacents', () => {
      expect(vertex.getAdjacents()).toEqual([]);
    });
  });

  describe('#getAdjacentWeight', () => {
    it('should return weight of adjacent vertex', () => {
      const adjacentVertex = new GraphVertex('B');
      vertex.addAdjacent(adjacentVertex, 7);

      expect(vertex.getAdjacentWeight(adjacentVertex)).toBe(7);
    });

    it('should return undefined for non-adjacent vertex', () => {
      const adjacentVertex = new GraphVertex('B');

      expect(vertex.getAdjacentWeight(adjacentVertex)).toBeUndefined();
    });
  });

  describe('#getKey', () => {
    it('should return vertex value', () => {
      expect(vertex.getKey()).toBe('A');
    });
  });

  describe('#degree', () => {
    it('should return number of adjacent vertices', () => {
      expect(vertex.degree).toBe(0);

      vertex.addAdjacent(new GraphVertex('B'));
      expect(vertex.degree).toBe(1);

      vertex.addAdjacent(new GraphVertex('C'));
      expect(vertex.degree).toBe(2);

      vertex.addAdjacent(new GraphVertex('D'));
      expect(vertex.degree).toBe(3);
    });
  });

  describe('Type safety', () => {
    it('should work with number values', () => {
      const numVertex = new GraphVertex(1);
      const adjacent = new GraphVertex(2);

      numVertex.addAdjacent(adjacent, 10);

      expect(numVertex.value).toBe(1);
      expect(adjacent.value).toBe(2);
      expect(numVertex.getAdjacentWeight(adjacent)).toBe(10);
    });

    it('should work with complex objects', () => {
      interface City {
        name: string;
        population: number;
      }

      const cityA: City = { name: 'New York', population: 8000000 };
      const cityB: City = { name: 'Los Angeles', population: 4000000 };

      const vertexA = new GraphVertex(cityA);
      const vertexB = new GraphVertex(cityB);

      vertexA.addAdjacent(vertexB, 2800);

      expect(vertexA.value.name).toBe('New York');
      expect(vertexB.value.name).toBe('Los Angeles');
      expect(vertexA.getAdjacentWeight(vertexB)).toBe(2800);
    });
  });
});

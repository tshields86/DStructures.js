import { describe, it, expect, beforeEach } from 'vitest';
import { dijkstra, getShortestPath, getShortestDistance } from './dijkstra';
import { Graph, EdgeDirection } from '../../data-structures/graph/Graph';

describe('dijkstra', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>(EdgeDirection.DIRECTED);
  });

  it('should find shortest paths in simple graph', () => {
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 8);
    graph.addEdge('C', 'E', 10);
    graph.addEdge('D', 'E', 2);

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('A')!)).toBe(0);
    expect(getShortestDistance(result, graph.getVertex('B')!)).toBe(4);
    expect(getShortestDistance(result, graph.getVertex('C')!)).toBe(2);
    expect(getShortestDistance(result, graph.getVertex('D')!)).toBe(9);
    expect(getShortestDistance(result, graph.getVertex('E')!)).toBe(11);
  });

  it('should reconstruct shortest path', () => {
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 8);

    const result = dijkstra(graph, 'A');
    const path = getShortestPath(result, graph.getVertex('D')!);

    expect(path.map((v) => v.value)).toEqual(['A', 'B', 'D']);
  });

  it('should handle unreachable vertices', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('C', 'D', 1);

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('C')!)).toBe(Infinity);
    expect(getShortestDistance(result, graph.getVertex('D')!)).toBe(Infinity);

    const pathToC = getShortestPath(result, graph.getVertex('C')!);
    expect(pathToC).toEqual([]);
  });

  it('should handle single vertex', () => {
    graph.addVertex('A');

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('A')!)).toBe(0);

    const path = getShortestPath(result, graph.getVertex('A')!);
    expect(path.map((v) => v.value)).toEqual(['A']);
  });

  it('should handle graph with cycles', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', 2);
    graph.addEdge('C', 'A', 3);

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('A')!)).toBe(0);
    expect(getShortestDistance(result, graph.getVertex('B')!)).toBe(1);
    expect(getShortestDistance(result, graph.getVertex('C')!)).toBe(3);
  });

  it('should throw error for non-existent start vertex', () => {
    graph.addVertex('A');

    expect(() => dijkstra(graph, 'Z')).toThrow('Start vertex Z not found');
  });

  it('should handle zero-weight edges', () => {
    graph.addEdge('A', 'B', 0);
    graph.addEdge('B', 'C', 0);
    graph.addEdge('C', 'D', 0);

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('D')!)).toBe(0);
  });

  it('should find shortest path with multiple routes', () => {
    graph.addEdge('A', 'B', 5);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('C', 'B', 1);

    const result = dijkstra(graph, 'A');

    expect(getShortestDistance(result, graph.getVertex('B')!)).toBe(3);

    const path = getShortestPath(result, graph.getVertex('B')!);
    expect(path.map((v) => v.value)).toEqual(['A', 'C', 'B']);
  });

  describe('Real-world scenarios', () => {
    it('should find shortest route in road network', () => {
      // City road network with distances
      graph.addEdge('NYC', 'PHI', 95);
      graph.addEdge('NYC', 'BOS', 215);
      graph.addEdge('PHI', 'DC', 140);
      graph.addEdge('DC', 'ATL', 640);
      graph.addEdge('BOS', 'NYC', 215);
      graph.addEdge('BOS', 'PHI', 300);
      graph.addEdge('ATL', 'MIA', 660);

      const result = dijkstra(graph, 'NYC');

      expect(getShortestDistance(result, graph.getVertex('MIA')!)).toBe(1535);

      const path = getShortestPath(result, graph.getVertex('MIA')!);
      expect(path.map((v) => v.value)).toEqual(['NYC', 'PHI', 'DC', 'ATL', 'MIA']);
    });

    it('should find shortest path in weighted graph', () => {
      // Network latency (in ms)
      graph.addEdge('Server1', 'Server2', 10);
      graph.addEdge('Server1', 'Server3', 50);
      graph.addEdge('Server2', 'Server3', 20);
      graph.addEdge('Server2', 'Server4', 15);
      graph.addEdge('Server3', 'Server4', 5);

      const result = dijkstra(graph, 'Server1');

      expect(getShortestDistance(result, graph.getVertex('Server4')!)).toBe(25);

      const path = getShortestPath(result, graph.getVertex('Server4')!);
      expect(path.map((v) => v.value)).toEqual(['Server1', 'Server2', 'Server4']);
    });

    it('should handle complex graph with many vertices', () => {
      // Create a more complex graph
      graph.addEdge('A', 'B', 7);
      graph.addEdge('A', 'C', 9);
      graph.addEdge('A', 'F', 14);
      graph.addEdge('B', 'C', 10);
      graph.addEdge('B', 'D', 15);
      graph.addEdge('C', 'D', 11);
      graph.addEdge('C', 'F', 2);
      graph.addEdge('D', 'E', 6);
      graph.addEdge('E', 'F', 9);

      const result = dijkstra(graph, 'A');

      expect(getShortestDistance(result, graph.getVertex('E')!)).toBe(26);

      const path = getShortestPath(result, graph.getVertex('E')!);
      expect(path[0]!.value).toBe('A');
      expect(path[path.length - 1]!.value).toBe('E');
    });
  });

  describe('Edge cases', () => {
    it('should handle graph with self-loop', () => {
      graph.addEdge('A', 'A', 5);
      graph.addEdge('A', 'B', 10);

      const result = dijkstra(graph, 'A');

      expect(getShortestDistance(result, graph.getVertex('A')!)).toBe(0);
      expect(getShortestDistance(result, graph.getVertex('B')!)).toBe(10);
    });

    it('should handle two vertices with direct edge', () => {
      graph.addEdge('A', 'B', 5);

      const result = dijkstra(graph, 'A');

      expect(getShortestDistance(result, graph.getVertex('B')!)).toBe(5);

      const path = getShortestPath(result, graph.getVertex('B')!);
      expect(path.map((v) => v.value)).toEqual(['A', 'B']);
    });

    it('should handle undirected graph', () => {
      const undirectedGraph = new Graph<string>(EdgeDirection.UNDIRECTED);
      undirectedGraph.addEdge('A', 'B', 1);
      undirectedGraph.addEdge('B', 'C', 2);
      undirectedGraph.addEdge('C', 'D', 3);

      const result = dijkstra(undirectedGraph, 'A');

      expect(getShortestDistance(result, undirectedGraph.getVertex('D')!)).toBe(6);

      const path = getShortestPath(result, undirectedGraph.getVertex('D')!);
      expect(path.map((v) => v.value)).toEqual(['A', 'B', 'C', 'D']);
    });
  });
});

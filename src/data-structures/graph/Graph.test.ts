import { describe, it, expect, beforeEach } from 'vitest';
import { Graph, EdgeDirection } from './Graph';
import { GraphVertex } from './GraphVertex';

describe('Graph', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
  });

  it('should create empty graph', () => {
    expect(graph.size).toBe(0);
    expect(graph.getEdgeDirection()).toBe(EdgeDirection.UNDIRECTED);
  });

  it('should create directed graph', () => {
    const directedGraph = new Graph<string>(EdgeDirection.DIRECTED);
    expect(directedGraph.getEdgeDirection()).toBe(EdgeDirection.DIRECTED);
  });

  describe('#addVertex', () => {
    it('should add vertex', () => {
      const vertex = graph.addVertex('A');

      expect(graph.size).toBe(1);
      expect(vertex.value).toBe('A');
    });

    it('should return existing vertex if already exists', () => {
      const vertex1 = graph.addVertex('A');
      const vertex2 = graph.addVertex('A');

      expect(graph.size).toBe(1);
      expect(vertex1).toBe(vertex2);
    });

    it('should add multiple vertices', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      expect(graph.size).toBe(3);
    });
  });

  describe('#removeVertex', () => {
    beforeEach(() => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
    });

    it('should remove vertex', () => {
      expect(graph.removeVertex('B')).toBe(true);
      expect(graph.size).toBe(2);
      expect(graph.getVertex('B')).toBeUndefined();
    });

    it('should remove edges pointing to removed vertex', () => {
      graph.removeVertex('B');

      const vertexA = graph.getVertex('A');
      const vertexC = graph.getVertex('C');

      expect(vertexA?.degree).toBe(0);
      expect(vertexC?.degree).toBe(0);
    });

    it('should return false if vertex does not exist', () => {
      expect(graph.removeVertex('Z')).toBe(false);
    });
  });

  describe('#addEdge', () => {
    it('should add edge between vertices', () => {
      const [sourceVertex, destVertex] = graph.addEdge('A', 'B');

      expect(sourceVertex.value).toBe('A');
      expect(destVertex.value).toBe('B');
      expect(sourceVertex.isAdjacent(destVertex)).toBe(true);
    });

    it('should add edge with weight', () => {
      const [sourceVertex, destVertex] = graph.addEdge('A', 'B', 5);

      expect(sourceVertex.getAdjacentWeight(destVertex)).toBe(5);
    });

    it('should create vertices if they do not exist', () => {
      expect(graph.size).toBe(0);

      graph.addEdge('A', 'B');

      expect(graph.size).toBe(2);
    });

    it('should create bidirectional edges for undirected graph', () => {
      const [sourceVertex, destVertex] = graph.addEdge('A', 'B');

      expect(sourceVertex.isAdjacent(destVertex)).toBe(true);
      expect(destVertex.isAdjacent(sourceVertex)).toBe(true);
    });

    it('should create unidirectional edges for directed graph', () => {
      const directedGraph = new Graph<string>(EdgeDirection.DIRECTED);
      const [sourceVertex, destVertex] = directedGraph.addEdge('A', 'B');

      expect(sourceVertex.isAdjacent(destVertex)).toBe(true);
      expect(destVertex.isAdjacent(sourceVertex)).toBe(false);
    });
  });

  describe('#removeEdge', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
    });

    it('should remove edge between vertices', () => {
      const [sourceVertex, destVertex] = graph.removeEdge('A', 'B');

      expect(sourceVertex?.isAdjacent(destVertex!)).toBe(false);
    });

    it('should remove bidirectional edges for undirected graph', () => {
      const [sourceVertex, destVertex] = graph.removeEdge('A', 'B');

      expect(sourceVertex?.isAdjacent(destVertex!)).toBe(false);
      expect(destVertex?.isAdjacent(sourceVertex!)).toBe(false);
    });

    it('should remove unidirectional edges for directed graph', () => {
      const directedGraph = new Graph<string>(EdgeDirection.DIRECTED);
      directedGraph.addEdge('A', 'B');

      const [sourceVertex, destVertex] = directedGraph.removeEdge('A', 'B');

      expect(sourceVertex?.isAdjacent(destVertex!)).toBe(false);
      expect(destVertex?.isAdjacent(sourceVertex!)).toBe(false);
    });

    it('should return undefined vertices if edge does not exist', () => {
      const [sourceVertex, destVertex] = graph.removeEdge('X', 'Y');

      expect(sourceVertex).toBeUndefined();
      expect(destVertex).toBeUndefined();
    });
  });

  describe('#getAllVertices', () => {
    it('should return all vertices', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      const vertices = graph.getAllVertices();

      expect(vertices.length).toBe(3);
      expect(vertices.map((v) => v.value).sort()).toEqual(['A', 'B', 'C']);
    });

    it('should return empty array for empty graph', () => {
      expect(graph.getAllVertices()).toEqual([]);
    });
  });

  describe('#getVertex', () => {
    it('should return vertex by value', () => {
      graph.addVertex('A');

      const vertex = graph.getVertex('A');

      expect(vertex?.value).toBe('A');
    });

    it('should return undefined if vertex does not exist', () => {
      expect(graph.getVertex('Z')).toBeUndefined();
    });
  });

  describe('#areAdjacent', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
    });

    it('should return true for adjacent vertices', () => {
      expect(graph.areAdjacent('A', 'B')).toBe(true);
      expect(graph.areAdjacent('B', 'A')).toBe(true);
    });

    it('should return false for non-adjacent vertices', () => {
      graph.addVertex('C');

      expect(graph.areAdjacent('A', 'C')).toBe(false);
    });

    it('should return false if vertices do not exist', () => {
      expect(graph.areAdjacent('X', 'Y')).toBe(false);
    });
  });

  describe('Graph.dfs', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'E');
    });

    it('should traverse graph in depth-first order', () => {
      const startVertex = graph.getVertex('A')!;
      const vertices = Array.from(Graph.dfs(startVertex));
      const values = vertices.map((v) => v.value);

      expect(values[0]).toBe('A');
      expect(values.length).toBe(5);
      expect(values).toContain('B');
      expect(values).toContain('C');
      expect(values).toContain('D');
      expect(values).toContain('E');
    });

    it('should not revisit vertices', () => {
      const startVertex = graph.getVertex('A')!;
      const vertices = Array.from(Graph.dfs(startVertex));

      expect(vertices.length).toBe(5);
      const uniqueValues = new Set(vertices.map((v) => v.value));
      expect(uniqueValues.size).toBe(5);
    });
  });

  describe('Graph.bfs', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'E');
    });

    it('should traverse graph in breadth-first order', () => {
      const startVertex = graph.getVertex('A')!;
      const vertices = Array.from(Graph.bfs(startVertex));
      const values = vertices.map((v) => v.value);

      expect(values[0]).toBe('A');
      expect(values.length).toBe(5);
      expect(values).toContain('B');
      expect(values).toContain('C');
      expect(values).toContain('D');
      expect(values).toContain('E');
    });

    it('should visit vertices level by level', () => {
      const startVertex = graph.getVertex('A')!;
      const vertices = Array.from(Graph.bfs(startVertex));
      const values = vertices.map((v) => v.value);

      expect(values[0]).toBe('A');
      // B and C should be visited before D and E
      const indexB = values.indexOf('B');
      const indexC = values.indexOf('C');
      const indexD = values.indexOf('D');
      const indexE = values.indexOf('E');

      expect(indexB).toBeLessThan(indexD);
      expect(indexC).toBeLessThan(indexE);
    });
  });

  describe('#areConnected', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addVertex('D');
    });

    it('should return true for connected vertices', () => {
      expect(graph.areConnected('A', 'C')).toBe(true);
      expect(graph.areConnected('C', 'A')).toBe(true);
    });

    it('should return false for disconnected vertices', () => {
      expect(graph.areConnected('A', 'D')).toBe(false);
    });

    it('should return false if vertices do not exist', () => {
      expect(graph.areConnected('X', 'Y')).toBe(false);
    });

    it('should return true for same vertex', () => {
      expect(graph.areConnected('A', 'A')).toBe(true);
    });
  });

  describe('#findPath', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('C', 'D');
      graph.addEdge('A', 'E');
    });

    it('should find path between connected vertices', () => {
      const path = graph.findPath('A', 'D');

      expect(path.length).toBeGreaterThan(0);
      expect(path[0]!.value).toBe('A');
      expect(path[path.length - 1]!.value).toBe('D');
    });

    it('should return empty array for disconnected vertices', () => {
      graph.addVertex('Z');
      const path = graph.findPath('A', 'Z');

      expect(path).toEqual([]);
    });

    it('should return single vertex path for same source and destination', () => {
      const path = graph.findPath('A', 'A');

      expect(path.length).toBe(1);
      expect(path[0]!.value).toBe('A');
    });

    it('should return empty array if vertices do not exist', () => {
      const path = graph.findPath('X', 'Y');

      expect(path).toEqual([]);
    });
  });

  describe('#findAllPaths', () => {
    beforeEach(() => {
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'D');
    });

    it('should find all paths between vertices', () => {
      const paths = graph.findAllPaths('A', 'D');

      expect(paths.length).toBeGreaterThanOrEqual(2);
      paths.forEach((path) => {
        expect(path[0]!.value).toBe('A');
        expect(path[path.length - 1]!.value).toBe('D');
      });
    });

    it('should return empty array for disconnected vertices', () => {
      graph.addVertex('Z');
      const paths = graph.findAllPaths('A', 'Z');

      expect(paths).toEqual([]);
    });

    it('should return single path for same source and destination', () => {
      const paths = graph.findAllPaths('A', 'A');

      expect(paths.length).toBe(1);
      expect(paths[0]!.length).toBe(1);
      expect(paths[0]![0]!.value).toBe('A');
    });
  });

  describe('Type safety', () => {
    it('should work with number vertices', () => {
      const numGraph = new Graph<number>();

      numGraph.addEdge(1, 2, 10);
      numGraph.addEdge(2, 3, 5);

      expect(numGraph.size).toBe(3);
      expect(numGraph.areAdjacent(1, 2)).toBe(true);
    });

    it('should work with complex objects', () => {
      interface City {
        id: number;
        name: string;
      }

      const cityGraph = new Graph<City>();
      const nyc: City = { id: 1, name: 'New York' };
      const la: City = { id: 2, name: 'Los Angeles' };

      cityGraph.addEdge(nyc, la, 2800);

      expect(cityGraph.size).toBe(2);
      expect(cityGraph.areAdjacent(nyc, la)).toBe(true);
    });
  });

  describe('Real-world scenarios', () => {
    it('should model social network connections', () => {
      const socialNetwork = new Graph<string>();

      socialNetwork.addEdge('Alice', 'Bob');
      socialNetwork.addEdge('Alice', 'Charlie');
      socialNetwork.addEdge('Bob', 'David');
      socialNetwork.addEdge('Charlie', 'David');

      // Check if Alice and David are connected
      expect(socialNetwork.areConnected('Alice', 'David')).toBe(true);

      // Find mutual friends (paths between two people)
      const paths = socialNetwork.findAllPaths('Alice', 'David');
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('should model flight routes', () => {
      const flightNetwork = new Graph<string>(EdgeDirection.DIRECTED);

      flightNetwork.addEdge('NYC', 'LAX', 300);
      flightNetwork.addEdge('LAX', 'SFO', 50);
      flightNetwork.addEdge('NYC', 'CHI', 150);
      flightNetwork.addEdge('CHI', 'SFO', 200);

      // Find route from NYC to SFO
      const route = flightNetwork.findPath('NYC', 'SFO');
      expect(route.length).toBeGreaterThan(0);
      expect(route[0]!.value).toBe('NYC');
      expect(route[route.length - 1]!.value).toBe('SFO');
    });

    it('should model road network with distances', () => {
      const roadNetwork = new Graph<string>();

      roadNetwork.addEdge('A', 'B', 5);
      roadNetwork.addEdge('B', 'C', 3);
      roadNetwork.addEdge('C', 'D', 2);
      roadNetwork.addEdge('A', 'D', 15);

      // Check if there's a path from A to D
      expect(roadNetwork.areConnected('A', 'D')).toBe(true);

      // Get all possible routes
      const routes = roadNetwork.findAllPaths('A', 'D');
      expect(routes.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle cyclic graphs', () => {
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('C', 'A');

      // DFS should not get stuck in infinite loop
      const startVertex = graph.getVertex('A')!;
      const vertices = Array.from(Graph.dfs(startVertex));

      expect(vertices.length).toBe(3);
    });
  });

  describe('Edge cases', () => {
    it('should handle single vertex graph', () => {
      graph.addVertex('A');

      expect(graph.size).toBe(1);
      expect(graph.getAllVertices().length).toBe(1);
    });

    it('should handle self-loop', () => {
      graph.addEdge('A', 'A', 10);

      const vertexA = graph.getVertex('A')!;
      expect(vertexA.isAdjacent(vertexA)).toBe(true);
      expect(vertexA.getAdjacentWeight(vertexA)).toBe(10);
    });

    it('should handle parallel edges (overwrite)', () => {
      graph.addEdge('A', 'B', 5);
      graph.addEdge('A', 'B', 10);

      const vertexA = graph.getVertex('A')!;
      const vertexB = graph.getVertex('B')!;

      expect(vertexA.getAdjacentWeight(vertexB)).toBe(10);
    });
  });
});

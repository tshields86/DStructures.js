import { GraphVertex } from './GraphVertex';
import { HashMap } from '../map/HashMap';
import { HashSet } from '../set/HashSet';
import { Stack } from '../stack/Stack';
import { Queue } from '../queue/Queue';

/**
 * Edge direction types for the graph
 */
export enum EdgeDirection {
  DIRECTED = 'directed',
  UNDIRECTED = 'undirected',
}

/**
 * Graph - A graph data structure supporting both directed and undirected graphs.
 * Supports weighted edges and provides DFS/BFS traversal algorithms.
 *
 * @template T - The type of values stored in vertices
 * @category Data Structures
 */
export class Graph<T> {
  private vertices: HashMap<T, GraphVertex<T>>;
  private edgeDirection: EdgeDirection;

  /**
   * Creates a new Graph
   *
   * @param edgeDirection - Whether edges are directed or undirected (default: undirected)
   * @example
   * ```typescript
   * const graph = new Graph<string>(EdgeDirection.UNDIRECTED);
   * graph.addEdge('A', 'B', 5);
   * graph.addEdge('B', 'C', 3);
   * ```
   */
  constructor(edgeDirection: EdgeDirection = EdgeDirection.UNDIRECTED) {
    this.vertices = new HashMap<T, GraphVertex<T>>();
    this.edgeDirection = edgeDirection;
  }

  /**
   * Adds a vertex to the graph.
   * If the vertex already exists, returns the existing vertex.
   * Time complexity: O(1) average
   *
   * @param value - The value for the vertex
   * @returns The vertex (new or existing)
   */
  addVertex(value: T): GraphVertex<T> {
    if (this.vertices.has(value)) {
      return this.vertices.get(value)!;
    }
    const vertex = new GraphVertex(value);
    this.vertices.set(value, vertex);
    return vertex;
  }

  /**
   * Removes a vertex from the graph.
   * Also removes all edges pointing to this vertex.
   * Time complexity: O(V) where V is the number of vertices
   *
   * @param value - The value of the vertex to remove
   * @returns True if the vertex was removed, false if not found
   */
  removeVertex(value: T): boolean {
    const current = this.vertices.get(value);
    if (current) {
      for (const vertex of this.vertices.values()) {
        vertex.removeAdjacent(current);
      }
    }
    return this.vertices.delete(value);
  }

  /**
   * Adds an edge between two vertices.
   * Creates vertices if they don't exist.
   * For undirected graphs, creates edges in both directions.
   * Time complexity: O(1) average
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @param weight - The weight of the edge (default: 0)
   * @returns Array containing [sourceVertex, destinationVertex]
   */
  addEdge(
    source: T,
    destination: T,
    weight: number = 0
  ): [GraphVertex<T>, GraphVertex<T>] {
    const sourceVertex = this.addVertex(source);
    const destinationVertex = this.addVertex(destination);

    sourceVertex.addAdjacent(destinationVertex, weight);

    if (this.edgeDirection === EdgeDirection.UNDIRECTED) {
      destinationVertex.addAdjacent(sourceVertex, weight);
    }

    return [sourceVertex, destinationVertex];
  }

  /**
   * Removes an edge between two vertices.
   * For undirected graphs, removes edges in both directions.
   * Time complexity: O(1) average
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @returns Array containing [sourceVertex, destinationVertex] or [undefined, undefined] if not found
   */
  removeEdge(
    source: T,
    destination: T
  ): [GraphVertex<T> | undefined, GraphVertex<T> | undefined] {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);

    if (sourceVertex && destinationVertex) {
      sourceVertex.removeAdjacent(destinationVertex);

      if (this.edgeDirection === EdgeDirection.UNDIRECTED) {
        destinationVertex.removeAdjacent(sourceVertex);
      }
    }

    return [sourceVertex, destinationVertex];
  }

  /**
   * Gets all vertices in the graph.
   * Time complexity: O(V) where V is the number of vertices
   *
   * @returns Array of all vertices
   */
  getAllVertices(): GraphVertex<T>[] {
    return Array.from(this.vertices.values());
  }

  /**
   * Gets a vertex by its value.
   * Time complexity: O(1) average
   *
   * @param value - The value of the vertex
   * @returns The vertex, or undefined if not found
   */
  getVertex(value: T): GraphVertex<T> | undefined {
    return this.vertices.get(value);
  }

  /**
   * Checks if two vertices are adjacent (have an edge between them).
   * Time complexity: O(1) average
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @returns True if vertices are adjacent
   */
  areAdjacent(source: T, destination: T): boolean {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);

    if (sourceVertex && destinationVertex) {
      return sourceVertex.isAdjacent(destinationVertex);
    }

    return false;
  }

  /**
   * Depth-first search traversal starting from a vertex.
   * Uses a stack to explore vertices.
   * Time complexity: O(V + E) where V is vertices and E is edges
   *
   * @param startVertex - The vertex to start from
   * @yields Vertices in DFS order
   */
  static *dfs<T>(startVertex: GraphVertex<T>): Generator<GraphVertex<T>, void, unknown> {
    yield* Graph.search(startVertex, Stack);
  }

  /**
   * Breadth-first search traversal starting from a vertex.
   * Uses a queue to explore vertices.
   * Time complexity: O(V + E) where V is vertices and E is edges
   *
   * @param startVertex - The vertex to start from
   * @yields Vertices in BFS order
   */
  static *bfs<T>(startVertex: GraphVertex<T>): Generator<GraphVertex<T>, void, unknown> {
    yield* Graph.search(startVertex, Queue);
  }

  /**
   * Generic search algorithm that can perform DFS or BFS.
   * Time complexity: O(V + E) where V is vertices and E is edges
   *
   * @param startVertex - The vertex to start from
   * @param DataStructure - Stack for DFS or Queue for BFS
   * @yields Vertices in search order
   */
  static *search<T>(
    startVertex: GraphVertex<T>,
    DataStructure: typeof Stack | typeof Queue = Stack
  ): Generator<GraphVertex<T>, void, unknown> {
    const exploredVertices = new HashSet<GraphVertex<T>>();
    const verticesToExplore = new DataStructure<GraphVertex<T>>();

    verticesToExplore.add(startVertex);

    while (!verticesToExplore.isEmpty()) {
      const vertex = verticesToExplore.remove();
      if (vertex && !exploredVertices.has(vertex)) {
        yield vertex;
        exploredVertices.add(vertex);
        vertex.getAdjacents().forEach((adjacentVertex) => {
          verticesToExplore.add(adjacentVertex);
        });
      }
    }
  }

  /**
   * Checks if two vertices are connected (path exists between them).
   * Time complexity: O(V + E) where V is vertices and E is edges
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @returns True if vertices are connected
   */
  areConnected(source: T, destination: T): boolean {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);

    if (sourceVertex && destinationVertex) {
      const bfsFromSource = Graph.bfs(sourceVertex);

      for (const vertex of bfsFromSource) {
        if (vertex === destinationVertex) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Finds a path between two vertices using DFS.
   * Time complexity: O(V + E) where V is vertices and E is edges
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @param path - Internal parameter for recursion
   * @returns Array of vertices representing the path, or empty array if no path exists
   */
  findPath(
    source: T,
    destination: T,
    path: HashMap<GraphVertex<T>, boolean> = new HashMap()
  ): GraphVertex<T>[] {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);
    if (!sourceVertex || !destinationVertex) return [];

    const newPath = new HashMap(path);
    newPath.set(sourceVertex, true);

    if (source === destination) {
      return Array.from(newPath.keys());
    }

    for (const adjacentVertex of sourceVertex.getAdjacents()) {
      if (!newPath.has(adjacentVertex)) {
        const nextPath = this.findPath(
          adjacentVertex.getKey(),
          destination,
          newPath
        );
        if (nextPath.length) return nextPath;
      }
    }

    return [];
  }

  /**
   * Finds all paths between two vertices using DFS.
   * Time complexity: O(V! * E) in worst case (exponential)
   *
   * @param source - The source vertex value
   * @param destination - The destination vertex value
   * @param path - Internal parameter for recursion
   * @returns Array of paths, where each path is an array of vertices
   */
  findAllPaths(
    source: T,
    destination: T,
    path: HashMap<GraphVertex<T>, boolean> = new HashMap()
  ): GraphVertex<T>[][] {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);
    if (!sourceVertex || !destinationVertex) return [];

    const newPath = new HashMap(path);
    newPath.set(sourceVertex, true);

    if (source === destination) {
      return [Array.from(newPath.keys())];
    }

    const paths: GraphVertex<T>[][] = [];
    sourceVertex.getAdjacents().forEach((adjacentVertex) => {
      if (!newPath.has(adjacentVertex)) {
        const nextPaths = this.findAllPaths(
          adjacentVertex.getKey(),
          destination,
          newPath
        );
        nextPaths.forEach((nextPath) => paths.push(nextPath));
      }
    });

    return paths;
  }

  /**
   * Gets the number of vertices in the graph.
   * Time complexity: O(1)
   *
   * @returns The number of vertices
   */
  get size(): number {
    return this.vertices.size;
  }

  /**
   * Gets the edge direction of the graph.
   * Time complexity: O(1)
   *
   * @returns The edge direction
   */
  getEdgeDirection(): EdgeDirection {
    return this.edgeDirection;
  }
}

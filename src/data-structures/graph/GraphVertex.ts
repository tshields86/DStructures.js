import { HashMap } from '../map/HashMap';

/**
 * GraphVertex - Represents a vertex in a graph with value and adjacency list.
 * Uses HashMap to store adjacent vertices and their edge weights.
 *
 * @template T - The type of value stored in the vertex
 * @category Data Structures
 */
export class GraphVertex<T> {
  /**
   * The value stored in this vertex
   */
  public value: T;

  /**
   * Map of adjacent vertices to their edge weights
   */
  private adjacents: HashMap<GraphVertex<T>, number>;

  /**
   * Creates a new GraphVertex
   *
   * @param value - The value to store in this vertex
   * @example
   * ```typescript
   * const vertex = new GraphVertex('A');
   * const adjacentVertex = new GraphVertex('B');
   * vertex.addAdjacent(adjacentVertex, 5);
   * ```
   */
  constructor(value: T) {
    this.value = value;
    this.adjacents = new HashMap<GraphVertex<T>, number>();
  }

  /**
   * Adds an adjacent vertex with optional weight.
   * Time complexity: O(1) average
   *
   * @param vertex - The vertex to add as adjacent
   * @param weight - The weight of the edge (default: 0)
   * @returns The vertex instance for chaining
   */
  addAdjacent(vertex: GraphVertex<T>, weight: number = 0): this {
    this.adjacents.set(vertex, weight);
    return this;
  }

  /**
   * Removes an adjacent vertex.
   * Time complexity: O(1) average
   *
   * @param vertex - The vertex to remove
   * @returns True if the vertex was removed, false if not found
   */
  removeAdjacent(vertex: GraphVertex<T>): boolean {
    return this.adjacents.delete(vertex);
  }

  /**
   * Checks if a vertex is adjacent to this vertex.
   * Time complexity: O(1) average
   *
   * @param vertex - The vertex to check
   * @returns True if the vertex is adjacent
   */
  isAdjacent(vertex: GraphVertex<T>): boolean {
    return this.adjacents.has(vertex);
  }

  /**
   * Gets all adjacent vertices.
   * Time complexity: O(n) where n is the number of adjacent vertices
   *
   * @returns Array of adjacent vertices
   */
  getAdjacents(): GraphVertex<T>[] {
    return Array.from(this.adjacents.keys());
  }

  /**
   * Gets the weight of the edge to an adjacent vertex.
   * Time complexity: O(1) average
   *
   * @param vertex - The adjacent vertex
   * @returns The weight of the edge, or undefined if not adjacent
   */
  getAdjacentWeight(vertex: GraphVertex<T>): number | undefined {
    return this.adjacents.get(vertex);
  }

  /**
   * Gets the key/value of this vertex.
   * Time complexity: O(1)
   *
   * @returns The value stored in this vertex
   */
  getKey(): T {
    return this.value;
  }

  /**
   * Gets the number of adjacent vertices (degree of the vertex).
   * Time complexity: O(1)
   *
   * @returns The number of adjacent vertices
   */
  get degree(): number {
    return this.adjacents.size;
  }
}

import { Graph } from '../../data-structures/graph/Graph';
import { GraphVertex } from '../../data-structures/graph/GraphVertex';
import { PriorityQueue } from '../../data-structures/priority-queue/PriorityQueue';
import { HashMap } from '../../data-structures/map/HashMap';
import { HashSet } from '../../data-structures/set/HashSet';

/**
 * Result of Dijkstra's shortest path algorithm
 */
export interface DijkstraResult<T> {
  /** Map of vertices to their shortest distance from the source */
  distances: HashMap<GraphVertex<T>, number>;
  /** Map of vertices to their previous vertex in the shortest path */
  previous: HashMap<GraphVertex<T>, GraphVertex<T> | null>;
}

/**
 * Dijkstra's Shortest Path Algorithm - Finds the shortest paths from a source vertex
 * to all other vertices in a weighted graph.
 * Time complexity: O((V + E) log V) with priority queue
 * Space complexity: O(V)
 *
 * @template T - The type of values stored in graph vertices
 * @param graph - The graph to search
 * @param startValue - The starting vertex value
 * @returns Object containing distances and previous vertices maps
 * @category Algorithms
 * @example
 * ```typescript
 * const graph = new Graph<string>();
 * graph.addEdge('A', 'B', 4);
 * graph.addEdge('A', 'C', 2);
 * graph.addEdge('B', 'C', 1);
 * graph.addEdge('B', 'D', 5);
 * graph.addEdge('C', 'D', 8);
 *
 * const result = dijkstra(graph, 'A');
 * const pathToD = getShortestPath(result, graph.getVertex('D')!);
 * console.log(pathToD.map(v => v.value)); // ['A', 'C', 'B', 'D']
 * ```
 */
export function dijkstra<T>(
  graph: Graph<T>,
  startValue: T
): DijkstraResult<T> {
  const startVertex = graph.getVertex(startValue);
  if (!startVertex) {
    throw new Error(`Start vertex ${startValue} not found in graph`);
  }

  const distances = new HashMap<GraphVertex<T>, number>();
  const previous = new HashMap<GraphVertex<T>, GraphVertex<T> | null>();
  const visited = new HashSet<GraphVertex<T>>();
  const priorityQueue = new PriorityQueue<GraphVertex<T>>();

  // Initialize distances
  for (const vertex of graph.getAllVertices()) {
    const distance = vertex === startVertex ? 0 : Infinity;
    distances.set(vertex, distance);
    previous.set(vertex, null);
    priorityQueue.offer(vertex, distance);
  }

  while (!priorityQueue.isEmpty()) {
    const currentVertex = priorityQueue.poll();
    if (!currentVertex || visited.has(currentVertex)) continue;

    visited.add(currentVertex);
    const currentDistance = distances.get(currentVertex)!;

    // Explore neighbors
    for (const neighbor of currentVertex.getAdjacents()) {
      if (visited.has(neighbor)) continue;

      const edgeWeight = currentVertex.getAdjacentWeight(neighbor) || 0;
      const newDistance = currentDistance + edgeWeight;
      const oldDistance = distances.get(neighbor)!;

      if (newDistance < oldDistance) {
        distances.set(neighbor, newDistance);
        previous.set(neighbor, currentVertex);
        priorityQueue.changePriority(neighbor, newDistance);
      }
    }
  }

  return { distances, previous };
}

/**
 * Reconstructs the shortest path from the source to a target vertex.
 * Time complexity: O(V)
 *
 * @template T - The type of values stored in graph vertices
 * @param result - The result from dijkstra algorithm
 * @param targetVertex - The target vertex
 * @returns Array of vertices representing the shortest path (empty if no path exists)
 * @category Algorithms
 */
export function getShortestPath<T>(
  result: DijkstraResult<T>,
  targetVertex: GraphVertex<T>
): GraphVertex<T>[] {
  const path: GraphVertex<T>[] = [];
  let current: GraphVertex<T> | null | undefined = targetVertex;

  // If the distance is Infinity, there's no path
  if (result.distances.get(targetVertex) === Infinity) {
    return [];
  }

  while (current) {
    path.unshift(current);
    current = result.previous.get(current) || null;
  }

  return path;
}

/**
 * Gets the shortest distance from the source to a target vertex.
 * Time complexity: O(1)
 *
 * @template T - The type of values stored in graph vertices
 * @param result - The result from dijkstra algorithm
 * @param targetVertex - The target vertex
 * @returns The shortest distance (Infinity if no path exists)
 * @category Algorithms
 */
export function getShortestDistance<T>(
  result: DijkstraResult<T>,
  targetVertex: GraphVertex<T>
): number {
  const distance = result.distances.get(targetVertex);
  return distance !== undefined ? distance : Infinity;
}

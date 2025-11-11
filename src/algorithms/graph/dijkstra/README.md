# Dijkstra's Shortest Path Algorithm

An efficient algorithm for finding the shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edge weights.

## Overview

Dijkstra's algorithm is a greedy algorithm that solves the single-source shortest path problem. It maintains a set of visited vertices and continuously selects the unvisited vertex with the smallest distance, updating the distances to its neighbors. This process continues until all vertices are visited.

## Time Complexity

| Operation | Complexity |
|-----------|------------|
| Dijkstra's Algorithm | O((V + E) log V) |

**Space Complexity:** O(V)

Where V = number of vertices, E = number of edges

## Basic Usage

```typescript
import { dijkstra, getShortestPath, getShortestDistance } from 'dstructures.js';
import { Graph, EdgeDirection } from 'dstructures.js';

// Create a weighted graph
const graph = new Graph<string>(EdgeDirection.DIRECTED);
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'B', 1);

// Run Dijkstra's algorithm from source vertex 'A'
const result = dijkstra(graph, 'A');

// Get shortest distance to a vertex
const destVertex = graph.getVertex('D')!;
const distance = getShortestDistance(result, destVertex);
console.log(distance); // 8 (A → C → B → D)

// Get shortest path to a vertex
const path = getShortestPath(result, destVertex);
console.log(path.map(v => v.value)); // ['A', 'C', 'B', 'D']
```

## Advanced Examples

### Finding All Shortest Paths from a Source

```typescript
import { dijkstra, getShortestDistance, getShortestPath } from 'dstructures.js';
import { Graph } from 'dstructures.js';

const graph = new Graph<string>();
graph.addEdge('S', 'A', 7);
graph.addEdge('S', 'B', 2);
graph.addEdge('S', 'C', 3);
graph.addEdge('A', 'D', 4);
graph.addEdge('B', 'D', 4);
graph.addEdge('C', 'D', 2);

const result = dijkstra(graph, 'S');

// Get distances to all vertices
for (const vertex of graph.getAllVertices()) {
  const distance = getShortestDistance(result, vertex);
  console.log(`Distance from S to ${vertex.value}: ${distance}`);
}

// Output:
// Distance from S to S: 0
// Distance from S to A: 7
// Distance from S to B: 2
// Distance from S to C: 3
// Distance from S to D: 5 (S → C → D)
```

### Network Routing Example

```typescript
import { dijkstra, getShortestPath, getShortestDistance } from 'dstructures.js';
import { Graph } from 'dstructures.js';

// Build a city network with distances in miles
const cityNetwork = new Graph<string>();
cityNetwork.addEdge('New York', 'Boston', 215);
cityNetwork.addEdge('New York', 'Philadelphia', 95);
cityNetwork.addEdge('Philadelphia', 'Washington DC', 140);
cityNetwork.addEdge('Philadelphia', 'Pittsburgh', 305);
cityNetwork.addEdge('Boston', 'Portland', 103);
cityNetwork.addEdge('Washington DC', 'Richmond', 108);

// Find shortest route from New York to all cities
const routes = dijkstra(cityNetwork, 'New York');

// Get specific route
const dcVertex = cityNetwork.getVertex('Washington DC')!;
const distance = getShortestDistance(routes, dcVertex);
const path = getShortestPath(routes, dcVertex);

console.log(`Distance: ${distance} miles`); // 235 miles
console.log(`Route: ${path.map(v => v.value).join(' → ')}`);
// Route: New York → Philadelphia → Washington DC
```

### Handling Unreachable Vertices

```typescript
import { dijkstra, getShortestDistance } from 'dstructures.js';
import { Graph } from 'dstructures.js';

const graph = new Graph<number>();
graph.addEdge(1, 2, 5);
graph.addEdge(2, 3, 3);
// Vertex 4 is not connected
graph.addVertex(4);

const result = dijkstra(graph, 1);

const vertex4 = graph.getVertex(4)!;
const distance = getShortestDistance(result, vertex4);
console.log(distance); // Infinity (unreachable)
```

### Finding Alternative Routes

```typescript
import { dijkstra, getShortestPath } from 'dstructures.js';
import { Graph, EdgeDirection } from 'dstructures.js';

const graph = new Graph<string>(EdgeDirection.UNDIRECTED);

// Create a graph with multiple routes
graph.addEdge('Start', 'A', 1);
graph.addEdge('Start', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('C', 'End', 3);

// Primary shortest path
const result = dijkstra(graph, 'Start');
const endVertex = graph.getVertex('End')!;
const primaryPath = getShortestPath(result, endVertex);

console.log('Primary route:', primaryPath.map(v => v.value).join(' → '));
// Primary route: Start → A → C → End (distance: 6)

// To find alternative route, temporarily remove an edge
graph.removeEdge('A', 'C');
const altResult = dijkstra(graph, 'Start');
const altPath = getShortestPath(altResult, endVertex);

console.log('Alternative route:', altPath.map(v => v.value).join(' → '));
// Alternative route: Start → B → C → End (distance: 8)
```

### Dijkstra with Custom Objects

```typescript
import { dijkstra, getShortestDistance } from 'dstructures.js';
import { Graph } from 'dstructures.js';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const mapGraph = new Graph<Location>();

const loc1: Location = { id: '1', name: 'Home', lat: 40.7, lng: -74.0 };
const loc2: Location = { id: '2', name: 'Work', lat: 40.8, lng: -73.9 };
const loc3: Location = { id: '3', name: 'Store', lat: 40.75, lng: -73.95 };

mapGraph.addEdge(loc1, loc2, 15); // 15 minutes
mapGraph.addEdge(loc1, loc3, 8);
mapGraph.addEdge(loc3, loc2, 10);

const routes = dijkstra(mapGraph, loc1);
const workVertex = mapGraph.getVertex(loc2)!;
const travelTime = getShortestDistance(routes, workVertex);

console.log(`Fastest route to work: ${travelTime} minutes`); // 18 minutes
```

## API Reference

### Main Functions

#### `dijkstra<T>(graph, startValue)`

Computes shortest paths from a source vertex to all other vertices.

**Parameters:**
- `graph: Graph<T>` - The graph to search
- `startValue: T` - The value of the starting vertex

**Returns:** `DijkstraResult<T>` - Object containing:
- `distances: Map<GraphVertex<T>, number>` - Distance to each vertex
- `previous: Map<GraphVertex<T>, GraphVertex<T> | null>` - Previous vertex in shortest path

**Time Complexity:** O((V + E) log V)

#### `getShortestDistance<T>(result, vertex)`

Gets the shortest distance to a specific vertex.

**Parameters:**
- `result: DijkstraResult<T>` - Result from dijkstra()
- `vertex: GraphVertex<T>` - The destination vertex

**Returns:** `number` - The shortest distance (Infinity if unreachable)

#### `getShortestPath<T>(result, vertex)`

Gets the shortest path to a specific vertex.

**Parameters:**
- `result: DijkstraResult<T>` - Result from dijkstra()
- `vertex: GraphVertex<T>` - The destination vertex

**Returns:** `GraphVertex<T>[]` - Array of vertices in the shortest path (empty if unreachable)

## Algorithm Steps

1. Initialize distances to all vertices as Infinity, except source (0)
2. Create a priority queue with all vertices
3. While the queue is not empty:
   - Extract vertex with minimum distance
   - For each unvisited neighbor:
     - Calculate distance through current vertex
     - If this distance is shorter, update it
     - Update the previous vertex pointer
4. Return distance and previous vertex mappings

## When to Use

**Use Dijkstra's Algorithm when:**
- Finding shortest path in weighted graphs with non-negative weights
- Network routing (GPS, internet routing)
- Finding optimal paths in games or simulations
- Social network analysis (degrees of separation)
- Resource allocation problems

**Consider alternatives when:**
- Graph has negative edge weights → Use Bellman-Ford
- Need all-pairs shortest paths → Use Floyd-Warshall
- Unweighted graph → Use BFS (simpler and faster)
- Need to find longest path → Different approach needed

## Limitations

- **Non-negative weights only:** Algorithm doesn't work correctly with negative edge weights
- **Single source:** Computes paths from one source vertex only
- **Memory:** Requires O(V) extra space for distances and previous vertices

## Implementation Notes

This implementation:
- Uses a priority queue (min-heap) for efficient vertex selection
- Works with both directed and undirected graphs
- Returns Infinity for unreachable vertices
- Tracks previous vertices for path reconstruction
- Supports any comparable type through generics
- Handles disconnected graphs gracefully

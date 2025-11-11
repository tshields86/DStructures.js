# Graph

A flexible graph implementation supporting both directed and undirected graphs with weighted edges. Provides efficient traversal algorithms (BFS, DFS) and path-finding capabilities.

## Overview

A graph is a non-linear data structure consisting of vertices (nodes) connected by edges. Graphs can represent networks, relationships, maps, and many other interconnected systems. This implementation uses an adjacency list representation for memory efficiency.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Add vertex | O(1) | O(1) |
| Remove vertex | O(V) | O(V) |
| Add edge | O(1) | O(1) |
| Remove edge | O(E) | O(E) |
| Check adjacency | O(E) | O(E) |
| Get adjacents | O(1) | O(1) |
| DFS/BFS | O(V + E) | O(V + E) |
| Find path | O(V + E) | O(V + E) |

Where V = number of vertices, E = number of edges per vertex

**Space Complexity:** O(V + E)

## Basic Usage

```typescript
import { Graph, EdgeDirection } from 'dstructures.js';

// Create an undirected graph
const graph = new Graph<string>(EdgeDirection.UNDIRECTED);

// Add vertices (created automatically when adding edges)
graph.addVertex('A');
graph.addVertex('B');

// Add edges
graph.addEdge('A', 'B');        // Unweighted edge
graph.addEdge('B', 'C', 5);     // Weighted edge (weight: 5)
graph.addEdge('C', 'D', 10);

// Query the graph
console.log(graph.size);                    // Number of vertices: 4
console.log(graph.areAdjacents('A', 'B')); // true
console.log(graph.areConnected('A', 'D')); // true (path exists)

// Get adjacent vertices
const neighbors = graph.getAdjacents('B');
console.log(neighbors.map(v => v.value));   // ['A', 'C']

// Remove edges and vertices
graph.removeEdge('A', 'B');
graph.removeVertex('D');
```

## Advanced Examples

### Directed Graph

```typescript
const directedGraph = new Graph<string>(EdgeDirection.DIRECTED);

// Create a directed graph: A → B → C
//                          ↓       ↑
//                          D -------
directedGraph.addEdge('A', 'B');
directedGraph.addEdge('B', 'C');
directedGraph.addEdge('A', 'D');
directedGraph.addEdge('D', 'C');

// Check directionality
console.log(directedGraph.areAdjacents('A', 'B')); // true
console.log(directedGraph.areAdjacents('B', 'A')); // false (directed!)
```

### Weighted Graph (Network Routing)

```typescript
const network = new Graph<string>(EdgeDirection.UNDIRECTED);

// Build a network with distances
network.addEdge('New York', 'Boston', 215);
network.addEdge('New York', 'Philadelphia', 95);
network.addEdge('Philadelphia', 'Washington DC', 140);
network.addEdge('Boston', 'Portland', 103);

// Get edge weight
const nyVertex = network.getVertex('New York')!;
const bostonVertex = network.getVertex('Boston')!;
const distance = nyVertex.getAdjacentWeight(bostonVertex);
console.log(distance); // 215
```

### Graph Traversal - Breadth-First Search (BFS)

```typescript
const graph = new Graph<number>();
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);

// BFS traversal
const startVertex = graph.getVertex(1)!;
const visited: number[] = [];

for (const vertex of Graph.bfs(startVertex)) {
  visited.push(vertex.value);
}
console.log(visited); // [1, 2, 3, 4, 5] (level-order)
```

### Graph Traversal - Depth-First Search (DFS)

```typescript
const graph = new Graph<string>();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

// DFS traversal
const startVertex = graph.getVertex('A')!;
const visited: string[] = [];

for (const vertex of Graph.dfs(startVertex)) {
  visited.push(vertex.value);
}
console.log(visited); // ['A', 'B', 'D', 'C', 'E'] (depth-first)
```

### Finding Paths

```typescript
const graph = new Graph<string>();
graph.addEdge('Start', 'A');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'End');
graph.addEdge('C', 'End');

// Find a path
const path = graph.findPath('Start', 'End');
console.log(path.map(v => v.value)); // ['Start', 'A', 'B', 'End']

// Find all paths
const allPaths = graph.findAllPaths('Start', 'End');
allPaths.forEach(path => {
  console.log(path.map(v => v.value));
});
// Output:
// ['Start', 'A', 'B', 'End']
// ['Start', 'A', 'C', 'End']
```

### Detecting Connected Components

```typescript
const graph = new Graph<number>();

// Create disconnected components
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(4, 5); // Separate component

function findConnectedComponents<T>(graph: Graph<T>): T[][] {
  const visited = new Set<T>();
  const components: T[][] = [];

  for (const vertex of graph.getAllVertices()) {
    if (!visited.has(vertex.value)) {
      const component: T[] = [];

      for (const v of Graph.bfs(vertex)) {
        visited.add(v.value);
        component.push(v.value);
      }

      components.push(component);
    }
  }

  return components;
}

const components = findConnectedComponents(graph);
console.log(components); // [[1, 2, 3], [4, 5]]
```

### Social Network Example

```typescript
interface Person {
  id: string;
  name: string;
}

const socialGraph = new Graph<Person>();

const alice: Person = { id: '1', name: 'Alice' };
const bob: Person = { id: '2', name: 'Bob' };
const charlie: Person = { id: '3', name: 'Charlie' };

// Add friendships
socialGraph.addEdge(alice, bob);
socialGraph.addEdge(bob, charlie);

// Check if people are friends
console.log(socialGraph.areAdjacents(alice, bob)); // true

// Find friends of friends
const friends = socialGraph.getAdjacents(alice);
console.log(friends.map(v => v.value.name)); // ['Bob']
```

## API Reference

### Graph Class

#### Constructor
- **`new Graph<T>(edgeDirection?)`** - Creates a new graph (default: undirected)

#### Properties
- **`size`** - Number of vertices in the graph

#### Vertex Operations
- **`addVertex(value)`** - Add a vertex. *O(1)*
- **`removeVertex(value)`** - Remove a vertex and its edges. *O(V)*
- **`getVertex(value)`** - Get a vertex by value. *O(1)*
- **`getAllVertices()`** - Get all vertices. *O(1)*

#### Edge Operations
- **`addEdge(source, dest, weight?)`** - Add an edge (creates vertices if needed). *O(1)*
- **`removeEdge(source, dest)`** - Remove an edge. *O(E)*
- **`areAdjacents(source, dest)`** - Check if two vertices are adjacent. *O(E)*
- **`getAdjacents(value)`** - Get all adjacent vertices. *O(1)*

#### Traversal & Path Finding
- **`static bfs(startVertex)`** - Breadth-first search generator. *O(V + E)*
- **`static dfs(startVertex)`** - Depth-first search generator. *O(V + E)*
- **`areConnected(value1, value2)`** - Check if path exists. *O(V + E)*
- **`findPath(start, end)`** - Find a path between vertices. *O(V + E)*
- **`findAllPaths(start, end)`** - Find all paths between vertices. *O(V + E)*

#### Utility
- **`getEdgeDirection()`** - Get graph edge direction
- **`toString()`** - String representation of the graph

### GraphVertex Class

#### Properties
- **`value`** - The value stored in the vertex
- **`degree`** - Number of adjacent vertices

#### Methods
- **`addAdjacent(vertex, weight?)`** - Add an adjacent vertex
- **`removeAdjacent(vertex)`** - Remove an adjacent vertex
- **`isAdjacent(vertex)`** - Check if vertex is adjacent
- **`getAdjacents()`** - Get all adjacent vertices
- **`getAdjacentValues()`** - Get values of adjacent vertices
- **`getAdjacentWeight(vertex)`** - Get weight of edge to vertex
- **`getKey()`** - Get unique key for the vertex

## When to Use

**Use Graph when:**
- Modeling networks (social, computer, transportation)
- Representing relationships between entities
- Solving pathfinding problems
- Working with hierarchical data with multiple parents
- Implementing recommendation systems

**Consider alternatives when:**
- You need strictly hierarchical data → Use Tree
- You need simple key-value mapping → Use HashMap
- You need ordered traversal only → Use LinkedList

## Implementation Notes

This implementation:
- Uses adjacency list representation (HashMap of vertices)
- Supports both directed and undirected edges
- Allows weighted edges with optional weights
- Provides static BFS/DFS generators for memory-efficient traversal
- Automatically creates vertices when adding edges
- Uses generics for type safety with any value type
- Efficiently handles duplicate edge prevention

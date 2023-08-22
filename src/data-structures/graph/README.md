# Graph

The graph implementation in this directory provides a collection of vertices connected by edges. Vertices may or may not have weights associated with their edges, making this suitable for both weighted and unweighted graphs.

## Implementation Details

### Graph

- **Properties**:
  - `vertices`: A collection of vertices in the graph.
  - `edgeDirection`: The directionality of edges in the graph (directed or undirected).
  
- **Constructor**:
  - Constructs a new graph. Accepts an optional edge direction.
  
- **Methods**:
  - `addVertex(value)`: Adds a vertex to the graph.
  - `removeVertex(value)`: Removes a vertex from the graph.
  - `addEdge(startValue, endValue, weight)`: Adds an edge between two vertices.
  - `removeEdge(startValue, endValue)`: Removes an edge between two vertices.
  - `getAllVertices()`: Returns all vertices in the graph.
  - `areAdjacents(startValue, endValue)`: Checks if two vertices are adjacent.
  - `dfs(startValue, visitFn)`: Performs a depth-first search.
  - `bfs(startValue, visitFn)`: Performs a breadth-first search.
  - `getAdjacents(value)`: Returns all adjacent vertices of a given vertex.
  - `areConnected(value1, value2)`: Checks if two vertices are connected.
  - `findPath(startValue, endValue)`: Finds a path between two vertices.
  - `findAllPaths(startValue, endValue)`: Finds all paths between two vertices.

### GraphVertex

- **Properties**:
  - `value`: The value or data of the vertex.
  - `edges`: The edges connected to the vertex.
  
- **Constructor**:
  - Constructs a new vertex with a given value.
  
- **Methods**:
  - `addAdjacent(vertex, weight)`: Adds an adjacent vertex.
  - `removeAdjacent(vertex)`: Removes an adjacent vertex.
  - `isAdjacent(vertex)`: Checks if a vertex is adjacent.
  - `getAdjacents()`: Returns all adjacent vertices.
  - `getAdjacentValues()`: Returns values of all adjacent vertices.
  - `getAdjacentWeight(vertex)`: Gets the weight of the edge to an adjacent vertex.
  - `getKey()`: Gets the key of the vertex.

## Usage

To use the graph, you can import the `Graph` and `GraphVertex` classes and create instances of them. The graph ensures efficient manipulation of vertices and edges.

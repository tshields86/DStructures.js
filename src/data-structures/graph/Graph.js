const GraphVertex = require('./GraphVertex');
const Stack = require('../stack/Stack');
const Queue = require('../queue/Queue');
const HashMap = require('../map/HashMap');
const HashSet = require('../set/HashSet');

/**
 * Graph
 */
class Graph {
  /**
   * @param {symbol} [edgeDirection]
   */
  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.vertices = new HashMap();
    this.edgeDirection = edgeDirection;
  }

  /**
   * @param {*} value
   * @param {GraphVertex}
   */
  addVertex(value) {
    if (this.vertices.has(value)) {
      return this.vertices.get(value);
    }
    const vertex = new GraphVertex(value);
    this.vertices.set(value, vertex);
    return vertex;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  removeVertex(value) {
    const current = this.vertices.get(value);
    if (current) {
      for (const vertex of this.vertices.values()) {
        vertex.removeAdjacent(current);
      }
    }
    return this.vertices.delete(value);
  }

  /**
   * @param {*} source
   * @param {*} destination
   * @return {[GraphVertex, GraphVertex]}
   */
  addEdge(source, destination, weight = 0) {
    const sourceVertex = this.addVertex(source);
    const destinationVertex = this.addVertex(destination);

    sourceVertex.addAdjacent(destinationVertex, weight);

    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationVertex.addAdjacent(sourceVertex, weight);
    }

    return [sourceVertex, destinationVertex];
  }

  /**
   * @param {*} source
   * @param {*} destination
   * @return {[GraphVertex, GraphVertex]}
   */
  removeEdge(source, destination) {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);

    if (sourceVertex && destinationVertex) {
      sourceVertex.removeAdjacent(destinationVertex);

      if (this.edgeDirection === Graph.UNDIRECTED) {
        destinationVertex.removeAdjacent(sourceVertex);
      }
    }

    return [sourceVertex, destinationVertex];
  }

  /**
   * @return {GraphVertex[]}
   */
  getAllVertices() {
    return [...this.vertices.values()];
  }

  /**
   * @param {*} source
   * @param {*} destination
   * @return {boolean}
   */
  areAdjacents(source, destination) {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);

    if (sourceVertex && destinationVertex) {
      return sourceVertex.isAdjacent(destinationVertex);
    }

    return false;
  }

  /**
   * Depth-first search
   * Uses a stack to explore vertices
   * @param {GraphVertex} startVertex
   */
  static* dfs(startVertex) {
    yield* Graph.search(startVertex, Stack);
  }

  /**
   * Breadth-first search
   * Uses a queue to explore vertices
   * @param {GraphVertex} startVertex
   */
  static* bfs(startVertex) {
    yield* Graph.search(startVertex, Queue);
  }

  /**
   * @param {GraphVertex} startVertex
   * @param {(Stack|Queue)} [Type] Stack for DFS or Queue for BFS
   */
  static* search(startVertex, Type = Stack) {
    const exploredVertices = new HashSet();
    const verticesToExplore = new Type();

    verticesToExplore.add(startVertex);

    while (!verticesToExplore.isEmpty()) {
      const vertex = verticesToExplore.remove();
      if (vertex && !exploredVertices.has(vertex)) {
        yield vertex;
        exploredVertices.add(vertex);
        vertex.getAdjacents()
          .forEach(adjacentVertex => verticesToExplore.add(adjacentVertex));
      }
    }
  }

  /**
   * @param {*} source
   * @param {*} destination
   * @return {boolean}
   */
  areConnected(source, destination) {
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
   * @param {*} source
   * @param {*} destination
   * @param {HashMap} [path]
   * @return {array}
   */
  findPath(source, destination, path = new HashMap()) {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);
    if (!sourceVertex || !destinationVertex) return [];

    const newPath = new HashMap(path);
    newPath.set(sourceVertex);

    if (source === destination) {
      return Array.from(newPath.keys());
    }

    for (const adjacentVertex of sourceVertex.getAdjacents()) {
      if (!newPath.has(adjacentVertex)) {
        const nextPath = this.findPath(adjacentVertex.getKey(), destination, newPath);
        if (nextPath.length) return nextPath;
      }
    }

    return [];
  }

  /**
   * @param {*} source
   * @param {*} destination
   * @param {HashMap} [path]
   * @return {array}
   */
  findAllPaths(source, destination, path = new HashMap()) {
    const sourceVertex = this.vertices.get(source);
    const destinationVertex = this.vertices.get(destination);
    if (!sourceVertex || !destinationVertex) return [];

    const newPath = new HashMap(path);
    newPath.set(sourceVertex);

    if (source === destination) {
      return [Array.from(newPath.keys())];
    }

    const paths = [];
    sourceVertex.getAdjacents().forEach(adjacentVertex => {
      if (!newPath.has(adjacentVertex)) {
        const nextPaths = this.findAllPaths(adjacentVertex.getKey(), destination, newPath);
        nextPaths.forEach(nextPath => paths.push(nextPath));
      }
    });

    return paths;
  }
}

Graph.UNDIRECTED = Symbol('undirected graph');
Graph.DIRECTED = Symbol('directed graph');

module.exports = Graph;

const HashMap = require('../../../data-structures/map/HashMap');
const PriorityQueue = require('../../../data-structures/priority-queue/PriorityQueue');

/**
 * Dijkstra algorithm for finding the shortest paths to graph vertices.
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @return {ShortestPaths}
 */
const dijkstra = (graph, startVertex) => {
  const weights = new HashMap();
  const exploredVertices = new HashMap();
  const previousVertices = new HashMap();
  const verticesToExplore = new PriorityQueue();

  graph.getAllVerticies().forEach(vertex => {
    weights.set(vertex.getKey(), Infinity);
    previousVertices.set(vertex.getKey(), null);
  });

  weights.set(startVertex.getKey(), 0);

  verticesToExplore.offer(startVertex, weights.get(startVertex.getKey()));

  while (!verticesToExplore.isEmpty()) {
    const currentVertex = verticesToExplore.poll();

    currentVertex.getAdjacents().forEach(adjacentVertex => {
      if (!exploredVertices.has(adjacentVertex.getKey())) {
        const adjacentWeight = currentVertex.getAdjacentWeight(adjacentVertex);

        const existingDistanceToAdjacent = weights.get(adjacentVertex.getKey());
        const distanceToAdjacentFromCurrent = weights.get(currentVertex.getKey()) + adjacentWeight;

        if (distanceToAdjacentFromCurrent < existingDistanceToAdjacent) {
          weights.set(adjacentVertex.getKey(), distanceToAdjacentFromCurrent);

          if (verticesToExplore.has(adjacentVertex)) {
            verticesToExplore.changePriority(adjacentVertex, weights.get(adjacentVertex.getKey()));
          }

          previousVertices.set(adjacentVertex.getKey(), currentVertex);
        }

        if (!verticesToExplore.has(adjacentVertex)) {
          verticesToExplore.add(adjacentVertex, weights.get(adjacentVertex.getKey()));
        }
      }
    });

    exploredVertices.set(currentVertex.getKey(), currentVertex);
  }

  return {
    weights,
    previousVertices,
  };
};

module.exports = dijkstra;

const HashMap = require('../map/HashMap');

/**
 * Vertex with reference to value and adjacents.
 */
class GraphVertex {
  /**
   * @param {*} value
   * @param {symbol} edgeDirection
   */
  constructor(value) {
    this.value = value;
    this.adjacents = new HashMap();
  }

  /**
   * @param {GraphVertex} vertex
   */
  addAdjacent(vertex, weight = 0) {
    this.adjacents.set(vertex, weight);
  }

  /**
   * @param {GraphVertex} vertex
   * @return {boolean}
   */
  removeAdjacent(vertex) {
    return this.adjacents.delete(vertex);
  }

  /**
   * @param {GraphVertex} vertex
   * @return {boolean}
   */
  isAdjacent(vertex) {
    return this.adjacents.has(vertex);
  }

  /**
   * @return {array}
   */
  getAdjacents() {
    return [...this.adjacents.keys()];
  }

  // /**
  //  * @return {array}
  //  */
  // getAdjacentValues(vertex) {
  //   return [...this.adjacents.keys()];
  // }

  /**
   * @return {array}
   */
  getAdjacentWeight(vertex) {
    return this.adjacents.get(vertex);
  }

  /**
   * @return {*}
   */
  getKey() {
    return this.value;
  }
}

module.exports = GraphVertex;

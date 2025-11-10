const Heap = require('./Heap');

/**
 * MinHeap
 */
class MinHeap extends Heap {
  constructor() {
    super((a, b) => a - b);
  }
}

module.exports = MinHeap;

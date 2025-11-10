const Heap = require('./Heap');

/**
 * MaxHeap
 */
class MaxHeap extends Heap {
  constructor() {
    super((a, b) => b - a);
  }
}

module.exports = MaxHeap;

const { shuffle, swap } = require('../../utils/utils');

const partition = (array, left, right) => {
  const pivotIndex = left;
  let pivotFinalIndex = pivotIndex;

  for (let current = pivotIndex + 1; current <= right; current++) {
    if (array[current] < array[pivotIndex]) {
      pivotFinalIndex += 1;
      swap(array, current, pivotFinalIndex);
    }
  }

  swap(array, pivotIndex, pivotFinalIndex);
  return pivotFinalIndex;
};

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left < right) {
    const partitionIndex = partition(array, left, right);
    quickSort(array, left, partitionIndex - 1);
    quickSort(array, partitionIndex + 1, right);
  }

  return array;
};

const quickSortWrapper = iterable => {
  const array = Array.from(iterable);
  shuffle(array);
  return quickSort(array);
};

module.exports = quickSortWrapper;

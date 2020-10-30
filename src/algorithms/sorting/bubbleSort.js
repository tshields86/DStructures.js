const { swap } = require('../../utils/utils');

const bubbleSort = iterable => {
  const array = Array.from(iterable);

  let isSorted = false;
  let lastUnsorted = array.length - 1;

  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < lastUnsorted; i++) {
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        isSorted = false;
      }
    }
    lastUnsorted--;
  }

  return array;
};

module.exports = bubbleSort;

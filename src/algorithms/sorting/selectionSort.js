const { swap } = require('../../utils/utils');

const selectionSort = iterable => {
  const array = Array.from(iterable);

  let firstUnsorted = 0;

  while (firstUnsorted < array.length) {
    let minIdx = firstUnsorted;

    for (let i = firstUnsorted; i < array.length; i++) {
      if (array[i] < array[minIdx]) minIdx = i;
    }

    swap(array, firstUnsorted, minIdx);
    firstUnsorted++;
  }

  return array;
};

module.exports = selectionSort;

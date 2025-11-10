const insertionSort = iterable => {
  const array = Array.from(iterable);

  for (let i = 1; i < array.length; i++) {
    const curVal = array[i];
    let j;
    for (j = i - 1; j >= 0 && array[j] > curVal; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = curVal;
  }

  return array;
};

module.exports = insertionSort;

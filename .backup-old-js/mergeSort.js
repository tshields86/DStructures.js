const merge = (left, right) => {
  const array = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array.push(left[i]);
      i++;
    } else {
      array.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    array.push(left[i]);
    i++;
  }

  while (j < right.length) {
    array.push(right[j]);
    j++;
  }

  return array;
};

const mergeSort = array => {
  if (array.length <= 1) return array;
  const mid = Math.floor(array.length / 2);

  return merge(
    mergeSort(array.slice(0, mid)),
    mergeSort(array.slice(mid)),
  );
};

const mergeSortWrapper = iterable => {
  const array = Array.from(iterable);
  return mergeSort(array);
};

module.exports = mergeSortWrapper;

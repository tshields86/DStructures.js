const binarySearch = (array, value) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] > value) right = mid - 1;
    else if (array[mid] < value) left = mid + 1;
    else return mid;
  }

  return -1;
};

module.exports = binarySearch;

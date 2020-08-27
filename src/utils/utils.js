const swap = (array, i1, i2) => {
  [array[i1], array[i2]] = [array[i2], array[i1]];
};

module.exports = {
  swap,
};

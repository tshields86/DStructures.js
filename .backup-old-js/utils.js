const isOdd = number => number % 2 !== 0;

const isPrime = number => {
  if (number < 2) return false;

  const max = Math.sqrt(number);
  for (let divisor = 2; divisor <= max; divisor++) {
    if (number % divisor === 0) return false;
  }

  return true;
};

/**
 * Find the next prime of a given number
 * @param {integer} number
 */
const nextPrime = number => {
  if (number < 2) return 2;

  let possiblePrime = isOdd(number) ? number + 2 : number + 1;

  while (!isPrime(possiblePrime)) {
    possiblePrime += 2;
  }

  return possiblePrime;
};

const swap = (array, i1, i2) => {
  [array[i1], array[i2]] = [array[i2], array[i1]];
};

const shuffle = array => {
  const { length } = array;
  for (let index = 0; index < length; index++) {
    const newIndex = Math.floor(Math.random() * length);
    swap(array, index, newIndex);
  }
  return array;
};

module.exports = {
  isOdd,
  isPrime,
  nextPrime,
  swap,
  shuffle,
};

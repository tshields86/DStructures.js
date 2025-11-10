const {
  isOdd,
  isPrime,
  nextPrime,
  swap,
} = require('../utils');

describe('utils', () => {
  describe('#isOdd', () => {
    it('should return true if number is odd', () => {
      expect(isOdd(-1)).toBe(true);
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(9)).toBe(true);
    });

    it('should return false if number is even', () => {
      expect(isOdd(-2)).toBe(false);
      expect(isOdd(0)).toBe(false);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(10)).toBe(false);
    });
  });

  describe('#isPrime', () => {
    it('should return true if number is prime', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(149)).toBe(true);
      expect(isPrime(997)).toBe(true);
    });

    it('should return false if number is not prime', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(100)).toBe(false);
      expect(isPrime(1050)).toBe(false);
    });
  });

  describe('#nextPrime', () => {
    it('should return the next prime number', () => {
      expect(nextPrime(1)).toBe(2);
      expect(nextPrime(2)).toBe(3);
      expect(nextPrime(3)).toBe(5);
      expect(nextPrime(11)).toBe(13);
      expect(nextPrime(997)).toBe(1009);
    });
  });

  describe('#swap', () => {
    it('should swap two values in an array by indexes', () => {
      const array = [1, 2, 3, 4, 5];
      swap(array, 0, 2);

      expect(array).toEqual([3, 2, 1, 4, 5]);
    });
  });
});

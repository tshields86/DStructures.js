const {
  isOdd,
  isPrime,
  nextPrime,
  swap,
} = require('../utils');

describe('utils', () => {
  describe('#isOdd', () => {
    it('should return true if number is odd', () => {
      expect(isOdd(-1)).toBeTruthy();
      expect(isOdd(1)).toBeTruthy();
      expect(isOdd(3)).toBeTruthy();
      expect(isOdd(9)).toBeTruthy();
    });

    it('should return false if number is even', () => {
      expect(isOdd(-2)).toBeFalsy();
      expect(isOdd(0)).toBeFalsy();
      expect(isOdd(2)).toBeFalsy();
      expect(isOdd(10)).toBeFalsy();
    });
  });

  describe('#isPrime', () => {
    it('should return true if number is prime', () => {
      expect(isPrime(2)).toBeTruthy();
      expect(isPrime(3)).toBeTruthy();
      expect(isPrime(149)).toBeTruthy();
      expect(isPrime(997)).toBeTruthy();
    });

    it('should return false if number is not prime', () => {
      expect(isPrime(1)).toBeFalsy();
      expect(isPrime(4)).toBeFalsy();
      expect(isPrime(100)).toBeFalsy();
      expect(isPrime(1050)).toBeFalsy();
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

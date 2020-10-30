const {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} = require('../../../index');

const sortingAlgorithms = [
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
];

const UNSORTED_NUMBERS = [10, 7, 2, 4, 9, 3, 8, 6, 5, 0, 1];
const SORTED_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const REVERSE_SORTED_NUMBERS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const UNSORTED_NEGATIVE_NUMBERS = [2, 1, -3, 0, -1, -2, -4, -5, 5, 4, 3];
const SORTED_NEGATIVE_NUMBERS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const UNSORTED_STRINGS = [
  'New York', 'South Carolina', 'Maine', 'California', 'New Jersey',
  'Colorado', 'Virginia', 'Montana', 'Arkansas', 'Washington',
  'Texas', 'Wisconsin', 'Delaware', 'Mississippi', 'Oklahoma',
  'Pennsylvania', 'Florida', 'New Mexico', 'Missouri', 'Hawaii',
  'Massachusetts', 'Idaho', 'Alaska', 'Illinois', 'Nevada',
  'Indiana', 'Kansas', 'Oregon', 'Arizona', 'Minnesota',
  'North Carolina', 'Kentucky', 'Iowa', 'North Dakota', 'Ohio',
  'Rhode Island', 'Alabama', 'Georgia', 'Maryland', 'Nebraska',
  'South Dakota', 'Michigan', 'Tennessee', 'Connecticut', 'Utah',
  'Louisiana', 'Vermont', 'West Virginia', 'Wyoming', 'New Hampshire',
];
const SORTED_STRINGS = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

sortingAlgorithms.forEach(sort => {
  describe(`#${sort.name}`, () => {
    it('should work with an empty array', () => {
      expect(sort([])).toEqual([]);
    });

    it('should work with one number', () => {
      expect(sort([3])).toEqual([3]);
    });

    it('should sort numbers', () => {
      expect(sort(UNSORTED_NUMBERS)).toEqual(SORTED_NUMBERS);
    });

    it('should sort negative numbers', () => {
      expect(sort(UNSORTED_NEGATIVE_NUMBERS)).toEqual(SORTED_NEGATIVE_NUMBERS);
    });

    it('should sort a reversed array', () => {
      expect(sort(REVERSE_SORTED_NUMBERS)).toEqual(SORTED_NUMBERS);
    });

    it('should sort a sorted array', () => {
      expect(sort(SORTED_NUMBERS)).toEqual(SORTED_NUMBERS);
    });

    it('should sort a sorted array', () => {
      expect(sort(SORTED_NUMBERS)).toEqual(SORTED_NUMBERS);
    });

    it('should sort strings', () => {
      expect(sort(UNSORTED_STRINGS)).toEqual(SORTED_STRINGS);
    });

    it('should sort a set', () => {
      expect(sort(new Set([3, 1, 2]))).toEqual([1, 2, 3]);
    });

    it('should sort with duplicated values', () => {
      expect(sort([1, 3, 2, 1])).toEqual([1, 1, 2, 3]);
    });

    it('should sort with almost already sorted array', () => {
      expect(sort([1, 2, 3, 0])).toEqual([0, 1, 2, 3]);
    });
  });
});

const { binarySearch } = require('../../../index');

const SORTED_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

describe('#binarySearch', () => {
  it('should work with an empty array', () => {
    expect(binarySearch([], 5)).toEqual(-1);
  });

  it('should work with one number', () => {
    expect(binarySearch([5], 5)).toEqual(0);
  });

  it('should return work with numbers', () => {
    expect(binarySearch(SORTED_NUMBERS, 0)).toEqual(0);
    expect(binarySearch(SORTED_NUMBERS, 5)).toEqual(5);
    expect(binarySearch(SORTED_NUMBERS, 10)).toEqual(10);
  });

  it('should return work with strings', () => {
    expect(binarySearch(SORTED_STRINGS, 'California')).toEqual(4);
    expect(binarySearch(SORTED_STRINGS, 'Florida')).toEqual(8);
    expect(binarySearch(SORTED_STRINGS, 'New York')).toEqual(31);
  });
});

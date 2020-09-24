const HashSet = require('../HashSet');

const ITERABLE = ['foo', 'bar', 'baz'];

describe('HashSet', () => {
  let hashSet;

  it('should create empty hash set', () => {
    hashSet = new HashSet();
    expect(hashSet.size).toBe(0);
  });

  it('should create hash set from iterable', () => {
    hashSet = new HashSet(ITERABLE);
    expect([...hashSet]).toEqual(ITERABLE);
  });

  describe('#add', () => {
    beforeEach(() => {
      hashSet = new HashSet();
    });

    it('should add the value to the hash set', () => {
      hashSet.add('foo', 'bar');

      expect(hashSet.size).toBe(1);
      expect(hashSet.has('foo')).toBeTruthy();
    });

    it('should add the values of any type', () => {
      const array = [1, 2, 3];
      const boolean = true;
      const func = () => 'foo';
      const number = 10;
      const object = { foo: 'bar' };
      const string = 'foo';

      hashSet.add(array);
      hashSet.add(boolean);
      hashSet.add(func);
      hashSet.add(number);
      hashSet.add(object);
      hashSet.add(string);

      expect(hashSet.size).toBe(6);
      expect(hashSet.has(array)).toBeTruthy();
      expect(hashSet.has(boolean)).toBeTruthy();
      expect(hashSet.has(func)).toBeTruthy();
      expect(hashSet.has(number)).toBeTruthy();
      expect(hashSet.has(object)).toBeTruthy();
      expect(hashSet.has(string)).toBeTruthy();
    });
  });

  beforeEach(() => {
    hashSet = new HashSet(ITERABLE);
  });

  describe('#size', () => {
    it('should return the number of entries in the hash set', () => {
      expect(hashSet.size).toBe(3);

      hashSet.add('bam');
      expect(hashSet.size).toBe(4);
    });
  });

  describe('#clear', () => {
    it('should clear out the hash set', () => {
      expect(hashSet.size).toBe(3);
      expect(hashSet.has('foo')).toBeTruthy();

      hashSet.clear();
      expect(hashSet.size).toBe(0);
      expect(hashSet.has('foo')).toBeFalsy();
    });
  });

  describe('#has', () => {
    it('should return true if in hash set', () => {
      expect(hashSet.has('foo')).toBeTruthy();
      expect(hashSet.has('bar')).toBeTruthy();
    });

    it('should return true if not in hash set', () => {
      expect(hashSet.has('bam')).toBeFalsy();
    });
  });

  describe('#delete', () => {
    it('should remove value from hash set if present', () => {
      expect(hashSet.size).toBe(3);
      expect(hashSet.has('foo')).toBeTruthy();

      expect(hashSet.delete('foo')).toBeTruthy();
      expect(hashSet.size).toBe(2);
      expect(hashSet.has('foo')).toBeFalsy();
    });

    it('should not remove value from hash set if not present', () => {
      expect(hashSet.size).toBe(3);
      expect(hashSet.has('bam')).toBeFalsy();

      expect(hashSet.delete('bam')).toBeFalsy();
      expect(hashSet.size).toBe(3);
    });
  });

  describe('#values', () => {
    it('should iterate through hash set and yield each value', () => {
      expect([...hashSet.values()]).toEqual(ITERABLE);
    });
  });

  describe('#entries', () => {
    it('should iterate through hash set and yield each entry', () => {
      expect([...hashSet.entries()]).toEqual([['foo', 'foo'], ['bar', 'bar'], ['baz', 'baz']]);
    });
  });

  describe('#[Symbol.iterator]', () => {
    it('should iterate through hash set and yield each value', () => {
      expect([...hashSet]).toEqual(ITERABLE);
    });
  });
});

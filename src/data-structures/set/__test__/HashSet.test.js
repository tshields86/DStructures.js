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
      expect(hashSet.has('foo')).toBe(true);
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
      expect(hashSet.has(array)).toBe(true);
      expect(hashSet.has(boolean)).toBe(true);
      expect(hashSet.has(func)).toBe(true);
      expect(hashSet.has(number)).toBe(true);
      expect(hashSet.has(object)).toBe(true);
      expect(hashSet.has(string)).toBe(true);
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
      expect(hashSet.has('foo')).toBe(true);

      hashSet.clear();
      expect(hashSet.size).toBe(0);
      expect(hashSet.has('foo')).toBe(false);
    });
  });

  describe('#has', () => {
    it('should return true if in hash set', () => {
      expect(hashSet.has('foo')).toBe(true);
      expect(hashSet.has('bar')).toBe(true);
    });

    it('should return true if not in hash set', () => {
      expect(hashSet.has('bam')).toBe(false);
    });
  });

  describe('#delete', () => {
    it('should remove value from hash set if present', () => {
      expect(hashSet.size).toBe(3);
      expect(hashSet.has('foo')).toBe(true);

      expect(hashSet.delete('foo')).toBe(true);
      expect(hashSet.size).toBe(2);
      expect(hashSet.has('foo')).toBe(false);
    });

    it('should not remove value from hash set if not present', () => {
      expect(hashSet.size).toBe(3);
      expect(hashSet.has('bam')).toBe(false);

      expect(hashSet.delete('bam')).toBe(false);
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

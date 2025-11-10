const HashMap = require('../HashMap');

const ITERABLE = [['foo', 1], ['bar', 2], ['baz', 3]];

describe('HashMap', () => {
  let hashMap;

  it('should create empty hash map', () => {
    hashMap = new HashMap();
    expect(hashMap.size).toBe(0);
  });

  it('should create hash map from iterable', () => {
    hashMap = new HashMap(ITERABLE);
    expect([...hashMap]).toEqual(ITERABLE);
  });

  describe('#set', () => {
    beforeEach(() => {
      hashMap = new HashMap();
    });

    it('should set the key value pair in the hash map', () => {
      hashMap.set('foo', 'bar');

      expect(hashMap.size).toBe(1);
      expect(hashMap.get('foo')).toBe('bar');
    });

    it('should set the key value pairs of any type', () => {
      const array = [1, 2, 3];
      const boolean = true;
      const func = () => 'foo';
      const number = 10;
      const object = { foo: 'bar' };
      const string = 'foo';

      hashMap.set(array, { bar: 'baz' });
      hashMap.set(boolean, 10);
      hashMap.set(func, true);
      hashMap.set(number, false);
      hashMap.set(object, [4, 5, 6]);
      hashMap.set(string, 'bar');

      expect(hashMap.size).toBe(6);
      expect(hashMap.get(array)).toEqual({ bar: 'baz' });
      expect(hashMap.get(boolean)).toBe(10);
      expect(hashMap.get(func)).toBe(true);
      expect(hashMap.get(number)).toBe(false);
      expect(hashMap.get(object)).toEqual([4, 5, 6]);
      expect(hashMap.get(string)).toBe('bar');
    });
  });

  beforeEach(() => {
    hashMap = new HashMap(ITERABLE);
  });

  describe('#size', () => {
    it('should return the number of entries in the hash map', () => {
      expect(hashMap.size).toBe(3);

      hashMap.set('bam', 4);
      expect(hashMap.size).toBe(4);
    });
  });

  describe('#length', () => {
    it('should return the number of entries in the hash map', () => {
      expect(hashMap.length).toBe(3);

      hashMap.set('bam', 4);
      expect(hashMap.length).toBe(4);
    });
  });

  describe('#reset', () => {
    it('should clear out the hash map', () => {
      expect(hashMap.size).toBe(3);
      expect(hashMap.has('foo')).toBe(true);

      hashMap.reset();
      expect(hashMap.size).toBe(0);
      expect(hashMap.has('foo')).toBe(false);
    });
  });

  describe('#clear', () => {
    it('should clear out the hash map', () => {
      expect(hashMap.size).toBe(3);
      expect(hashMap.has('foo')).toBe(true);

      hashMap.clear();
      expect(hashMap.size).toBe(0);
      expect(hashMap.has('foo')).toBe(false);
    });
  });

  describe('#hash', () => {
    it('should consistently return same number from key', () => {
      expect(hashMap.hash('foo')).toBe(13);
      expect(hashMap.hash(3)).toBe(18);
      expect(hashMap.hash('bar')).toBe(5);
      expect(hashMap.hash(5)).toBe(11);
      expect(hashMap.hash('bam')).toBe(2);
      expect(hashMap.hash(7)).toBe(16);
      expect(hashMap.hash('foo')).toBe(13);
      expect(hashMap.hash(3)).toBe(18);
      expect(hashMap.hash('bar')).toBe(5);
      expect(hashMap.hash(5)).toBe(11);
      expect(hashMap.hash('bam')).toBe(2);
      expect(hashMap.hash(7)).toBe(16);
    });
  });

  describe('#getEntry', () => {
    it('should return the bucket and entry if set', () => {
      expect(hashMap.getEntry('foo').bucket).toBeDefined();
      expect(hashMap.getEntry('foo').entry.value).toBe(1);
    });

    it('should return the bucket and undefined if not set', () => {
      expect(hashMap.getEntry('bam').bucket).toBeDefined();
      expect(hashMap.getEntry('bam').entry).toBeUndefined();
    });
  });

  describe('#has', () => {
    it('should return true if set', () => {
      expect(hashMap.has('foo')).toBe(true);
      expect(hashMap.has('bar')).toBe(true);
    });

    it('should return true if not set', () => {
      expect(hashMap.has('bam')).toBe(false);
    });
  });

  describe('#delete', () => {
    it('should remove entry from hash map if set', () => {
      expect(hashMap.size).toBe(3);
      expect(hashMap.has('foo')).toBe(true);

      expect(hashMap.delete('foo')).toBe(true);
      expect(hashMap.size).toBe(2);
      expect(hashMap.has('foo')).toBe(false);
    });

    it('should not remove entry from hash map if not set', () => {
      expect(hashMap.size).toBe(3);
      expect(hashMap.has('bam')).toBe(false);

      expect(hashMap.delete('bam')).toBe(false);
      expect(hashMap.size).toBe(3);
    });
  });

  describe('#getLoadFactor', () => {
    it('should get the load factor of the hash map', () => {
      expect(hashMap.getLoadFactor()).toBe(0.15789473684210525);
      hashMap.set('bam', 4);
    });

    it('should increase as entries are added to hash map', () => {
      expect(hashMap.getLoadFactor()).toBe(0.15789473684210525);
      hashMap.set('bam', 4);
      expect(hashMap.getLoadFactor()).toBe(0.21052631578947367);
    });
  });

  describe('#isBeyondloadFactor', () => {
    it('should return false if below the load factor', () => {
      expect(hashMap.isBeyondloadFactor()).toBe(false);
    });

    it('should return true if above the load factor', () => {
      /* Manually set loadfactor for testing */
      hashMap.loadFactor = 0.1;
      expect(hashMap.isBeyondloadFactor()).toBe(true);
    });
  });

  describe('#rehash', () => {
    it('should not rehash while below the load factor', () => {
      expect(hashMap.getLoadFactor()).toBe(0.15789473684210525);
      for (let i = 0; i <= 10; i++) {
        hashMap.set(i, i * 2);
      }
      expect(hashMap.getLoadFactor()).toBe(0.7368421052631579);
    });

    it('should rehash when above the load factor', () => {
      expect(hashMap.getLoadFactor()).toBe(0.15789473684210525);
      for (let i = 0; i <= 10; i++) {
        hashMap.set(i, i * 2);
      }
      expect(hashMap.getLoadFactor()).toBe(0.7368421052631579);

      hashMap.set('bam', 4);
      expect(hashMap.getLoadFactor()).toBe(0.36585365853658536);
    });
  });

  describe('#keys', () => {
    it('should iterate through hash map and yield each key', () => {
      expect([...hashMap.keys()]).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('#values', () => {
    it('should iterate through hash map and yield each value', () => {
      expect([...hashMap.values()]).toEqual([1, 2, 3]);
    });
  });

  describe('#entries', () => {
    it('should iterate through hash map and yield each entry', () => {
      expect([...hashMap.entries()]).toEqual(ITERABLE);
    });
  });

  describe('#[Symbol.iterator]', () => {
    it('should iterate through hash map and yield each entry', () => {
      expect([...hashMap]).toEqual(ITERABLE);
    });
  });
});

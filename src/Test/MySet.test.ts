import { MySet } from '../DataStructures/MySet';

describe('MySet', () => {
  let set: MySet<number>;

  beforeEach(() => {
    set = new MySet<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty set', () => {
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);
      expect(set.getCapacity()).toBe(Infinity);
    });

    test('should create set with custom capacity', () => {
      const limitedSet = new MySet<number>(3);
      expect(limitedSet.getCapacity()).toBe(3);
    });
  });

  describe('Add Operations', () => {
    test('should add single element', () => {
      expect(set.add(1)).toBe(true);
      expect(set.size()).toBe(1);
      expect(set.has(1)).toBe(true);
    });

    test('should add multiple elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      expect(set.size()).toBe(3);
      expect(set.toArray()).toEqual([1, 2, 3]);
    });

    test('should not add duplicate elements', () => {
      set.add(1);
      expect(set.add(1)).toBe(false);
      expect(set.size()).toBe(1);
    });

    test('should handle add to full set', () => {
      const limitedSet = new MySet<number>(2);
      limitedSet.add(1);
      limitedSet.add(2);
      expect(limitedSet.add(3)).toBe(false);
      expect(limitedSet.size()).toBe(2);
    });
  });

  describe('Delete Operations', () => {
    test('should delete existing element', () => {
      set.add(1);
      expect(set.delete(1)).toBe(true);
      expect(set.size()).toBe(0);
      expect(set.has(1)).toBe(false);
    });

    test('should return false for non-existent element', () => {
      expect(set.delete(1)).toBe(false);
    });

    test('should handle delete from empty set', () => {
      expect(set.delete(1)).toBe(false);
    });
  });

  describe('Contains Operations', () => {
    test('should check if element exists', () => {
      set.add(1);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(false);
    });

    test('should handle contains on empty set', () => {
      expect(set.has(1)).toBe(false);
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(set.size()).toBe(0);
      set.add(1);
      expect(set.size()).toBe(1);
      set.add(2);
      expect(set.size()).toBe(2);
    });

    test('should check if empty', () => {
      expect(set.isEmpty()).toBe(true);
      set.add(1);
      expect(set.isEmpty()).toBe(false);
    });

    test('should check if full', () => {
      const limitedSet = new MySet<number>(2);
      expect(limitedSet.isFull()).toBe(false);
      limitedSet.add(1);
      limitedSet.add(2);
      expect(limitedSet.isFull()).toBe(true);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all elements', () => {
      set.add(1);
      set.add(2);
      set.clear();
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);
    });

    test('should handle clear on empty set', () => {
      set.clear();
      expect(set.isEmpty()).toBe(true);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      expect(set.toArray()).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty set', () => {
      expect(set.toArray()).toEqual([]);
    });
  });

  describe('Clone Operations', () => {
    test('should clone set correctly', () => {
      set.add(1);
      set.add(2);
      const clonedSet = set.clone();
      expect(clonedSet.size()).toBe(2);
      expect(clonedSet.toArray()).toEqual([1, 2]);
      expect(clonedSet).not.toBe(set);
    });

    test('should clone empty set', () => {
      const clonedSet = set.clone();
      expect(clonedSet.isEmpty()).toBe(true);
    });
  });

  describe('Set Theory Operations', () => {
    test('should perform union operation', () => {
      set.add(1);
      set.add(2);
      const otherSet = new MySet<number>();
      otherSet.add(2);
      otherSet.add(3);
      const unionSet = set.union(otherSet);
      expect(unionSet.toArray()).toEqual([1, 2, 3]);
    });

    test('should perform intersection operation', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const otherSet = new MySet<number>();
      otherSet.add(2);
      otherSet.add(3);
      otherSet.add(4);
      const intersectionSet = set.intersection(otherSet);
      expect(intersectionSet.toArray()).toEqual([2, 3]);
    });

    test('should perform difference operation', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const otherSet = new MySet<number>();
      otherSet.add(2);
      otherSet.add(3);
      const differenceSet = set.difference(otherSet);
      expect(differenceSet.toArray()).toEqual([1]);
    });

    test('should perform symmetric difference operation', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const otherSet = new MySet<number>();
      otherSet.add(2);
      otherSet.add(3);
      otherSet.add(4);
      const symmetricDiffSet = set.symmetricDifference(otherSet);
      expect(symmetricDiffSet.toArray()).toEqual([1, 4]);
    });
  });

  describe('Subset and Superset Operations', () => {
    test('should check if subset', () => {
      set.add(1);
      set.add(2);
      const otherSet = new MySet<number>();
      otherSet.add(1);
      otherSet.add(2);
      otherSet.add(3);
      expect(set.isSubset(otherSet)).toBe(true);
      expect(otherSet.isSubset(set)).toBe(false);
    });

    test('should check if superset', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const otherSet = new MySet<number>();
      otherSet.add(1);
      otherSet.add(2);
      expect(set.isSuperset(otherSet)).toBe(true);
      expect(otherSet.isSuperset(set)).toBe(false);
    });

    test('should check if equal', () => {
      set.add(1);
      set.add(2);
      const otherSet = new MySet<number>();
      otherSet.add(1);
      otherSet.add(2);
      expect(set.equals(otherSet)).toBe(true);
    });

    test('should check if disjoint', () => {
      set.add(1);
      set.add(2);
      const otherSet = new MySet<number>();
      otherSet.add(3);
      otherSet.add(4);
      expect(set.isDisjoint(otherSet)).toBe(true);
    });
  });

  describe('Multiple Operations', () => {
    test('should add multiple elements', () => {
      expect(set.addMultiple([1, 2, 3])).toBe(3);
      expect(set.size()).toBe(3);
      expect(set.toArray()).toEqual([1, 2, 3]);
    });

    test('should delete multiple elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      set.add(4);
      expect(set.deleteMultiple([2, 4])).toBe(2);
      expect(set.size()).toBe(2);
      expect(set.toArray()).toEqual([1, 3]);
    });
  });

  describe('Random and Access Operations', () => {
    test('should get random element', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const random = set.random();
      expect([1, 2, 3]).toContain(random);
    });

    test('should get first and last elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      expect(set.first()).toBe(1);
      expect(set.last()).toBe(3);
    });

    test('should return undefined for empty set', () => {
      expect(set.random()).toBeUndefined();
      expect(set.first()).toBeUndefined();
      expect(set.last()).toBeUndefined();
    });
  });

  describe('Min/Max Operations', () => {
    test('should find minimum element', () => {
      set.add(3);
      set.add(1);
      set.add(2);
      expect(set.min()).toBe(1);
    });

    test('should find maximum element', () => {
      set.add(1);
      set.add(3);
      set.add(2);
      expect(set.max()).toBe(3);
    });

    test('should return undefined for empty set', () => {
      expect(set.min()).toBeUndefined();
      expect(set.max()).toBeUndefined();
    });
  });

  describe('Sort Operations', () => {
    test('should sort set', () => {
      set.add(3);
      set.add(1);
      set.add(2);
      set.sort();
      expect(set.toArray()).toEqual([1, 2, 3]);
    });

    test('should get sorted copy', () => {
      set.add(3);
      set.add(1);
      set.add(2);
      const sorted = set.sorted();
      expect(sorted).toEqual([1, 2, 3]);
      expect(set.toArray()).not.toEqual([1, 2, 3]); // Original should not be sorted
    });
  });

  describe('Functional Operations', () => {
    test('should filter elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      set.add(4);
      const filtered = set.filter(x => x % 2 === 0);
      expect(filtered.toArray()).toEqual([2, 4]);
    });

    test('should map elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const mapped = set.map(x => x * 2);
      expect(mapped.toArray()).toEqual([2, 4, 6]);
    });

    test('should reduce elements', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      const sum = set.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(6);
    });

    test('should check if all elements satisfy condition', () => {
      set.add(2);
      set.add(4);
      set.add(6);
      expect(set.every(x => x % 2 === 0)).toBe(true);
      expect(set.every(x => x > 3)).toBe(false);
    });

    test('should check if any element satisfies condition', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      expect(set.some(x => x > 2)).toBe(true);
      expect(set.some(x => x > 5)).toBe(false);
    });
  });

  describe('Index Operations', () => {
    test('should get element at index', () => {
      set.add(1);
      set.add(2);
      set.add(3);
      expect(set.getAt(0)).toBe(1);
      expect(set.getAt(1)).toBe(2);
      expect(set.getAt(2)).toBe(3);
    });

    test('should return undefined for invalid index', () => {
      expect(set.getAt(0)).toBeUndefined();
    });
  });

  describe('Print Operations', () => {
    test('should print set correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      set.add(1);
      set.add(2);
      set.print();
      expect(consoleSpy).toHaveBeenCalledWith('Set:', '1, 2');
      consoleSpy.mockRestore();
    });

    test('should print empty set', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      set.print();
      expect(consoleSpy).toHaveBeenCalledWith('Set: {} (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single element operations', () => {
      set.add(1);
      expect(set.delete(1)).toBe(true);
      expect(set.isEmpty()).toBe(true);
    });

    test('should handle duplicate elements', () => {
      set.add(1);
      expect(set.add(1)).toBe(false);
      expect(set.size()).toBe(1);
    });

    test('should handle capacity limits', () => {
      const limitedSet = new MySet<number>(1);
      limitedSet.add(1);
      expect(limitedSet.add(2)).toBe(false);
      expect(limitedSet.size()).toBe(1);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      set.add(1);
      set.add(2);
      set.delete(1);
      set.add(3);
      set.add(1);
      expect(set.toArray()).toEqual([2, 3, 1]);
    });

    test('should handle large number of operations', () => {
      for (let i = 0; i < 100; i++) {
        set.add(i);
      }
      expect(set.size()).toBe(100);
      
      for (let i = 0; i < 50; i++) {
        set.delete(i);
      }
      expect(set.size()).toBe(50);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        set.add(i);
      }
      const endTime = Date.now();
      expect(set.size()).toBe(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 
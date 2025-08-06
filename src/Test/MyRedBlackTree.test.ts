import { MyRedBlackTree } from '../DataStructures/MyRedBlackTree';

describe('MyRedBlackTree', () => {
  let rbt: MyRedBlackTree<number>;

  beforeEach(() => {
    rbt = new MyRedBlackTree<number>();
  });

  describe('Basic Operations', () => {
    test('should create an empty Red-Black tree', () => {
      expect(rbt.isEmpty()).toBe(true);
      expect(rbt.getSize()).toBe(0);
    });

    test('should insert elements correctly', () => {
      expect(rbt.insert(5)).toBe(true);
      expect(rbt.insert(3)).toBe(true);
      expect(rbt.insert(7)).toBe(true);
      expect(rbt.getSize()).toBe(3);
      expect(rbt.isEmpty()).toBe(false);
    });

    test('should not insert duplicate elements', () => {
      expect(rbt.insert(5)).toBe(true);
      expect(rbt.insert(5)).toBe(false); // Duplicate not allowed
      expect(rbt.getSize()).toBe(1);
    });

    test('should search elements correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.search(5)).toBe(true);
      expect(rbt.search(3)).toBe(true);
      expect(rbt.search(7)).toBe(true);
      expect(rbt.search(10)).toBe(false);
    });

    test('should find min and max correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(9);
      
      expect(rbt.findMin()).toBe(1);
      expect(rbt.findMax()).toBe(9);
    });

    test('should return null for min/max on empty tree', () => {
      expect(rbt.findMin()).toBe(null);
      expect(rbt.findMax()).toBe(null);
    });
  });

  describe('Red-Black Tree Properties', () => {
    test('should maintain Red-Black properties after insertions', () => {
      rbt.insert(10);
      rbt.insert(20);
      rbt.insert(30);
      rbt.insert(40);
      rbt.insert(50);
      
      expect(rbt.isValidRedBlack()).toBe(true);
      expect(rbt.isBalanced()).toBe(true);
    });

    test('should have root as black', () => {
      rbt.insert(5);
      expect(rbt.getNodeColor(5)).toBe('BLACK');
    });

    test('should not have red-red violations', () => {
      rbt.insert(10);
      rbt.insert(20);
      rbt.insert(30);
      
      // Check that no red node has red children
      const allValues = rbt.inorder();
      for (const value of allValues) {
        if (rbt.isRed(value)) {
          const children = rbt.getChildren(value);
          for (const child of children) {
            expect(rbt.isRed(child)).toBe(false);
          }
        }
      }
    });

    test('should maintain black height property', () => {
      rbt.insert(10);
      rbt.insert(20);
      rbt.insert(30);
      rbt.insert(40);
      rbt.insert(50);
      
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should handle complex insertion sequence', () => {
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      
      for (const value of values) {
        rbt.insert(value);
        expect(rbt.isValidRedBlack()).toBe(true);
      }
      
      expect(rbt.getSize()).toBe(15);
    });
  });

  describe('Removal Operations', () => {
    test('should remove leaf nodes and maintain properties', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.remove(3)).toBe(true);
      expect(rbt.search(3)).toBe(false);
      expect(rbt.getSize()).toBe(2);
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should remove nodes with one child and maintain properties', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      
      expect(rbt.remove(3)).toBe(true);
      expect(rbt.search(3)).toBe(false);
      expect(rbt.search(1)).toBe(true);
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should remove nodes with two children and maintain properties', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(4);
      
      expect(rbt.remove(3)).toBe(true);
      expect(rbt.search(3)).toBe(false);
      expect(rbt.search(1)).toBe(true);
      expect(rbt.search(4)).toBe(true);
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should remove root node and maintain properties', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.remove(5)).toBe(true);
      expect(rbt.search(5)).toBe(false);
      expect(rbt.search(3)).toBe(true);
      expect(rbt.search(7)).toBe(true);
      expect(rbt.isValidRedBlack()).toBe(true);
    });
  });

  describe('Traversal Operations', () => {
    beforeEach(() => {
      // Create a Red-Black tree:    5
      //                             / \
      //                            3   7
      //                           / \
      //                          1   4
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(4);
    });

    test('should perform inorder traversal (sorted order)', () => {
      expect(rbt.inorder()).toEqual([1, 3, 4, 5, 7]);
    });

    test('should perform preorder traversal', () => {
      expect(rbt.preorder()).toEqual([5, 3, 1, 4, 7]);
    });

    test('should perform postorder traversal', () => {
      expect(rbt.postorder()).toEqual([1, 4, 3, 7, 5]);
    });

    test('should perform level order traversal', () => {
      expect(rbt.levelOrder()).toEqual([5, 3, 7, 1, 4]);
    });
  });

  describe('Tree Analysis', () => {
    test('should calculate height correctly', () => {
      expect(rbt.getHeight()).toBe(-1); // Empty tree
      
      rbt.insert(5);
      expect(rbt.getHeight()).toBe(0); // Single node
      
      rbt.insert(3);
      expect(rbt.getHeight()).toBe(1); // Two levels
      
      rbt.insert(7);
      expect(rbt.getHeight()).toBe(1); // Still two levels (balanced)
      
      rbt.insert(1);
      expect(rbt.getHeight()).toBe(2); // Three levels
    });

    test('should calculate depth correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      
      expect(rbt.getDepth(5)).toBe(0);
      expect(rbt.getDepth(3)).toBe(1);
      expect(rbt.getDepth(7)).toBe(1);
      expect(rbt.getDepth(1)).toBe(2);
      expect(rbt.getDepth(10)).toBe(-1); // Not found
    });

    test('should count leaves correctly', () => {
      expect(rbt.getLeafCount()).toBe(0); // Empty tree
      
      rbt.insert(5);
      expect(rbt.getLeafCount()).toBe(1); // Single node
      
      rbt.insert(3);
      expect(rbt.getLeafCount()).toBe(1); // One leaf
      
      rbt.insert(7);
      expect(rbt.getLeafCount()).toBe(2); // Two leaves
    });

    test('should count internal nodes correctly', () => {
      expect(rbt.getInternalNodeCount()).toBe(0); // Empty tree
      
      rbt.insert(5);
      expect(rbt.getInternalNodeCount()).toBe(0); // Single node is leaf
      
      rbt.insert(3);
      expect(rbt.getInternalNodeCount()).toBe(1); // Root is internal
      
      rbt.insert(7);
      expect(rbt.getInternalNodeCount()).toBe(1); // Root is internal, others are leaves
    });
  });

  describe('Red-Black Specific Features', () => {
    test('should get node color correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.getNodeColor(5)).toBe('BLACK'); // Root is black
      expect(rbt.getNodeColor(3)).toBe('RED');
      expect(rbt.getNodeColor(7)).toBe('RED');
    });

    test('should check if node is red', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.isRed(5)).toBe(false); // Root is black
      expect(rbt.isRed(3)).toBe(true);
      expect(rbt.isRed(7)).toBe(true);
    });

    test('should check if node is black', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.isBlack(5)).toBe(true); // Root is black
      expect(rbt.isBlack(3)).toBe(false);
      expect(rbt.isBlack(7)).toBe(false);
    });

    test('should get parent correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.getParent(5)).toBeUndefined(); // Root has no parent
      expect(rbt.getParent(3)).toBe(5);
      expect(rbt.getParent(7)).toBe(5);
    });

    test('should get sibling correctly', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.getSibling(3)).toBe(7);
      expect(rbt.getSibling(7)).toBe(3);
      expect(rbt.getSibling(5)).toBe(null); // Root has no sibling
    });

    test('should get uncle correctly', () => {
      rbt.insert(10);
      rbt.insert(5);
      rbt.insert(15);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.getUncle(3)).toBe(15);
      expect(rbt.getUncle(7)).toBe(15);
      expect(rbt.getUncle(5)).toBe(null); // No uncle
    });
  });

  describe('Successor and Predecessor', () => {
    beforeEach(() => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(4);
      rbt.insert(6);
      rbt.insert(9);
    });

    test('should find successor correctly', () => {
      expect(rbt.getSuccessor(1)).toBe(3);
      expect(rbt.getSuccessor(3)).toBe(4);
      expect(rbt.getSuccessor(4)).toBe(5);
      expect(rbt.getSuccessor(5)).toBe(6);
      expect(rbt.getSuccessor(6)).toBe(7);
      expect(rbt.getSuccessor(7)).toBe(9);
      expect(rbt.getSuccessor(9)).toBe(null); // No successor
    });

    test('should find predecessor correctly', () => {
      expect(rbt.getPredecessor(1)).toBe(null); // No predecessor
      expect(rbt.getPredecessor(3)).toBe(1);
      expect(rbt.getPredecessor(4)).toBe(3);
      expect(rbt.getPredecessor(5)).toBe(4);
      expect(rbt.getPredecessor(6)).toBe(5);
      expect(rbt.getPredecessor(7)).toBe(6);
      expect(rbt.getPredecessor(9)).toBe(7);
    });
  });

  describe('Node Relationships', () => {
    beforeEach(() => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(4);
    });

    test('should get node degree correctly', () => {
      expect(rbt.getNodeDegree(5)).toBe(2); // Root has 2 children
      expect(rbt.getNodeDegree(3)).toBe(2); // Has 2 children
      expect(rbt.getNodeDegree(1)).toBe(0); // Leaf node
      expect(rbt.getNodeDegree(10)).toBe(-1); // Not found
    });

    test('should check if node is leaf', () => {
      expect(rbt.isLeaf(1)).toBe(true);
      expect(rbt.isLeaf(4)).toBe(true);
      expect(rbt.isLeaf(3)).toBe(false);
      expect(rbt.isLeaf(5)).toBe(false);
      expect(rbt.isLeaf(10)).toBe(false); // Not found
    });

    test('should get children correctly', () => {
      expect(rbt.getChildren(5)).toEqual([3, 7]);
      expect(rbt.getChildren(3)).toEqual([1, 4]);
      expect(rbt.getChildren(1)).toEqual([]);
      expect(rbt.getChildren(10)).toEqual([]); // Not found
    });
  });

  describe('Utility Operations', () => {
    test('should clear the tree', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      rbt.clear();
      expect(rbt.isEmpty()).toBe(true);
      expect(rbt.getSize()).toBe(0);
    });

    test('should clone the tree', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      const cloned = rbt.clone();
      expect(cloned.getSize()).toBe(3);
      expect(cloned.inorder()).toEqual([3, 5, 7]);
      
      // Modifying original shouldn't affect clone
      rbt.remove(3);
      expect(cloned.search(3)).toBe(true);
    });

    test('should convert to array', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      
      expect(rbt.toArray()).toEqual([3, 5, 7]);
    });

    test('should get nodes at specific levels', () => {
      rbt.insert(5);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(1);
      rbt.insert(4);
      
      expect(rbt.getNodesAtLevel(0)).toEqual([5]);
      expect(rbt.getNodesAtLevel(1)).toEqual([3, 7]);
      expect(rbt.getNodesAtLevel(2)).toEqual([1, 4]);
      expect(rbt.getNodesAtLevel(3)).toEqual([]);
    });
  });

  describe('Complex Red-Black Scenarios', () => {
    test('should handle left-heavy tree rebalancing', () => {
      // Create a left-heavy tree that needs rebalancing
      rbt.insert(30);
      rbt.insert(20);
      rbt.insert(10);
      
      expect(rbt.isValidRedBlack()).toBe(true);
      expect(rbt.isBalanced()).toBe(true);
    });

    test('should handle right-heavy tree rebalancing', () => {
      // Create a right-heavy tree that needs rebalancing
      rbt.insert(10);
      rbt.insert(20);
      rbt.insert(30);
      
      expect(rbt.isValidRedBlack()).toBe(true);
      expect(rbt.isBalanced()).toBe(true);
    });

    test('should handle complex insertion sequence', () => {
      // Insert elements in a way that triggers multiple color changes and rotations
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      
      for (const value of values) {
        rbt.insert(value);
        expect(rbt.isValidRedBlack()).toBe(true);
      }
      
      // Verify the tree is properly balanced
      expect(rbt.getSize()).toBe(15);
      expect(rbt.getHeight()).toBeLessThanOrEqual(5); // Red-Black tree should be height-balanced
    });

    test('should maintain properties after deletions', () => {
      // Create a complex tree
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      for (const value of values) {
        rbt.insert(value);
      }
      
      // Remove elements and check properties
      const toRemove = [20, 40, 60, 80];
      for (const value of toRemove) {
        rbt.remove(value);
        expect(rbt.isValidRedBlack()).toBe(true);
        expect(rbt.isBalanced()).toBe(true);
      }
      
      expect(rbt.getSize()).toBe(11);
    });

    test('should handle edge cases with single nodes', () => {
      rbt.insert(5);
      expect(rbt.isValidRedBlack()).toBe(true);
      expect(rbt.getNodeColor(5)).toBe('BLACK'); // Root must be black
      
      rbt.remove(5);
      expect(rbt.isEmpty()).toBe(true);
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should handle color violations during insertion', () => {
      // This sequence should trigger color fixes
      rbt.insert(10);
      rbt.insert(5);
      rbt.insert(15);
      rbt.insert(3);
      rbt.insert(7);
      rbt.insert(12);
      rbt.insert(17);
      
      expect(rbt.isValidRedBlack()).toBe(true);
      
      // Check that no red node has red children
      const allValues = rbt.inorder();
      for (const value of allValues) {
        if (rbt.isRed(value)) {
          const children = rbt.getChildren(value);
          for (const child of children) {
            expect(rbt.isRed(child)).toBe(false);
          }
        }
      }
    });
  });

  describe('Red-Black Tree Validation', () => {
    test('should validate empty tree', () => {
      expect(rbt.isValidRedBlack()).toBe(true);
    });

    test('should validate single node tree', () => {
      rbt.insert(5);
      expect(rbt.isValidRedBlack()).toBe(true);
      expect(rbt.getNodeColor(5)).toBe('BLACK');
    });

    test('should validate complex tree structure', () => {
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      for (const value of values) {
        rbt.insert(value);
      }
      
      expect(rbt.isValidRedBlack()).toBe(true);
      
      // Verify all Red-Black properties
      expect(rbt.getNodeColor(rbt.findMin()!)).toBeDefined(); // Root exists and has color
      
      // Check that all paths have same black height
      const allValues = rbt.inorder();
      let blackHeight = -1;
      
      for (const value of allValues) {
        if (rbt.isLeaf(value)) {
          let current: number | undefined = value;
          let pathBlackCount = 0;
          
          while (current !== undefined) {
            if (rbt.isBlack(current)) {
              pathBlackCount++;
            }
            current = rbt.getParent(current);
          }
          
          if (blackHeight === -1) {
            blackHeight = pathBlackCount;
          } else {
            expect(pathBlackCount).toBe(blackHeight);
          }
        }
      }
    });
  });
}); 
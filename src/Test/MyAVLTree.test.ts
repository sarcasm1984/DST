import { MyAVLTree } from '../DataStructures/MyAVLTree';

describe('MyAVLTree', () => {
  let avl: MyAVLTree<number>;

  beforeEach(() => {
    avl = new MyAVLTree<number>();
  });

  describe('Basic Operations', () => {
    test('should create an empty AVL tree', () => {
      expect(avl.isEmpty()).toBe(true);
      expect(avl.getSize()).toBe(0);
    });

    test('should insert elements correctly', () => {
      expect(avl.insert(5)).toBe(true);
      expect(avl.insert(3)).toBe(true);
      expect(avl.insert(7)).toBe(true);
      expect(avl.getSize()).toBe(3);
      expect(avl.isEmpty()).toBe(false);
    });

    test('should not insert duplicate elements', () => {
      expect(avl.insert(5)).toBe(true);
      expect(avl.insert(5)).toBe(true); // Returns true but doesn't add duplicate
      expect(avl.getSize()).toBe(1);
    });

    test('should search elements correctly', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.search(5)).toBe(true);
      expect(avl.search(3)).toBe(true);
      expect(avl.search(7)).toBe(true);
      expect(avl.search(10)).toBe(false);
    });

    test('should find min and max correctly', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(9);
      
      expect(avl.findMin()).toBe(1);
      expect(avl.findMax()).toBe(9);
    });

    test('should return null for min/max on empty tree', () => {
      expect(avl.findMin()).toBe(null);
      expect(avl.findMax()).toBe(null);
    });
  });

  describe('Self-Balancing Operations', () => {
    test('should maintain balance after insertions', () => {
      // Insert elements that would cause imbalance in regular BST
      avl.insert(10);
      avl.insert(20);
      avl.insert(30);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.isValidAVL()).toBe(true);
    });

    test('should perform left rotation correctly', () => {
      // This sequence should trigger a left rotation
      avl.insert(10);
      avl.insert(20);
      avl.insert(30);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.inorder()).toEqual([10, 20, 30]);
    });

    test('should perform right rotation correctly', () => {
      // This sequence should trigger a right rotation
      avl.insert(30);
      avl.insert(20);
      avl.insert(10);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.inorder()).toEqual([10, 20, 30]);
    });

    test('should perform left-right rotation correctly', () => {
      // This sequence should trigger a left-right rotation
      avl.insert(30);
      avl.insert(10);
      avl.insert(20);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.isValidAVL()).toBe(true);
    });

    test('should perform right-left rotation correctly', () => {
      // This sequence should trigger a right-left rotation
      avl.insert(10);
      avl.insert(30);
      avl.insert(20);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.isValidAVL()).toBe(true);
    });

    test('should maintain balance with complex insertions', () => {
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      
      for (const value of values) {
        avl.insert(value);
        expect(avl.isBalanced()).toBe(true);
        expect(avl.isValidAVL()).toBe(true);
      }
      
      expect(avl.getSize()).toBe(15);
    });
  });

  describe('Removal Operations', () => {
    test('should remove leaf nodes and maintain balance', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.remove(3)).toBe(true);
      expect(avl.search(3)).toBe(false);
      expect(avl.getSize()).toBe(2);
      expect(avl.isBalanced()).toBe(true);
    });

    test('should remove nodes with one child and maintain balance', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      
      expect(avl.remove(3)).toBe(true);
      expect(avl.search(3)).toBe(false);
      expect(avl.search(1)).toBe(true);
      expect(avl.isBalanced()).toBe(true);
    });

    test('should remove nodes with two children and maintain balance', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(4);
      
      expect(avl.remove(3)).toBe(true);
      expect(avl.search(3)).toBe(false);
      expect(avl.search(1)).toBe(true);
      expect(avl.search(4)).toBe(true);
      expect(avl.isBalanced()).toBe(true);
    });

    test('should remove root node and maintain balance', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.remove(5)).toBe(true);
      expect(avl.search(5)).toBe(false);
      expect(avl.search(3)).toBe(true);
      expect(avl.search(7)).toBe(true);
      expect(avl.isBalanced()).toBe(true);
    });
  });

  describe('Traversal Operations', () => {
    beforeEach(() => {
      // Create an AVL tree:    5
      //                       / \
      //                      3   7
      //                     / \
      //                    1   4
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(4);
    });

    test('should perform inorder traversal (sorted order)', () => {
      expect(avl.inorder()).toEqual([1, 3, 4, 5, 7]);
    });

    test('should perform preorder traversal', () => {
      expect(avl.preorder()).toEqual([5, 3, 1, 4, 7]);
    });

    test('should perform postorder traversal', () => {
      expect(avl.postorder()).toEqual([1, 4, 3, 7, 5]);
    });

    test('should perform level order traversal', () => {
      expect(avl.levelOrder()).toEqual([5, 3, 7, 1, 4]);
    });
  });

  describe('Tree Analysis', () => {
    test('should calculate height correctly', () => {
      expect(avl.getHeight()).toBe(-1); // Empty tree
      
      avl.insert(5);
      expect(avl.getHeight()).toBe(0); // Single node
      
      avl.insert(3);
      expect(avl.getHeight()).toBe(1); // Two levels
      
      avl.insert(7);
      expect(avl.getHeight()).toBe(1); // Still two levels (balanced)
      
      avl.insert(1);
      expect(avl.getHeight()).toBe(2); // Three levels
    });

    test('should calculate depth correctly', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      
      expect(avl.getDepth(5)).toBe(0);
      expect(avl.getDepth(3)).toBe(1);
      expect(avl.getDepth(7)).toBe(1);
      expect(avl.getDepth(1)).toBe(2);
      expect(avl.getDepth(10)).toBe(-1); // Not found
    });

    test('should count leaves correctly', () => {
      expect(avl.getLeafCount()).toBe(0); // Empty tree
      
      avl.insert(5);
      expect(avl.getLeafCount()).toBe(1); // Single node
      
      avl.insert(3);
      expect(avl.getLeafCount()).toBe(1); // One leaf
      
      avl.insert(7);
      expect(avl.getLeafCount()).toBe(2); // Two leaves
    });

    test('should count internal nodes correctly', () => {
      expect(avl.getInternalNodeCount()).toBe(0); // Empty tree
      
      avl.insert(5);
      expect(avl.getInternalNodeCount()).toBe(0); // Single node is leaf
      
      avl.insert(3);
      expect(avl.getInternalNodeCount()).toBe(1); // Root is internal
      
      avl.insert(7);
      expect(avl.getInternalNodeCount()).toBe(1); // Root is internal, others are leaves
    });
  });

  describe('AVL Properties', () => {
    test('should always be balanced', () => {
      expect(avl.isBalanced()).toBe(true); // Empty tree is balanced
      
      avl.insert(5);
      expect(avl.isBalanced()).toBe(true);
      
      avl.insert(3);
      avl.insert(7);
      expect(avl.isBalanced()).toBe(true);
      
      // Insert more elements that would cause imbalance in regular BST
      avl.insert(1);
      avl.insert(9);
      avl.insert(0);
      avl.insert(10);
      
      expect(avl.isBalanced()).toBe(true);
    });

    test('should validate AVL properties', () => {
      expect(avl.isValidAVL()).toBe(true); // Empty tree is valid
      
      avl.insert(5);
      expect(avl.isValidAVL()).toBe(true);
      
      avl.insert(3);
      avl.insert(7);
      expect(avl.isValidAVL()).toBe(true);
    });

    test('should maintain balance factor constraints', () => {
      avl.insert(10);
      avl.insert(20);
      avl.insert(30);
      avl.insert(40);
      avl.insert(50);
      
      // Check that no node has balance factor > 1 or < -1
      const allValues = avl.inorder();
      for (const value of allValues) {
        const balanceFactor = avl.getNodeBalanceFactor(value);
        expect(balanceFactor).toBeGreaterThanOrEqual(-1);
        expect(balanceFactor).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('Successor and Predecessor', () => {
    beforeEach(() => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(4);
      avl.insert(6);
      avl.insert(9);
    });

    test('should find successor correctly', () => {
      expect(avl.getSuccessor(1)).toBe(3);
      expect(avl.getSuccessor(3)).toBe(4);
      expect(avl.getSuccessor(4)).toBe(5);
      expect(avl.getSuccessor(5)).toBe(6);
      expect(avl.getSuccessor(6)).toBe(7);
      expect(avl.getSuccessor(7)).toBe(9);
      expect(avl.getSuccessor(9)).toBe(null); // No successor
    });

    test('should find predecessor correctly', () => {
      expect(avl.getPredecessor(1)).toBe(null); // No predecessor
      expect(avl.getPredecessor(3)).toBe(1);
      expect(avl.getPredecessor(4)).toBe(3);
      expect(avl.getPredecessor(5)).toBe(4);
      expect(avl.getPredecessor(6)).toBe(5);
      expect(avl.getPredecessor(7)).toBe(6);
      expect(avl.getPredecessor(9)).toBe(7);
    });
  });

  describe('Node Relationships', () => {
    beforeEach(() => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(4);
    });

    test('should get node degree correctly', () => {
      expect(avl.getNodeDegree(5)).toBe(2); // Root has 2 children
      expect(avl.getNodeDegree(3)).toBe(2); // Has 2 children
      expect(avl.getNodeDegree(1)).toBe(0); // Leaf node
      expect(avl.getNodeDegree(10)).toBe(-1); // Not found
    });

    test('should check if node is leaf', () => {
      expect(avl.isLeaf(1)).toBe(true);
      expect(avl.isLeaf(4)).toBe(true);
      expect(avl.isLeaf(3)).toBe(false);
      expect(avl.isLeaf(5)).toBe(false);
      expect(avl.isLeaf(10)).toBe(false); // Not found
    });

    test('should get children correctly', () => {
      expect(avl.getChildren(5)).toEqual([3, 7]);
      expect(avl.getChildren(3)).toEqual([1, 4]);
      expect(avl.getChildren(1)).toEqual([]);
      expect(avl.getChildren(10)).toEqual([]); // Not found
    });

    test('should get parent correctly', () => {
      expect(avl.getParent(5)).toBeUndefined(); // Root has no parent
      expect(avl.getParent(3)).toBe(5);
      expect(avl.getParent(7)).toBe(5);
      expect(avl.getParent(1)).toBe(3);
      expect(avl.getParent(4)).toBe(3);
    });
  });

  describe('AVL-Specific Features', () => {
    test('should get node height correctly', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.getNodeHeight(5)).toBe(2); // Root height
      expect(avl.getNodeHeight(3)).toBe(1); // Child height
      expect(avl.getNodeHeight(7)).toBe(1); // Child height
    });

    test('should get node balance factor correctly', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.getNodeBalanceFactor(5)).toBe(0); // Balanced
      expect(avl.getNodeBalanceFactor(3)).toBe(0); // Leaf
      expect(avl.getNodeBalanceFactor(7)).toBe(0); // Leaf
    });

    test('should maintain height information correctly', () => {
      avl.insert(10);
      avl.insert(20);
      avl.insert(30);
      
      // After left rotation, heights should be updated
      expect(avl.getNodeHeight(20)).toBe(2); // New root
      expect(avl.getNodeHeight(10)).toBe(1); // Left child
      expect(avl.getNodeHeight(30)).toBe(1); // Right child
    });
  });

  describe('Utility Operations', () => {
    test('should clear the tree', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      avl.clear();
      expect(avl.isEmpty()).toBe(true);
      expect(avl.getSize()).toBe(0);
    });

    test('should clone the tree', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      const cloned = avl.clone();
      expect(cloned.getSize()).toBe(3);
      expect(cloned.inorder()).toEqual([3, 5, 7]);
      
      // Modifying original shouldn't affect clone
      avl.remove(3);
      expect(cloned.search(3)).toBe(true);
    });

    test('should convert to array', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      
      expect(avl.toArray()).toEqual([3, 5, 7]);
    });

    test('should get nodes at specific levels', () => {
      avl.insert(5);
      avl.insert(3);
      avl.insert(7);
      avl.insert(1);
      avl.insert(4);
      
      expect(avl.getNodesAtLevel(0)).toEqual([5]);
      expect(avl.getNodesAtLevel(1)).toEqual([3, 7]);
      expect(avl.getNodesAtLevel(2)).toEqual([1, 4]);
      expect(avl.getNodesAtLevel(3)).toEqual([]);
    });
  });

  describe('Complex Balancing Scenarios', () => {
    test('should handle left-heavy tree rebalancing', () => {
      // Create a left-heavy tree that needs rebalancing
      avl.insert(30);
      avl.insert(20);
      avl.insert(10);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.getNodeBalanceFactor(avl.findMin()!)).toBe(0);
    });

    test('should handle right-heavy tree rebalancing', () => {
      // Create a right-heavy tree that needs rebalancing
      avl.insert(10);
      avl.insert(20);
      avl.insert(30);
      
      expect(avl.isBalanced()).toBe(true);
      expect(avl.getNodeBalanceFactor(avl.findMax()!)).toBe(0);
    });

    test('should handle complex insertion sequence', () => {
      // Insert elements in a way that triggers multiple rotations
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      
      for (const value of values) {
        avl.insert(value);
        expect(avl.isBalanced()).toBe(true);
        expect(avl.isValidAVL()).toBe(true);
      }
      
      // Verify the tree is properly balanced
      expect(avl.getSize()).toBe(15);
      expect(avl.getHeight()).toBeLessThanOrEqual(4); // AVL tree should be height-balanced
    });

    test('should maintain balance after deletions', () => {
      // Create a complex tree
      const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
      for (const value of values) {
        avl.insert(value);
      }
      
      // Remove elements and check balance
      const toRemove = [20, 40, 60, 80];
      for (const value of toRemove) {
        avl.remove(value);
        expect(avl.isBalanced()).toBe(true);
        expect(avl.isValidAVL()).toBe(true);
      }
      
      expect(avl.getSize()).toBe(11);
    });
  });
}); 
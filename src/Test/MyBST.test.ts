import { MyBST } from '../DataStructures/MyBST';

describe('MyBST', () => {
  let bst: MyBST<number>;

  beforeEach(() => {
    bst = new MyBST<number>();
  });

  describe('Basic Operations', () => {
    test('should create an empty BST', () => {
      expect(bst.isEmpty()).toBe(true);
      expect(bst.getSize()).toBe(0);
    });

    test('should insert elements correctly', () => {
      expect(bst.insert(5)).toBe(true);
      expect(bst.insert(3)).toBe(true);
      expect(bst.insert(7)).toBe(true);
      expect(bst.getSize()).toBe(3);
      expect(bst.isEmpty()).toBe(false);
    });

    test('should not insert duplicate elements', () => {
      expect(bst.insert(5)).toBe(true);
      expect(bst.insert(5)).toBe(false);
      expect(bst.getSize()).toBe(1);
    });

    test('should search elements correctly', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      expect(bst.search(5)).toBe(true);
      expect(bst.search(3)).toBe(true);
      expect(bst.search(7)).toBe(true);
      expect(bst.search(10)).toBe(false);
    });

    test('should find min and max correctly', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(9);
      
      expect(bst.findMin()).toBe(1);
      expect(bst.findMax()).toBe(9);
    });

    test('should return null for min/max on empty tree', () => {
      expect(bst.findMin()).toBe(null);
      expect(bst.findMax()).toBe(null);
    });
  });

  describe('Removal Operations', () => {
    test('should remove leaf nodes', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      expect(bst.remove(3)).toBe(true);
      expect(bst.search(3)).toBe(false);
      expect(bst.getSize()).toBe(2);
    });

    test('should remove nodes with one child', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      
      expect(bst.remove(3)).toBe(true);
      expect(bst.search(3)).toBe(false);
      expect(bst.search(1)).toBe(true);
    });

    test('should remove nodes with two children', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      
      expect(bst.remove(3)).toBe(true);
      expect(bst.search(3)).toBe(false);
      expect(bst.search(1)).toBe(true);
      expect(bst.search(4)).toBe(true);
    });

    test('should remove root node', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      expect(bst.remove(5)).toBe(true);
      expect(bst.search(5)).toBe(false);
      expect(bst.search(3)).toBe(true);
      expect(bst.search(7)).toBe(true);
    });
  });

  describe('Traversal Operations', () => {
    beforeEach(() => {
      // Create a BST:    5
      //                 / \
      //                3   7
      //               / \
      //              1   4
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
    });

    test('should perform inorder traversal (sorted order)', () => {
      expect(bst.inorder()).toEqual([1, 3, 4, 5, 7]);
    });

    test('should perform preorder traversal', () => {
      expect(bst.preorder()).toEqual([5, 3, 1, 4, 7]);
    });

    test('should perform postorder traversal', () => {
      expect(bst.postorder()).toEqual([1, 4, 3, 7, 5]);
    });

    test('should perform level order traversal', () => {
      expect(bst.levelOrder()).toEqual([5, 3, 7, 1, 4]);
    });
  });

  describe('Tree Analysis', () => {
    test('should calculate height correctly', () => {
      expect(bst.getHeight()).toBe(-1); // Empty tree
      
      bst.insert(5);
      expect(bst.getHeight()).toBe(0); // Single node
      
      bst.insert(3);
      expect(bst.getHeight()).toBe(1); // Two levels
      
      bst.insert(7);
      expect(bst.getHeight()).toBe(1); // Still two levels
      
      bst.insert(1);
      expect(bst.getHeight()).toBe(2); // Three levels
    });

    test('should calculate depth correctly', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      
      expect(bst.getDepth(5)).toBe(0);
      expect(bst.getDepth(3)).toBe(1);
      expect(bst.getDepth(7)).toBe(1);
      expect(bst.getDepth(1)).toBe(2);
      expect(bst.getDepth(10)).toBe(-1); // Not found
    });

    test('should count leaves correctly', () => {
      expect(bst.getLeafCount()).toBe(0); // Empty tree
      
      bst.insert(5);
      expect(bst.getLeafCount()).toBe(1); // Single node
      
      bst.insert(3);
      expect(bst.getLeafCount()).toBe(1); // One leaf
      
      bst.insert(7);
      expect(bst.getLeafCount()).toBe(2); // Two leaves
    });

    test('should count internal nodes correctly', () => {
      expect(bst.getInternalNodeCount()).toBe(0); // Empty tree
      
      bst.insert(5);
      expect(bst.getInternalNodeCount()).toBe(0); // Single node is leaf
      
      bst.insert(3);
      expect(bst.getInternalNodeCount()).toBe(1); // Root is internal
      
      bst.insert(7);
      expect(bst.getInternalNodeCount()).toBe(1); // Root is internal, others are leaves
    });
  });

  describe('BST Properties', () => {
    test('should validate BST property', () => {
      expect(bst.isValidBST()).toBe(true); // Empty tree is valid
      
      bst.insert(5);
      expect(bst.isValidBST()).toBe(true);
      
      bst.insert(3);
      bst.insert(7);
      expect(bst.isValidBST()).toBe(true);
    });

    test('should check balance correctly', () => {
      expect(bst.isBalanced()).toBe(true); // Empty tree is balanced
      
      bst.insert(5);
      expect(bst.isBalanced()).toBe(true);
      
      bst.insert(3);
      expect(bst.isBalanced()).toBe(true);
      
      bst.insert(7);
      expect(bst.isBalanced()).toBe(true);
      
      bst.insert(1);
      expect(bst.isBalanced()).toBe(true); // Still balanced (AVL property)
      
      // Create an unbalanced tree
      bst.clear();
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(0); // This makes it unbalanced
      expect(bst.isBalanced()).toBe(false); // Now unbalanced
    });
  });

  describe('Successor and Predecessor', () => {
    beforeEach(() => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      bst.insert(6);
      bst.insert(9);
    });

    test('should find successor correctly', () => {
      expect(bst.getSuccessor(1)).toBe(3);
      expect(bst.getSuccessor(3)).toBe(4);
      expect(bst.getSuccessor(4)).toBe(5);
      expect(bst.getSuccessor(5)).toBe(6);
      expect(bst.getSuccessor(6)).toBe(7);
      expect(bst.getSuccessor(7)).toBe(9);
      expect(bst.getSuccessor(9)).toBe(null); // No successor
    });

    test('should find predecessor correctly', () => {
      expect(bst.getPredecessor(1)).toBe(null); // No predecessor
      expect(bst.getPredecessor(3)).toBe(1);
      expect(bst.getPredecessor(4)).toBe(3);
      expect(bst.getPredecessor(5)).toBe(4);
      expect(bst.getPredecessor(6)).toBe(5);
      expect(bst.getPredecessor(7)).toBe(6);
      expect(bst.getPredecessor(9)).toBe(7);
    });
  });

  describe('Node Relationships', () => {
    beforeEach(() => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
    });

    test('should get node degree correctly', () => {
      expect(bst.getNodeDegree(5)).toBe(2); // Root has 2 children
      expect(bst.getNodeDegree(3)).toBe(2); // Has 2 children
      expect(bst.getNodeDegree(1)).toBe(0); // Leaf node
      expect(bst.getNodeDegree(10)).toBe(-1); // Not found
    });

    test('should check if node is leaf', () => {
      expect(bst.isLeaf(1)).toBe(true);
      expect(bst.isLeaf(4)).toBe(true);
      expect(bst.isLeaf(3)).toBe(false);
      expect(bst.isLeaf(5)).toBe(false);
      expect(bst.isLeaf(10)).toBe(false); // Not found
    });

    test('should get children correctly', () => {
      expect(bst.getChildren(5)).toEqual([3, 7]);
      expect(bst.getChildren(3)).toEqual([1, 4]);
      expect(bst.getChildren(1)).toEqual([]);
      expect(bst.getChildren(10)).toEqual([]); // Not found
    });

    test('should get parent correctly', () => {
      expect(bst.getParent(5)).toBeUndefined(); // Root has no parent
      expect(bst.getParent(3)).toBe(5);
      expect(bst.getParent(7)).toBe(5);
      expect(bst.getParent(1)).toBe(3);
      expect(bst.getParent(4)).toBe(3);
    });
  });

  describe('Utility Operations', () => {
    test('should clear the tree', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      bst.clear();
      expect(bst.isEmpty()).toBe(true);
      expect(bst.getSize()).toBe(0);
    });

    test('should clone the tree', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      const cloned = bst.clone();
      expect(cloned.getSize()).toBe(3);
      expect(cloned.inorder()).toEqual([3, 5, 7]);
      
      // Modifying original shouldn't affect clone
      bst.remove(3);
      expect(cloned.search(3)).toBe(true);
    });

    test('should convert to array', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      
      expect(bst.toArray()).toEqual([3, 5, 7]);
    });

    test('should get nodes at specific levels', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      
      expect(bst.getNodesAtLevel(0)).toEqual([5]);
      expect(bst.getNodesAtLevel(1)).toEqual([3, 7]);
      expect(bst.getNodesAtLevel(2)).toEqual([1, 4]);
      expect(bst.getNodesAtLevel(3)).toEqual([]);
    });
  });

  describe('Loop Detection', () => {
    test('should detect no loops in normal BST', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      
      expect(bst.hasLoop()).toBe(false);
      expect(bst.getLoopCount()).toBe(0);
      expect(bst.getLoopData()).toEqual([]);
    });

    test('should detect loops when they exist', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      
      // Create a loop for testing
      const success = bst.createLoopForTesting();
      expect(success).toBe(true);
      
      expect(bst.hasLoop()).toBe(true);
      expect(bst.getLoopCount()).toBeGreaterThan(0);
      expect(bst.getLoopData().length).toBeGreaterThan(0);
    });

    test('should handle empty tree for loop detection', () => {
      expect(bst.hasLoop()).toBe(false);
      expect(bst.getLoopCount()).toBe(0);
      expect(bst.getLoopData()).toEqual([]);
    });

    test('should handle single node for loop detection', () => {
      bst.insert(5);
      
      expect(bst.hasLoop()).toBe(false);
      expect(bst.getLoopCount()).toBe(0);
      expect(bst.getLoopData()).toEqual([]);
    });

    test('should handle two nodes for loop detection', () => {
      bst.insert(5);
      bst.insert(3);
      
      expect(bst.hasLoop()).toBe(false);
      expect(bst.getLoopCount()).toBe(0);
      expect(bst.getLoopData()).toEqual([]);
    });

    test('should not be able to create loop with insufficient nodes', () => {
      bst.insert(5);
      bst.insert(3);
      
      expect(bst.createLoopForTesting()).toBe(false);
      expect(bst.hasLoop()).toBe(false);
    });

    test('should detect loops using both DFS and BFS approaches', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(4);
      
      // Create a loop
      bst.createLoopForTesting();
      
      // Both approaches should detect the loop
      expect(bst.hasLoop()).toBe(true);
      
      // Verify loop data is returned
      const loopData = bst.getLoopData();
      expect(loopData.length).toBeGreaterThan(0);
      expect(loopData).toContainEqual(expect.any(Number));
    });

    test('should handle complex tree structures for loop detection', () => {
      // Create a more complex tree
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(18);
      bst.insert(1);
      bst.insert(4);
      bst.insert(6);
      bst.insert(8);
      
      expect(bst.hasLoop()).toBe(false);
      
      // Create a loop
      bst.createLoopForTesting();
      
      expect(bst.hasLoop()).toBe(true);
      expect(bst.getLoopCount()).toBeGreaterThan(0);
    });
  });
}); 
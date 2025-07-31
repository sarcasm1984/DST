// Binary Search Tree class implementation
// Inspired by MyTree class structure but implemented as standalone BST

// BST Node class for binary search tree
class BSTNode<T> {
  data: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  // Check if this node is a leaf (no children)
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  // Get the number of children
  getChildCount(): number {
    let count = 0;
    if (this.left) count++;
    if (this.right) count++;
    return count;
  }
}

// Binary Search Tree class implementation
export class MyBST<T> {
  private bstRoot: BSTNode<T> | null;
  private bstSize: number;

  constructor() {
    this.bstRoot = null;
    this.bstSize = 0;
  }

  // Insert a new value into the BST
  insert(data: T): boolean {
    if (this.bstRoot === null) {
      this.bstRoot = new BSTNode(data);
      this.bstSize = 1;
      return true;
    }

    return this.insertNode(this.bstRoot, data);
  }

  private insertNode(node: BSTNode<T>, data: T): boolean {
    if (data < node.data) {
      if (node.left === null) {
        node.left = new BSTNode(data);
        this.bstSize++;
        return true;
      } else {
        return this.insertNode(node.left, data);
      }
    } else if (data > node.data) {
      if (node.right === null) {
        node.right = new BSTNode(data);
        this.bstSize++;
        return true;
      } else {
        return this.insertNode(node.right, data);
      }
    } else {
      // Duplicate value - BST doesn't allow duplicates
      return false;
    }
  }

  // Search for a value in the BST
  search(data: T): boolean {
    return this.searchNode(this.bstRoot, data) !== null;
  }

  private searchNode(node: BSTNode<T> | null, data: T): BSTNode<T> | null {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  // Find the minimum value in the BST
  findMin(): T | null {
    if (this.bstRoot === null) return null;
    
    let current = this.bstRoot;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // Find the maximum value in the BST
  findMax(): T | null {
    if (this.bstRoot === null) return null;
    
    let current = this.bstRoot;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // Remove a value from the BST
  remove(data: T): boolean {
    if (this.bstRoot === null) return false;
    
    this.bstRoot = this.removeNode(this.bstRoot, data);
    return true;
  }

  private removeNode(node: BSTNode<T> | null, data: T): BSTNode<T> | null {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      // Node to be deleted found
      this.bstSize--;

      // Case 1: Node is a leaf
      if (node.isLeaf()) {
        return null;
      }
      // Case 2: Node has only one child
      else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // Case 3: Node has two children
      else {
        // Find the inorder successor (smallest value in right subtree)
        const successor = this.findMinNode(node.right);
        node.data = successor!.data;
        node.right = this.removeNode(node.right, successor!.data);
        this.bstSize++; // Compensate for the decrease above
      }
    }

    return node;
  }

  private findMinNode(node: BSTNode<T>): BSTNode<T> | null {
    if (node === null) return null;
    
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Get the size of the BST
  getSize(): number {
    return this.bstSize;
  }

  // Check if the BST is empty
  isEmpty(): boolean {
    return this.bstSize === 0;
  }

  // Clear all nodes from the BST
  clear(): void {
    this.bstRoot = null;
    this.bstSize = 0;
  }

  // Inorder traversal (Left -> Root -> Right) - gives sorted order
  inorder(): T[] {
    const result: T[] = [];
    this.inorderTraversal(this.bstRoot, result);
    return result;
  }

  private inorderTraversal(node: BSTNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.data);
      this.inorderTraversal(node.right, result);
    }
  }

  // Preorder traversal (Root -> Left -> Right)
  preorder(): T[] {
    const result: T[] = [];
    this.preorderTraversal(this.bstRoot, result);
    return result;
  }

  private preorderTraversal(node: BSTNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
  }

  // Postorder traversal (Left -> Right -> Root)
  postorder(): T[] {
    const result: T[] = [];
    this.postorderTraversal(this.bstRoot, result);
    return result;
  }

  private postorderTraversal(node: BSTNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.data);
    }
  }

  // Level order traversal (Breadth-First Search)
  levelOrder(): T[] {
    const result: T[] = [];
    if (this.bstRoot === null) return result;

    const queue: BSTNode<T>[] = [this.bstRoot];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  // Get the height of the BST
  getHeight(): number {
    return this.calculateHeight(this.bstRoot);
  }

  private calculateHeight(node: BSTNode<T> | null): number {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Get the depth of a node
  getDepth(data: T): number {
    return this.calculateDepth(this.bstRoot, data, 0);
  }

  private calculateDepth(node: BSTNode<T> | null, data: T, depth: number): number {
    if (node === null) {
      return -1;
    }

    if (node.data === data) {
      return depth;
    }

    if (data < node.data) {
      return this.calculateDepth(node.left, data, depth + 1);
    } else {
      return this.calculateDepth(node.right, data, depth + 1);
    }
  }

  // Check if the BST is balanced (AVL property)
  isBalanced(): boolean {
    return this.checkBalance(this.bstRoot) !== -1;
  }

  private checkBalance(node: BSTNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.checkBalance(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = this.checkBalance(node.right);
    if (rightHeight === -1) return -1;

    const balanceFactor = Math.abs(leftHeight - rightHeight);
    if (balanceFactor > 1) {
      return -1; // Unbalanced
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Check if the BST is a valid BST
  isValidBST(): boolean {
    return this.validateBST(this.bstRoot);
  }

  private validateBST(node: BSTNode<T> | null, min?: T, max?: T): boolean {
    if (node === null) {
      return true;
    }

    // Check if current node violates BST property
    if (min !== undefined && node.data <= min!) {
      return false;
    }
    if (max !== undefined && node.data >= max!) {
      return false;
    }

    return this.validateBST(node.left, min, node.data) && 
           this.validateBST(node.right, node.data, max);
  }

  // Check if the BST has a loop/cycle
  hasLoop(): boolean {
    if (this.bstRoot === null) {
      return false; // Empty tree has no loops
    }
    
    // Use both DFS and BFS approaches for comprehensive detection
    return this.hasLoopDFS(this.bstRoot) || this.hasLoopBFS(this.bstRoot);
  }

  // DFS approach to detect loops
  private hasLoopDFS(node: BSTNode<T>): boolean {
    const visited = new Set<BSTNode<T>>();
    const recursionStack = new Set<BSTNode<T>>();
    
    return this.detectLoopDFS(node, visited, recursionStack);
  }

  private detectLoopDFS(
    node: BSTNode<T> | null, 
    visited: Set<BSTNode<T>>, 
    recursionStack: Set<BSTNode<T>>
  ): boolean {
    if (node === null) {
      return false;
    }

    // If node is in recursion stack, we have a back edge (loop)
    if (recursionStack.has(node)) {
      return true;
    }

    // If node is already visited and not in recursion stack, no loop
    if (visited.has(node)) {
      return false;
    }

    // Mark node as visited and add to recursion stack
    visited.add(node);
    recursionStack.add(node);

    // Check left and right children
    const leftHasLoop = this.detectLoopDFS(node.left, visited, recursionStack);
    const rightHasLoop = this.detectLoopDFS(node.right, visited, recursionStack);

    // Remove from recursion stack before backtracking
    recursionStack.delete(node);

    return leftHasLoop || rightHasLoop;
  }

  // BFS approach to detect loops
  private hasLoopBFS(node: BSTNode<T>): boolean {
    const visited = new Set<BSTNode<T>>();
    const queue: Array<{ node: BSTNode<T>; parent: BSTNode<T> | null }> = [];
    
    queue.push({ node, parent: null });
    visited.add(node);

    while (queue.length > 0) {
      const { node: current, parent } = queue.shift()!;

      // Check left child
      if (current.left !== null) {
        if (visited.has(current.left)) {
          // If we've seen this node before and it's not the parent, we have a loop
          if (current.left !== parent) {
            return true;
          }
        } else {
          visited.add(current.left);
          queue.push({ node: current.left, parent: current });
        }
      }

      // Check right child
      if (current.right !== null) {
        if (visited.has(current.right)) {
          // If we've seen this node before and it's not the parent, we have a loop
          if (current.right !== parent) {
            return true;
          }
        } else {
          visited.add(current.right);
          queue.push({ node: current.right, parent: current });
        }
      }
    }

    return false;
  }

  // Get all nodes that are part of loops (if any)
  getLoopNodes(): BSTNode<T>[] {
    if (this.bstRoot === null) {
      return [];
    }

    const loopNodes: BSTNode<T>[] = [];
    this.findLoopNodes(this.bstRoot, new Set<BSTNode<T>>(), new Set<BSTNode<T>>(), loopNodes);
    return loopNodes;
  }

  // Get all data values of nodes that are part of loops (if any)
  getLoopData(): T[] {
    const loopNodes = this.getLoopNodes();
    return loopNodes.map(node => node.data);
  }

  private findLoopNodes(
    node: BSTNode<T> | null,
    visited: Set<BSTNode<T>>,
    recursionStack: Set<BSTNode<T>>,
    loopNodes: BSTNode<T>[]
  ): void {
    if (node === null) {
      return;
    }

    // If node is in recursion stack, we found a loop
    if (recursionStack.has(node)) {
      loopNodes.push(node);
      return;
    }

    // If node is already visited, skip
    if (visited.has(node)) {
      return;
    }

    // Mark node as visited and add to recursion stack
    visited.add(node);
    recursionStack.add(node);

    // Check left and right children
    this.findLoopNodes(node.left, visited, recursionStack, loopNodes);
    this.findLoopNodes(node.right, visited, recursionStack, loopNodes);

    // Remove from recursion stack before backtracking
    recursionStack.delete(node);
  }

  // Get the number of loops in the tree
  getLoopCount(): number {
    if (this.bstRoot === null) {
      return 0;
    }

    const visited = new Set<BSTNode<T>>();
    const recursionStack = new Set<BSTNode<T>>();
    const loopCount = { value: 0 };

    this.countLoops(this.bstRoot, visited, recursionStack, loopCount);
    return loopCount.value;
  }

  private countLoops(
    node: BSTNode<T> | null,
    visited: Set<BSTNode<T>>,
    recursionStack: Set<BSTNode<T>>,
    loopCount: { value: number }
  ): void {
    if (node === null) {
      return;
    }

    // If node is in recursion stack, we found a loop
    if (recursionStack.has(node)) {
      loopCount.value++;
      return;
    }

    // If node is already visited, skip
    if (visited.has(node)) {
      return;
    }

    // Mark node as visited and add to recursion stack
    visited.add(node);
    recursionStack.add(node);

    // Check left and right children
    this.countLoops(node.left, visited, recursionStack, loopCount);
    this.countLoops(node.right, visited, recursionStack, loopCount);

    // Remove from recursion stack before backtracking
    recursionStack.delete(node);
  }

  // Create a loop for testing purposes (dangerous - use only for testing)
  createLoopForTesting(): boolean {
    if (this.bstSize < 3) {
      return false; // Need at least 3 nodes to create a loop
    }

    // Find a leaf node and connect it to an internal node
    const leafNode = this.findLeafNode(this.bstRoot);
    const internalNode = this.findInternalNode(this.bstRoot);

    if (leafNode && internalNode) {
      // Create a loop by connecting leaf to internal node
      if (leafNode.left === null) {
        leafNode.left = internalNode;
      } else {
        leafNode.right = internalNode;
      }
      return true;
    }

    return false;
  }

  private findLeafNode(node: BSTNode<T> | null): BSTNode<T> | null {
    if (node === null) {
      return null;
    }

    if (node.isLeaf()) {
      return node;
    }

    const leftLeaf = this.findLeafNode(node.left);
    if (leftLeaf) {
      return leftLeaf;
    }

    return this.findLeafNode(node.right);
  }

  private findInternalNode(node: BSTNode<T> | null): BSTNode<T> | null {
    if (node === null) {
      return null;
    }

    if (!node.isLeaf()) {
      return node;
    }

    const leftInternal = this.findInternalNode(node.left);
    if (leftInternal) {
      return leftInternal;
    }

    return this.findInternalNode(node.right);
  }

  // Get the successor of a given value
  getSuccessor(data: T): T | null {
    const node = this.searchNode(this.bstRoot, data);
    if (!node) return null;

    if (node.right !== null) {
      // Successor is the minimum value in the right subtree
      return this.findMinNode(node.right)?.data || null;
    } else {
      // Successor is the lowest ancestor whose left child is also an ancestor
      let successor: T | null = null;
      let current = this.bstRoot;
      
      while (current !== null) {
        if (data < current.data) {
          successor = current.data;
          current = current.left;
        } else if (data > current.data) {
          current = current.right;
        } else {
          break;
        }
      }
      
      return successor;
    }
  }

  // Get the predecessor of a given value
  getPredecessor(data: T): T | null {
    const node = this.searchNode(this.bstRoot, data);
    if (!node) return null;

    if (node.left !== null) {
      // Predecessor is the maximum value in the left subtree
      let current = node.left;
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    } else {
      // Predecessor is the highest ancestor whose right child is also an ancestor
      let predecessor: T | null = null;
      let current = this.bstRoot;
      
      while (current !== null) {
        if (data > current.data) {
          predecessor = current.data;
          current = current.right;
        } else if (data < current.data) {
          current = current.left;
        } else {
          break;
        }
      }
      
      return predecessor;
    }
  }

  // Print the BST structure
  print(): void {
    if (this.isEmpty()) {
      console.log('BST: (empty)');
      return;
    }

    console.log('Binary Search Tree Structure:');
    this.printTree(this.bstRoot, '', true);
  }

  private printTree(node: BSTNode<T> | null, prefix: string, isLast: boolean): void {
    if (node !== null) {
      console.log(prefix + (isLast ? '└── ' : '├── ') + node.data);
      
      if (node.left) {
        this.printTree(node.left, prefix + (isLast ? '    ' : '│   '), false);
      }
      if (node.right) {
        this.printTree(node.right, prefix + (isLast ? '    ' : '│   '), true);
      }
    }
  }

  // Convert BST to sorted array
  toArray(): T[] {
    return this.inorder();
  }

  // Create a copy of the BST
  clone(): MyBST<T> {
    const newBST = new MyBST<T>();
    if (this.bstRoot) {
      newBST.bstRoot = this.cloneNode(this.bstRoot);
      newBST.bstSize = this.bstSize;
    }
    return newBST;
  }

  private cloneNode(node: BSTNode<T>): BSTNode<T> {
    const clonedNode = new BSTNode(node.data);
    if (node.left) {
      clonedNode.left = this.cloneNode(node.left);
    }
    if (node.right) {
      clonedNode.right = this.cloneNode(node.right);
    }
    return clonedNode;
  }

  // Get the number of leaves in the BST
  getLeafCount(): number {
    return this.countLeaves(this.bstRoot);
  }

  private countLeaves(node: BSTNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    if (node.isLeaf()) {
      return 1;
    }

    return this.countLeaves(node.left) + this.countLeaves(node.right);
  }

  // Get the number of internal nodes
  getInternalNodeCount(): number {
    return this.bstSize - this.getLeafCount();
  }

  // Get all nodes at a specific level
  getNodesAtLevel(level: number): T[] {
    const result: T[] = [];
    this.collectNodesAtLevel(this.bstRoot, 0, level, result);
    return result;
  }

  private collectNodesAtLevel(node: BSTNode<T> | null, currentLevel: number, targetLevel: number, result: T[]): void {
    if (node === null) return;
    
    if (currentLevel === targetLevel) {
      result.push(node.data);
      return;
    }

    this.collectNodesAtLevel(node.left, currentLevel + 1, targetLevel, result);
    this.collectNodesAtLevel(node.right, currentLevel + 1, targetLevel, result);
  }

  // Get the degree of a node (number of children)
  getNodeDegree(data: T): number {
    const node = this.searchNode(this.bstRoot, data);
    return node ? node.getChildCount() : -1;
  }

  // Check if a node is a leaf
  isLeaf(data: T): boolean {
    const node = this.searchNode(this.bstRoot, data);
    return node ? node.isLeaf() : false;
  }

  // Get all children of a specific node
  getChildren(data: T): T[] {
    const node = this.searchNode(this.bstRoot, data);
    if (!node) return [];
    
    const children: T[] = [];
    if (node.left) children.push(node.left.data);
    if (node.right) children.push(node.right.data);
    return children;
  }

  // Get the parent of a specific node
  getParent(data: T): T | undefined {
    if (!this.bstRoot || this.bstRoot.data === data) return undefined;
    return this.findParent(this.bstRoot, data);
  }

  private findParent(node: BSTNode<T>, targetData: T): T | undefined {
    if ((node.left && node.left.data === targetData) || 
        (node.right && node.right.data === targetData)) {
      return node.data;
    }

    if (targetData < node.data && node.left) {
      return this.findParent(node.left, targetData);
    } else if (targetData > node.data && node.right) {
      return this.findParent(node.right, targetData);
    }

    return undefined;
  }
} 
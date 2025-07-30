// TrieNode class for the trie structure
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  value: string | null;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.value = null;
  }

  // Add a child node
  addChild(char: string): TrieNode {
    if (!this.children.has(char)) {
      this.children.set(char, new TrieNode());
    }
    return this.children.get(char)!;
  }

  // Get a child node
  getChild(char: string): TrieNode | undefined {
    return this.children.get(char);
  }

  // Check if node has a specific child
  hasChild(char: string): boolean {
    return this.children.has(char);
  }

  // Remove a child node
  removeChild(char: string): boolean {
    return this.children.delete(char);
  }

  // Get all children characters
  getChildrenChars(): string[] {
    return Array.from(this.children.keys());
  }

  // Get the number of children
  getChildCount(): number {
    return this.children.size;
  }

  // Check if this node is a leaf (no children)
  isLeaf(): boolean {
    return this.children.size === 0;
  }
}

// Trie class implementation
export class MyTrie {
  private root: TrieNode;
  private size: number;

  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  // Insert a word into the trie
  insert(word: string): boolean {
    if (word.length === 0) return false;

    let current = this.root;
    
    for (const char of word) {
      current = current.addChild(char);
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      current.value = word;
      this.size++;
      return true;
    }

    return false; // Word already exists
  }

  // Insert multiple words into the trie
  insertMultiple(words: string[]): number {
    let insertedCount = 0;
    for (const word of words) {
      if (this.insert(word)) {
        insertedCount++;
      }
    }
    return insertedCount;
  }

  // Search for a word in the trie
  search(word: string): boolean {
    if (word.length === 0) return false;

    let current = this.root;
    
    for (const char of word) {
      const child = current.getChild(char);
      if (!child) {
        return false;
      }
      current = child;
    }

    return current.isEndOfWord;
  }

  // Check if any word in the trie starts with the given prefix
  startsWith(prefix: string): boolean {
    if (prefix.length === 0) return true;

    let current = this.root;
    
    for (const char of prefix) {
      const child = current.getChild(char);
      if (!child) {
        return false;
      }
      current = child;
    }

    return true;
  }

  // Remove a word from the trie
  remove(word: string): boolean {
    if (word.length === 0) return false;

    return this.removeHelper(this.root, word, 0);
  }

  private removeHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      
      node.isEndOfWord = false;
      node.value = null;
      this.size--;
      return true;
    }

    const char = word[index];
    const child = node.getChild(char);
    
    if (!child) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this.removeHelper(child, word, index + 1);

    if (shouldDeleteChild && child.isLeaf() && !child.isEndOfWord) {
      node.removeChild(char);
    }

    return shouldDeleteChild;
  }

  // Get the size of the trie (number of words)
  getSize(): number {
    return this.size;
  }

  // Check if the trie is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear all words from the trie
  clear(): void {
    this.root = new TrieNode();
    this.size = 0;
  }

  // Get all words in the trie
  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  private collectWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, words);
    }
  }

  // Get all words that start with a given prefix
  getWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    
    // Find the node corresponding to the prefix
    let current = this.root;
    for (const char of prefix) {
      const child = current.getChild(char);
      if (!child) {
        return words; // Prefix doesn't exist
      }
      current = child;
    }

    // Collect all words from this node
    this.collectWords(current, prefix, words);
    return words;
  }

  // Get the longest common prefix of all words in the trie
  getLongestCommonPrefix(): string {
    if (this.isEmpty()) return '';

    let current = this.root;
    let prefix = '';

    while (current.getChildCount() === 1 && !current.isEndOfWord) {
      const char = current.getChildrenChars()[0];
      prefix += char;
      current = current.getChild(char)!;
    }

    return prefix;
  }

  // Get the height of the trie
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TrieNode): number {
    if (node.isLeaf()) {
      return 0;
    }

    let maxHeight = 0;
    for (const child of node.children.values()) {
      maxHeight = Math.max(maxHeight, this.calculateHeight(child));
    }

    return maxHeight + 1;
  }

  // Get the number of nodes in the trie
  getNodeCount(): number {
    return this.countNodes(this.root);
  }

  private countNodes(node: TrieNode): number {
    let count = 1; // Count this node
    for (const child of node.children.values()) {
      count += this.countNodes(child);
    }
    return count;
  }

  // Check if the trie contains any word with a given suffix
  hasWordWithSuffix(suffix: string): boolean {
    const words = this.getAllWords();
    return words.some(word => word.endsWith(suffix));
  }

  // Get all words that end with a given suffix
  getWordsWithSuffix(suffix: string): string[] {
    const words = this.getAllWords();
    return words.filter(word => word.endsWith(suffix));
  }

  // Get the shortest word in the trie
  getShortestWord(): string | undefined {
    if (this.isEmpty()) return undefined;

    const words = this.getAllWords();
    return words.reduce((shortest, current) => 
      current.length < shortest.length ? current : shortest
    );
  }

  // Get the longest word in the trie
  getLongestWord(): string | undefined {
    if (this.isEmpty()) return undefined;

    const words = this.getAllWords();
    return words.reduce((longest, current) => 
      current.length > longest.length ? current : longest
    );
  }

  // Get all words of a specific length
  getWordsOfLength(length: number): string[] {
    const words = this.getAllWords();
    return words.filter(word => word.length === length);
  }

  // Get the most frequent prefix (prefix that appears in the most words)
  getMostFrequentPrefix(): string {
    const prefixCount = new Map<string, number>();
    
    for (const word of this.getAllWords()) {
      for (let i = 1; i <= word.length; i++) {
        const prefix = word.substring(0, i);
        prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
      }
    }

    let mostFrequent = '';
    let maxCount = 0;

    for (const [prefix, count] of prefixCount) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = prefix;
      }
    }

    return mostFrequent;
  }

  // Check if the trie is a valid trie structure
  isValid(): boolean {
    return this.validateTrie(this.root);
  }

  private validateTrie(node: TrieNode): boolean {
    // Check if end-of-word nodes have values
    if (node.isEndOfWord && node.value === null) {
      return false;
    }

    // Check if non-end-of-word nodes don't have values
    if (!node.isEndOfWord && node.value !== null) {
      return false;
    }

    // Recursively validate children
    for (const child of node.children.values()) {
      if (!this.validateTrie(child)) {
        return false;
      }
    }

    return true;
  }

  // Print the trie structure
  print(): void {
    if (this.isEmpty()) {
      console.log('Trie: (empty)');
      return;
    }

    console.log('Trie Structure:');
    this.printNode(this.root, '', true);
  }

  private printNode(node: TrieNode, prefix: string, isLast: boolean): void {
    const marker = node.isEndOfWord ? '●' : '○';
    console.log(prefix + (isLast ? '└── ' : '├── ') + marker);

    const children = Array.from(node.children.entries());
    for (let i = 0; i < children.length; i++) {
      const [char, child] = children[i];
      const isLastChild = i === children.length - 1;
      this.printNode(child, prefix + (isLast ? '    ' : '│   '), isLastChild);
    }
  }

  // Get a string representation of the trie
  toString(): string {
    const words = this.getAllWords();
    return words.join(', ');
  }

  // Create a copy of the trie
  clone(): MyTrie {
    const newTrie = new MyTrie();
    const words = this.getAllWords();
    newTrie.insertMultiple(words);
    return newTrie;
  }

  // Get all words that match a pattern (with wildcards)
  getWordsMatchingPattern(pattern: string): string[] {
    const words: string[] = [];
    this.matchPattern(this.root, '', pattern, 0, words);
    return words;
  }

  private matchPattern(node: TrieNode, currentWord: string, pattern: string, patternIndex: number, words: string[]): void {
    if (patternIndex === pattern.length) {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      return;
    }

    const char = pattern[patternIndex];
    
    if (char === '*') {
      // Wildcard: match any character
      for (const [childChar, child] of node.children) {
        this.matchPattern(child, currentWord + childChar, pattern, patternIndex + 1, words);
      }
    } else if (char === '?') {
      // Single character wildcard
      for (const [childChar, child] of node.children) {
        this.matchPattern(child, currentWord + childChar, pattern, patternIndex + 1, words);
      }
    } else {
      // Exact character match
      const child = node.getChild(char);
      if (child) {
        this.matchPattern(child, currentWord + char, pattern, patternIndex + 1, words);
      }
    }
  }

  // Get the edit distance between two words
  static getEditDistance(word1: string, word2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= word1.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= word2.length; j++) {
        if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else if (word1[i - 1] === word2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = 1 + Math.min(
            matrix[i - 1][j],     // deletion
            matrix[i][j - 1],     // insertion
            matrix[i - 1][j - 1]  // substitution
          );
        }
      }
    }
    
    return matrix[word1.length][word2.length];
  }

  // Find words similar to a given word (within edit distance)
  findSimilarWords(word: string, maxDistance: number): string[] {
    const words = this.getAllWords();
    return words.filter(w => MyTrie.getEditDistance(word, w) <= maxDistance);
  }

  // Get the number of words that start with each prefix
  getPrefixFrequency(): Map<string, number> {
    const frequency = new Map<string, number>();
    
    for (const word of this.getAllWords()) {
      for (let i = 1; i <= word.length; i++) {
        const prefix = word.substring(0, i);
        frequency.set(prefix, (frequency.get(prefix) || 0) + 1);
      }
    }
    
    return frequency;
  }
} 
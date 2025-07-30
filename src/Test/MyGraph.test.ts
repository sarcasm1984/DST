import { MyGraph } from '../DataStructures/MyGraph';

describe('MyGraph', () => {
  let graph: MyGraph<string>;

  beforeEach(() => {
    graph = new MyGraph<string>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty graph', () => {
      expect(graph.isEmpty()).toBe(true);
      expect(graph.getSize()).toBe(0);
      expect(graph.getEdgeCount()).toBe(0);
      expect(graph.isDirectedGraph()).toBe(false);
    });

    test('should create directed graph', () => {
      const directedGraph = new MyGraph<string>(true);
      expect(directedGraph.isDirectedGraph()).toBe(true);
    });
  });

  describe('Vertex Operations', () => {
    test('should add vertex', () => {
      expect(graph.addVertex('A')).toBe(true);
      expect(graph.getSize()).toBe(1);
      expect(graph.getVertices()).toContain('A');
    });

    test('should not add duplicate vertex', () => {
      graph.addVertex('A');
      expect(graph.addVertex('A')).toBe(false);
      expect(graph.getSize()).toBe(1);
    });

    test('should remove vertex', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      expect(graph.removeVertex('A')).toBe(true);
      expect(graph.getSize()).toBe(1);
      expect(graph.getVertices()).not.toContain('A');
    });

    test('should return false for non-existent vertex removal', () => {
      expect(graph.removeVertex('A')).toBe(false);
    });
  });

  describe('Edge Operations', () => {
    beforeEach(() => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
    });

    test('should add edge', () => {
      expect(graph.addEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.getEdgeCount()).toBe(1);
    });

    test('should add weighted edge', () => {
      expect(graph.addEdge('A', 'B', 5)).toBe(true);
      expect(graph.getEdgeWeight('A', 'B')).toBe(5);
    });

    test('should not add edge between non-existent vertices', () => {
      expect(graph.addEdge('A', 'D')).toBe(false);
      expect(graph.getEdgeCount()).toBe(0);
    });

    test('should remove edge', () => {
      graph.addEdge('A', 'B');
      expect(graph.removeEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('A', 'B')).toBe(false);
      expect(graph.getEdgeCount()).toBe(0);
    });

    test('should handle undirected graph edges', () => {
      graph.addEdge('A', 'B');
      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('B', 'A')).toBe(true);
      expect(graph.getEdgeCount()).toBe(1); // Counted as one edge
    });

    test('should handle directed graph edges', () => {
      const directedGraph = new MyGraph<string>(true);
      directedGraph.addVertex('A');
      directedGraph.addVertex('B');
      directedGraph.addEdge('A', 'B');
      expect(directedGraph.hasEdge('A', 'B')).toBe(true);
      expect(directedGraph.hasEdge('B', 'A')).toBe(false);
      expect(directedGraph.getEdgeCount()).toBe(1);
    });
  });

  describe('Search and Contains Operations', () => {
    beforeEach(() => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
    });

    test('should search for vertex', () => {
      expect(graph.search('A')).toBe(true);
      expect(graph.search('B')).toBe(true);
      expect(graph.search('C')).toBe(false);
    });

    test('should check if edge exists', () => {
      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('B', 'A')).toBe(true);
      expect(graph.hasEdge('A', 'C')).toBe(false);
    });

    test('should get edge weight', () => {
      // The beforeEach already adds A->B with weight 1, so we check that
      expect(graph.getEdgeWeight('A', 'B')).toBe(1);
      expect(graph.getEdgeWeight('B', 'A')).toBe(1); // Undirected graph
      expect(graph.getEdgeWeight('A', 'C')).toBeUndefined();
    });
  });

  describe('Collection Operations', () => {
    beforeEach(() => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
    });

    test('should get all vertices', () => {
      const vertices = graph.getVertices();
      expect(vertices).toContain('A');
      expect(vertices).toContain('B');
      expect(vertices).toContain('C');
      expect(vertices.length).toBe(3);
    });

    test('should get all edges', () => {
      const edges = graph.getEdges();
      expect(edges.length).toBe(4); // Undirected graph creates 2 edges for each connection
    });

    test('should get neighbors', () => {
      const neighbors = graph.getNeighbors('A');
      expect(neighbors).toContain('B');
      expect(neighbors.length).toBe(1);
    });

    test('should get edges from vertex', () => {
      const edges = graph.getEdgesFrom('A');
      expect(edges.length).toBe(1);
      expect(edges[0].from).toBe('A');
      expect(edges[0].to).toBe('B');
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(graph.getSize()).toBe(0);
      graph.addVertex('A');
      expect(graph.getSize()).toBe(1);
      graph.addVertex('B');
      expect(graph.getSize()).toBe(2);
    });

    test('should check if empty', () => {
      expect(graph.isEmpty()).toBe(true);
      graph.addVertex('A');
      expect(graph.isEmpty()).toBe(false);
    });

    test('should get edge count', () => {
      expect(graph.getEdgeCount()).toBe(0);
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      expect(graph.getEdgeCount()).toBe(1);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all vertices and edges', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      graph.clear();
      expect(graph.isEmpty()).toBe(true);
      expect(graph.getSize()).toBe(0);
      expect(graph.getEdgeCount()).toBe(0);
    });

    test('should handle clear on empty graph', () => {
      graph.clear();
      expect(graph.isEmpty()).toBe(true);
    });
  });

  describe('Traversal Operations', () => {
    beforeEach(() => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('A', 'C');
    });

    test('should perform DFS traversal', () => {
      const dfs = graph.dfs('A');
      expect(dfs).toContain('A');
      expect(dfs).toContain('B');
      expect(dfs).toContain('C');
    });

    test('should perform BFS traversal', () => {
      const bfs = graph.bfs('A');
      expect(bfs).toContain('A');
      expect(bfs).toContain('B');
      expect(bfs).toContain('C');
    });

    test('should handle traversal from non-existent vertex', () => {
      expect(graph.dfs('D')).toEqual([]);
      expect(graph.bfs('D')).toEqual([]);
    });
  });

  describe('Graph Analysis Operations', () => {
    test('should check if connected (undirected)', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      expect(graph.isConnected()).toBe(true);
    });

    test('should get connected components', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      const components = graph.getConnectedComponents();
      expect(components.length).toBe(2); // A-B and C
    });

    test('should check if path exists', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      expect(graph.hasPath('A', 'C')).toBe(true);
      expect(graph.hasPath('A', 'D')).toBe(false);
    });

    test('should find shortest path', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      const path = graph.shortestPath('A', 'C');
      expect(path).toEqual(['A', 'B', 'C']);
    });

    test('should detect cycles', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('C', 'A');
      expect(graph.hasCycle()).toBe(true);
    });

    test('should perform topological sort', () => {
      const directedGraph = new MyGraph<string>(true);
      directedGraph.addVertex('A');
      directedGraph.addVertex('B');
      directedGraph.addVertex('C');
      directedGraph.addEdge('A', 'B');
      directedGraph.addEdge('B', 'C');
      const topoSort = directedGraph.topologicalSort();
      expect(topoSort).toContain('A');
      expect(topoSort).toContain('B');
      expect(topoSort).toContain('C');
    });
  });

  describe('Vertex Analysis Operations', () => {
    test('should get vertex degree', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      expect(graph.getVertexDegree('A')).toBe(2);
      expect(graph.getVertexDegree('B')).toBe(1);
    });

    test('should return -1 for non-existent vertex degree', () => {
      expect(graph.getVertexDegree('A')).toBe(-1);
    });
  });

  describe('Minimum Spanning Tree Operations', () => {
    test('should get minimum spanning tree', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B', 2);
      graph.addEdge('B', 'C', 3);
      graph.addEdge('A', 'C', 1);
      const mst = graph.getMinimumSpanningTree();
      expect(mst.getSize()).toBe(3);
      expect(mst.getEdgeCount()).toBe(2);
    });

    test('should return empty MST for directed graph', () => {
      const directedGraph = new MyGraph<string>(true);
      const mst = directedGraph.getMinimumSpanningTree();
      expect(mst.isEmpty()).toBe(true);
    });
  });

  describe('Matrix Conversion', () => {
    test('should convert to adjacency matrix', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B', 5);
      const matrix = graph.toAdjacencyMatrix();
      expect(matrix.length).toBe(2);
      expect(matrix[0].length).toBe(2);
    });
  });

  describe('Clone Operations', () => {
    test('should clone graph correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      const clonedGraph = graph.clone();
      expect(clonedGraph.getSize()).toBe(2);
      expect(clonedGraph.getEdgeCount()).toBe(2); // Undirected graph
      expect(clonedGraph).not.toBe(graph);
    });

    test('should clone empty graph', () => {
      const clonedGraph = graph.clone();
      expect(clonedGraph.isEmpty()).toBe(true);
    });
  });

  describe('Print Operations', () => {
    test('should print graph correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      graph.print();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should print empty graph', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      graph.print();
      expect(consoleSpy).toHaveBeenCalledWith('Graph: (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle self-loops', () => {
      graph.addVertex('A');
      expect(graph.addEdge('A', 'A')).toBe(true);
      expect(graph.hasEdge('A', 'A')).toBe(true);
    });

    test('should handle multiple edges between same vertices', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'B'); // Should update existing edge
      expect(graph.getEdgeCount()).toBe(2); // Undirected graph
    });

    test('should handle isolated vertices', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      expect(graph.getNeighbors('A')).toEqual([]);
      expect(graph.getNeighbors('B')).toEqual([]);
    });
  });

  describe('Complex Operations', () => {
    test('should handle complex graph operations', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addVertex('D');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('C', 'D');
      graph.addEdge('A', 'D');
      expect(graph.getSize()).toBe(4);
      expect(graph.getEdgeCount()).toBe(4);
      expect(graph.hasPath('A', 'D')).toBe(true);
    });

    test('should handle large graph operations', () => {
      for (let i = 0; i < 10; i++) {
        graph.addVertex(`V${i}`);
      }
      for (let i = 0; i < 9; i++) {
        graph.addEdge(`V${i}`, `V${i + 1}`);
      }
      expect(graph.getSize()).toBe(10);
      expect(graph.getEdgeCount()).toBe(9);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 100; i++) {
        graph.addVertex(`V${i}`);
      }
      for (let i = 0; i < 99; i++) {
        graph.addEdge(`V${i}`, `V${i + 1}`);
      }
      const endTime = Date.now();
      expect(graph.getSize()).toBe(100);
      expect(graph.getEdgeCount()).toBe(99);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 
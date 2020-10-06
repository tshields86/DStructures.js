const Graph = require('../Graph');

const getValues = vertex => (Array.isArray(vertex) ? vertex.map(v => getValues(v)) : vertex.value);

describe('Graph', () => {
  let graph;

  it('should create an empty graph', () => {
    graph = new Graph();
    expect(graph.vertices.size).toBe(0);
  });

  beforeEach(() => {
    graph = new Graph();
  });

  describe('#addVertex', () => {
    it('should add vertex to graph', () => {
      const vertex = graph.addVertex('foo');
      expect(vertex.value).toBe('foo');
      expect(graph.vertices.size).toBe(1);
    });

    it('should not add duplicated values to graph', () => {
      const vertex1 = graph.addVertex('foo');
      const vertex2 = graph.addVertex('foo');
      expect(graph.vertices.size).toBe(1);
      expect(vertex1).toBe(vertex2);
    });
  });

  describe('#removeVertex', () => {
    it('should remove vertex from graph', () => {
      graph.addVertex('foo');
      expect(graph.removeVertex('foo')).toBeTruthy();
      expect(graph.vertices.size).toBe(0);
      expect(graph.removeVertex('foo')).toBeFalsy();
    });
  });

  describe('#addEdge', () => {
    it('should add vertices if they do not exist', () => {
      graph.addEdge('foo', 'bar');
      expect(graph.vertices.size).toBe(2);
    });

    it('should add source and destination adjacent of eachother in undirected graph', () => {
      graph = new Graph(Graph.UNDIRECTED);
      const [foo, bar] = graph.addEdge('foo', 'bar');
      expect(foo.getAdjacents().includes(bar)).toBeTruthy();
      expect(bar.getAdjacents().includes(foo)).toBeTruthy();
    });

    it('should add source as adjacent of destination in directed graph', () => {
      graph = new Graph(Graph.DIRECTED);
      const [foo, bar] = graph.addEdge('foo', 'bar');
      expect(foo.getAdjacents().includes(bar)).toBeTruthy();
      expect(bar.getAdjacents().includes(foo)).toBeFalsy();

      graph.addEdge('bar', 'foo');
      expect(bar.getAdjacents().includes(foo)).toBeTruthy();
    });
  });

  describe('#removeEdge', () => {
    beforeEach(() => {
      graph.addEdge('foo', 'bar');
    });

    it('should remove edges if they exist', () => {
      const [foo, bar] = graph.removeEdge('foo', 'bar');
      expect(foo.getAdjacents().includes(bar)).toBeFalsy();
      expect(bar.getAdjacents().includes(foo)).toBeFalsy();
    });

    it('should not create vertex when removing unexisting target', () => {
      const [foo, baz] = graph.removeEdge('foo', 'baz');
      const bar = graph.vertices.get('bar');
      expect(graph.vertices.size).toBe(2);
      expect(foo.getAdjacents().includes(bar)).toBeTruthy();
      expect(baz).toBe(undefined);
    });

    it('should not create vertex when removing unexisting vertices', () => {
      const [bam, baz] = graph.removeEdge('bam', 'baz');
      expect(graph.vertices.size).toBe(2);
      expect(baz).toBe(undefined);
      expect(bam).toBe(undefined);
    });
  });

  describe('#removeEdge', () => {
    beforeEach(() => {
      graph.addEdge('foo', 'bar');
    });

    it('should remove edges if they exist', () => {
      const [foo, bar] = graph.removeEdge('foo', 'bar');
      expect(foo.getAdjacents().includes(bar)).toBeFalsy();
      expect(bar.getAdjacents().includes(foo)).toBeFalsy();
    });

    it('should not create vertex when removing unexisting target', () => {
      const [foo, baz] = graph.removeEdge('foo', 'baz');
      const bar = graph.vertices.get('bar');
      expect(graph.vertices.size).toBe(2);
      expect(foo.getAdjacents().includes(bar)).toBeTruthy();
      expect(baz).toBe(undefined);
    });

    it('should not create vertex when removing unexisting vertices', () => {
      const [bam, baz] = graph.removeEdge('bam', 'baz');
      expect(graph.vertices.size).toBe(2);
      expect(baz).toBe(undefined);
      expect(bam).toBe(undefined);
    });
  });

  describe('#areAdjacents', () => {
    it('should return true if vertices are adjacent', () => {
      graph.addEdge('foo', 'bar');
      expect(graph.areAdjacents('foo', 'bar')).toBeTruthy();
    });

    it('should return true if a undirected graph vertices are adjacent', () => {
      graph = new Graph(Graph.UNDIRECTED);
      graph.addEdge('foo', 'bar');
      expect(graph.areAdjacents('bar', 'foo')).toBeTruthy();
    });

    it('should return false if a directed graph vertices are adjacent in one direction only', () => {
      graph = new Graph(Graph.DIRECTED);
      graph.addEdge('foo', 'bar');
      expect(graph.areAdjacents('bar', 'foo')).toBeFalsy();
    });

    it('should return false if vertices do not exist', () => {
      expect(graph.areAdjacents('foo', 'bar')).toBeFalsy();
    });

    it('should return false if vertices are not adjacent', () => {
      graph.addVertex('foo');
      graph.addVertex('bar');
      expect(graph.areAdjacents('foo', 'bar')).toBeFalsy();
    });
  });

  describe('#search: directed graph', () => {
    let start;

    beforeEach(() => {
      graph = new Graph(Graph.DIRECTED);
      graph.addEdge(0, 5);
      graph.addEdge(0, 4);
      [start] = graph.addEdge(0, 1);

      graph.addEdge(1, 4);
      graph.addEdge(1, 3);

      graph.addEdge(2, 1);

      graph.addEdge(3, 4);
      graph.addEdge(3, 2);
    });

    describe('#dfs', () => {
      it('should explore vertices using depth-first search', () => {
        const exploredOrder = Array.from(Graph.dfs(start), getValues);
        expect(exploredOrder).toEqual([0, 1, 3, 2, 4, 5]);
      });
    });

    describe('#bfs', () => {
      it('should explore vertices using breadth-first search', () => {
        const exploredOrder = Array.from(Graph.bfs(start), getValues);
        expect(exploredOrder).toEqual([0, 5, 4, 1, 3, 2]);
      });
    });
  });

  describe('#search: undirected graph', () => {
    let start;

    beforeEach(() => {
      graph = new Graph(Graph.UNDIRECTED);
      [start] = graph.addEdge(1, 2);
      graph.addEdge(1, 3);
      graph.addEdge(1, 4);

      graph.addEdge(5, 2);
      graph.addEdge(6, 3);
      graph.addEdge(7, 3);
      graph.addEdge(8, 4);
      graph.addEdge(9, 5);
      graph.addEdge(10, 6);
    });

    describe('#dfs', () => {
      it('should explore vertices using depth-first search', () => {
        const exploredOrder = Array.from(Graph.dfs(start), getValues);
        expect(exploredOrder).toEqual([1, 4, 8, 3, 7, 6, 10, 2, 5, 9]);
      });

      it('should use iterator', () => {
        const dfs = Graph.dfs(start);

        expect(dfs.next().value.value).toBe(1);
        expect(dfs.next().value.value).toBe(4);
        expect(dfs.next().value.value).toBe(8);
        expect(dfs.next().value.value).toBe(3);
        expect(dfs.next().value.value).toBe(7);
        expect(dfs.next().value.value).toBe(6);
        expect(dfs.next().value.value).toBe(10);
        expect(dfs.next().value.value).toBe(2);
        expect(dfs.next().value.value).toBe(5);
        expect(dfs.next().value.value).toBe(9);

        expect(dfs.next().value).toBe(undefined);
        expect(dfs.next().done).toBeTruthy();
      });
    });

    describe('#bfs', () => {
      it('should explore vertices using breadth-first search', () => {
        const exploredOrder = Array.from(Graph.bfs(start), getValues);
        expect(exploredOrder).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });
    });
  });

  describe('with string edges on undigraph', () => {
    let foo;
    let bar;
    let baz;

    beforeEach(() => {
      graph = new Graph(Graph.UNDIRECTED);
      [foo] = graph.addEdge('foo', 'bar');
      [bar, baz] = graph.addEdge('bar', 'baz');
    });

    describe('#areConnected', () => {
      it('should return true if two vertices are connected', () => {
        expect(graph.areConnected('foo', 'baz')).toBeTruthy();
      });

      it('should return true if two vertices are connected', () => {
        expect(graph.areConnected('foo', 'foo')).toBeTruthy();
      });

      it('should return true if two vertices are connected', () => {
        expect(graph.areConnected('foo', 'bam')).toBeFalsy();
      });
    });

    describe('#findPath', () => {
      it('should handle source === destination', () => {
        expect(graph.findPath('foo', 'foo')).toEqual([foo]);
      });

      it('should get connecting path', () => {
        expect(graph.findPath('foo', 'baz').map(getValues)).toEqual(['foo', 'bar', 'baz']);
      });

      it('should get adjacent connecting path', () => {
        expect(graph.findPath('bar', 'baz').map(getValues)).toEqual(['bar', 'baz']);
        expect(graph.findPath('bar', 'baz')).toEqual([bar, baz]);
      });

      it('should return empty if there is no connection', () => {
        expect(graph.findPath('foo', 'bam').map(getValues)).toEqual([]);
      });
    });

    describe('#findAllPaths', () => {
      it('should handle source === destination', () => {
        expect(graph.findAllPaths('foo', 'foo')).toEqual([[foo]]);
        expect(getValues(graph.findAllPaths('foo', 'foo'))).toEqual([['foo']]);
      });

      it('should find all paths when only one', () => {
        expect(getValues(graph.findAllPaths('bar', 'baz'))).toEqual([
          ['bar', 'baz'],
        ]);
      });

      it('should find all paths', () => {
        graph.addEdge('foo', 'baz');
        expect(getValues(graph.findAllPaths('foo', 'baz'))).toEqual([
          ['foo', 'bar', 'baz'],
          ['foo', 'baz'],
        ]);
      });

      it('should return empty if there is no connection', () => {
        expect(graph.findAllPaths('foo', 'bam').map(getValues)).toEqual([]);
      });
    });
  });
});

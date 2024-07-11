class MinHeap {
  constructor() {
    this.heap = [ null ];
  }

  enqueue(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  dequeue() {
    if(this.heap.length === 1) return;
    if(this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this._heapifyDown();
    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  _heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while(currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);
      if(this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;
      this._swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  _heapifyDown() {
    let currentIndex = 1;

    while(true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = (currentIndex * 2) + 1;
      let smallIndex = leftIndex;

      if(
        rightIndex < this.heap.length && 
        this.heap[rightIndex].cost < this.heap[leftIndex].cost
      ) {
        smallIndex = rightIndex;
      }

      if(
        leftIndex >= this.heap.length || 
        this.heap[leftIndex].cost >= this.heap[currentIndex].cost
      ) {
        break;
      }

      this._swap(currentIndex, smallIndex);
      currentIndex = smallIndex;
    }
  }
  
  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(N, M, graph, startNode, endNode) {
  const heap = new MinHeap();
  heap.enqueue({ node: startNode, cost: 0 });

  const dist = new Array(N + 1).fill(Infinity);
  dist[startNode] = 0;

  while(!heap.isEmpty()) {
    const { node: currentNode, cost: currentCost } = heap.dequeue();
  
    for(const [nextNode, nextCost] of graph[currentNode]) {
      const shortPath = currentCost + nextCost;

      if(dist[nextNode] > shortPath) {
        dist[nextNode] = shortPath;
        heap.enqueue({ node: nextNode, cost: shortPath });
      }
    }
  }

  return dist[endNode];
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const M = Number(input[1]);
const graph = Array.from({length: N + 1}, () => []);
const [startNode, endNode] = input[input.length - 1].split(' ').map(Number);

for(let i = 2; i < M + 2; i++) {
  const [from, to, cost] = input[i].split(' ').map(Number);
  graph[from].push([to, cost]);
  // graph[to].push([from, cost]);
}

console.log(solution(N, M, graph, startNode, endNode));
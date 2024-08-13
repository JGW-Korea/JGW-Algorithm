class MinHeap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    this.__heapifyUp();
  }

  dequeue() {
    if(this.isEmpty()) return;
    if(this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.__heapifyDown();
    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 1;
  }
  
  __heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while(currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);
      if(this.heap[currentIndex].cost >= this.heap[parentIndex].cost) break;
      this.__swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  __heapifyDown() {
    let currentIndex = 1;

    while(true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = (currentIndex * 2) + 1;
      let smallIndex = leftIndex;
      
      if(
        rightIndex < this.heap.length &&
        this.heap[rightIndex].cost < this.heap[leftIndex].cost
      ) {
        smallIndex = rightIndex
      }

      if(
        leftIndex >= this.heap.length ||
        this.heap[leftIndex].cost >= this.heap[currentIndex]
      ) {
        break;
      }

      this.__swap(currentIndex, smallIndex);
      currentIndex = smallIndex;
    }
  }

  __swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(N, M, graph) {
  const heap = new MinHeap();
  
  const dist = new Array(N + 1).fill(Infinity); // 다익스트라 알고리즘을 위한 거리를 저장하는 배열
  dist[1] = 0; // 1번 컴퓨터는 보안 시스템을 설치할 슈퍼컴퓨터 (즉, 시작 정점)

  heap.enqueue({ node: 1, cost: 0 }); // 힙에 값을 추가한다.

  const edges = new Array(N + 1).fill(0); // 복구한 회선의 정보
  
  while(!heap.isEmpty()) {
    const { node: currentNode, cost: currentCost } = heap.dequeue();

    for(const [nextNode, nextCost] of graph[currentNode]) {
      const shortPath = currentCost + nextCost; // A 정점에서 B 정점까지의 거리를 구한다.

      if(dist[nextNode] > shortPath) {
        dist[nextNode] = shortPath;
        heap.enqueue({ node: nextNode, cost: shortPath });
        edges[nextNode] = currentNode;
      }
    }
  }

  let K = 0; // 복구할 회선의 개수
  const result = [];

  for(let i = N; i > 1; i--) {
    result.push(`${i} ${edges[i]}`);
    K += 1;
  }

  return K + "\n" + result.reverse().join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from({length: N + 1}, () => []);

for(let i = 1; i < M + 1; i++) {
  const [from, to, cost] = input[i].split(' ').map(Number);
  graph[from].push([to, cost]);
  graph[to].push([from, cost]);
}

console.log(solution(N, M, graph));
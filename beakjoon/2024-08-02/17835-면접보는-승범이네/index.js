class Heap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    this.__heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

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

    while (currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);
      if (this.heap[currentIndex].cost >= this.heap[parentIndex].cost) break;
      this.__swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  __heapifyDown() {
    let currentIndex = 1;

    while (true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let smallIndex = leftIndex;

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].cost < this.heap[leftIndex]
      ) {
        smallIndex = rightIndex;
      }

      if (
        leftIndex >= this.heap.length ||
        this.heap[leftIndex].cost >= this.heap[currentIndex].cost
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

function solution(N, M, K, graph, places) {
  let answerNode = new Array(K).fill(Number.MAX_SAFE_INTEGER); // 가장 거리가 먼 도시
  let answerDist = new Array(K).fill(0); // A 정점에서 도착 정점까지의 거리

  for (let i = 0; i < K; i++) {
    for (let startNode = 1; startNode < N + 1; startNode++) {
      if (places.includes(startNode)) continue;

      const heap = new Heap();
      heap.enqueue({ node: startNode, cost: 0 });

      const dist = new Array(N + 1).fill(Infinity);
      dist[startNode] = 0;

      while (!heap.isEmpty()) {
        const { node: currentNode, cost: currentCost } = heap.dequeue();

        if(currentNode === places[i]) {
          if(currentCost >= answerDist[i]) {
            answerNode[i] = startNode;
            answerDist[i] = currentCost;
          }
        }
        
        for (const [nextNode, nextCost] of graph[currentNode]) {
          const shortPath = currentCost + nextCost;

          if (dist[nextNode] > shortPath) {
            dist[nextNode] = shortPath;
            heap.enqueue({ node: nextNode, cost: shortPath });
          }
        }
      }

      // while(!heap.isEmpty()) {
      //   const { node: currentNode, cost: currentCost } = heap.dequeue();

      //   if(currentNode === places[i]) {
      //     if(currentCost > answerDist[i]) {
      //       answerNode[i] = currentNode;
      //       answerDist[i] = currentCost;
      //     }
      //   }

      //   for(const [nextNode, nextCost] of graph[currentNode]) {

      //     console.log("currentNode: " + currentCost + " : " + nextNode);

      //     const shortPath = currentCost + nextCost;

      //     if(dist[nextNode] > shortPath) {
      //       console.log(shortPath)
      //       dist[nextNode] = shortPath;
      //       heap.enqueue({ node: nextNode, cost: shortPath });
      //     }
      //   }
      // }
    }
  }

  console.log(answerNode);
  console.log(answerDist);
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let node = 1; node < M + 1; node++) {
  const [from, to, cost] = input[node].split(" ").map(Number);
  graph[from].push([to, cost]);
}

const places = input[M + 1].split(" ").map(Number);
console.log(solution(N, M, K, graph, places));

function solution(N, graph, bfsOrder) {
  const bfsOrderIndex = new Array(N + 1); // BFS 방문 순서 위치

  // 입력으로 주어진 BFS 방문 순서의 위치를 기록한다.
  for(let i = 0; i < N; i++) {
    bfsOrderIndex[bfsOrder[i]] = i;
  }

  // 그래프의 각 노드 리스트를 bfsOrder 순서에 따라 정렬한다.
  for(let i = 1; i < N + 1; i++) {
    graph[i].sort((a, b) => bfsOrderIndex[a] - bfsOrderIndex[b]);
  }

  // BFS 탐색 로직
  const visited = new Array(N + 1).fill(0);
  visited[1] = 1;

  const queue = [1];
  const bfsResult = [];

  while(queue.length) {
    const current = queue.shift();
    bfsResult.push(current);

    for(const next of graph[current]) {
      if(!visited[next]) {
        visited[next] = 1;
        queue.push(next);
      }
    }
  }

  return bfsResult.join(' ') === bfsOrder.join(' ') ? 1 : 0;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const graph = Array.from({length: N + 1}, () => []);
const bfsOrder = input[N].split(' ').map(Number);

for(let i = 1; i < N; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

console.log(solution(N, graph, bfsOrder));
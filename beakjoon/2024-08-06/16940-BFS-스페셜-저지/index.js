function solution(N, graph, bfsOrder) {
  const bfsOrderIndex = new Array(N + 1); // 입력으로 주어진 BFS 방문 순서의 기록을 저장하는 배열

  // 입력으로 주어진 BFS 방문 순서의 기록을 저장한다.
  for(let i = 0; i < N; i++) {
    bfsOrderIndex[bfsOrder[i]] = i;
  }

  // 방문 순서 기록대로 graph 각 노드와 연결된 노드들을 오름차순 정렬 시킨다.
  for(let i = 1; i < N + 1; i++) {
    graph[i].sort((a, b) => bfsOrderIndex[a] - bfsOrderIndex[b]);
  }

  // 방문 순서 기록대로 오름차순 정렬시킨 그래프를 BFS 탐색을 진행한다.
  const visited = new Array(N + 1).fill(false);
  visited[1] = true; // 문제에서 주어진 대로 해당 문제의 시작 노드는 항상 1번 노드이다.
  const bfsResult = [];

  const queue = [1];

  while(queue.length) {
    const current = queue.shift();
    bfsResult.push(current); // 현재 정점을 방문 순서 결과를 저장하는 배열에 노드를 추가한다.

    for(const next of graph[current]) {
      if(!visited[next]) {
        visited[next] = true;
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
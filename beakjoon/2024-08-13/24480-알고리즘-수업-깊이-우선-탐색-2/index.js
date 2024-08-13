function solution(N, M, graph, startNode) {
  // 각 정점에 연결된 노드를 내림차순으로 정렬시킨다.
  graph.forEach((element) => {
    element.sort((a, b) => b - a);
  });
  
  // const answer = [startNode]; // 방문 순서를 담는 배열
  const visited = new Array(N + 1).fill(0) // DFS를 위한 방문처리 배열
  let rank = 1;
  
  function dfs(currentNode) {
    visited[currentNode] = rank++;

    for(const nextNode of graph[currentNode]) {
      if(!visited[nextNode]) {
        dfs(nextNode);
      }
    }
  }

  dfs(startNode);

  return visited.slice(1).join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M, startNode] = input[0].split(' ').map(Number);
const graph = Array.from({length: N + 1}, () => []);

for(let i = 1; i < M + 1; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

console.log(solution(N, M, graph, startNode));
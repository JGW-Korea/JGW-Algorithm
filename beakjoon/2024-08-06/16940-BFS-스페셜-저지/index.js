function solution(N, graph, result) {
  const answer = [];

  function bfs(next) {
    let order = `1 ${next} `;

    const visited = new Array(N + 1).fill(0);
    visited[1] = visited[next] = 1;

    const queue = [1, next];

    while(queue.length) {
      const current = queue.shift();

      for(const nextNode of graph[current]) {
        if(!visited[nextNode]) {
          visited[nextNode] = 1;
          queue.push(nextNode);
          order += nextNode + " ";
        }
      }
    }

    answer.push(order.trimEnd());
  }

  for(const next of graph[1]) {
    bfs(next);
  }

  return answer.includes(result) ? 1 : 0;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const graph = Array.from({length: N + 1}, () => []);
const visitedResult = input[N];

for(let i = 1; i < N; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

console.log(solution(N, graph, visitedResult));
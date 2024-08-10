function solution(N, graph, end) {
  const parent = new Array(N + 1).fill(0); // 각 노드의 부모 정점을 저장하는 1차원 배열

  // 각 노드의 부모를 저장한다.
  for(let i = 1; i < N + 1; i++) {
    for(const child of graph[i]) {
      parent[child] = i;
    }
  }

  const ancestors = new Set(); // 공통 조상을 담기 위한 Set 객체

  // 첫번째 노드의 모든 부모에 대한 정보를 Set 객체에 담는다.
  while(end[0] !== 0) {
    ancestors.add(end[0]);
    end[0] = parent[end[0]];
  }

  // 두 번째 노드의 부모가 Set 객체에 포함하고 있지 않을때까지 반복한다.
  while(!ancestors.has(end[1])) {
    end[1] = parent[end[1]];
  }

  return end[1]; // 가장 가까운 공통 조상 노드를 반환한다.
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

let result = '';
let idx = 1;

for(let tc = 0; tc < Number(input[0]); tc++) {
  const N = Number(input[idx++]);
  const graph = Array.from({ length: N + 1 }, () => []);

  for(let edge = 0; edge < N - 1; edge++) {
    const [from, to] = input[idx++].split(' ').map(Number);
    graph[from].push(to);
  }

  result += solution(N, graph, input[idx++].split(' ').map(Number)) + "\n";
}

console.log(result);
function solution(N, tree, node1, node2) {
  const parent = new Array(N + 1).fill(0);
  const depth = new Array(N + 1).fill(0);

  function dfs(node, dep) {
    depth[node] = dep;
    for (const child of tree[node]) {
      parent[child] = node;
      dfs(child, dep + 1);
    }
  }

  // 루트 노드를 찾기
  let root = 0;
  for (let i = 1; i <= N; i++) {
    if (parent[i] === 0) {
      root = i;
      break;
    }
  }

  dfs(root, 0);

  // 깊이 맞추기
  while (depth[node1] > depth[node2]) node1 = parent[node1];
  while (depth[node2] > depth[node1]) node2 = parent[node2];

  // 공통 조상 찾기
  while (node1 !== node2) {
    node1 = parent[node1];
    node2 = parent[node2];
  }

  return node1;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

let idx = 1;
let result = '';

for (let tc = 0; tc < Number(input[0]); tc++) {
  const N = Number(input[idx++]);
  const tree = Array.from({ length: N + 1 }, () => []);

  for (let edge = 0; edge < N - 1; edge++) {
    const [from, to] = input[idx++].split(' ').map(Number);
    tree[from].push(to);
  }

  const [node1, node2] = input[idx++].split(' ').map(Number);

  result += solution(N, tree, node1, node2) + "\n";
}

console.log(result);

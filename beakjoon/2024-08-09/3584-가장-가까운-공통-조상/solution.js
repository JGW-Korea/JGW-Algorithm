function solution(N, tree, node1, node2) {
  const parent = new Array(N + 1).fill(0);

  // 각 노드의 부모를 저장
  for (let i = 1; i <= N; i++) {
    for (const child of tree[i]) {
      parent[child] = i;
    }
  }

  // node1의 조상들을 저장
  const ancestors = new Set();
  while (node1 !== 0) {
    ancestors.add(node1);
    node1 = parent[node1];
  }

  // node2의 조상을 탐색하며 공통 조상을 찾음
  while (!ancestors.has(node2)) {
    node2 = parent[node2];
  }

  return node2;
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
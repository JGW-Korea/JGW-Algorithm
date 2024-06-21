function find(parent, x) { // Union-Find : Find 알고리즘
  if(x === parent[x]) {
    return x;
  }

  return parent[x] = find(parent, parent[x]);
}

function union(parent, a, b) { // Union-Find : Union 알고리즘
  a = find(parent, a);
  b = find(parent, b);

  if(a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
}

function compare(parent, a, b) { // Union-Find : 같은 집합인지 확인하는 알고리즘
  a = find(parent, a);
  b = find(parent, b);

  return a === b;
}

function solution(node, edge, graph) {
  const sortedGraph = graph.sort((a, b) => a[2] - b[2]); // 가중치를 기준으로 정렬
  const parent = Array.from({length: node + 1}, (_, idx) => idx); // 집합을 위한 부모 집합 관계

  let answer = 0; // 가중치의 합

  for(const [a, b, cost] of sortedGraph) {
    if(!compare(parent, a, b)) {
      answer += cost;
      union(parent, a, b);
    }
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [Node, Edge] = input[0].split(' ').map(Number);
const graph = [];

for(let i = 1; i < Edge + 1; i++) {
  graph.push(input[i].split(' ').map(Number)); // [ from, to, value ]
}

console.log(solution(Node, Edge, graph));
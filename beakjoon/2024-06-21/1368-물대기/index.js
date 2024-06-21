function find(parent, x) {
  if(parent[x] === x) {
    return x;
  }

  return parent[x] = find(parent, parent[x]);
}

function union(parent, a, b) {
  a = find(parent, a);
  b = find(parent, b);

  if(a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
}

function compare(parent, a, b) {
  a = find(parent, a);
  b = find(parent, b);

  return a === b;
}

function solution(N, W, P) {
  const costs = [];

  // 인접 행렬로 받아온 그래프를 [from, to, cost]와 같이 그래프 모델링을 수행해야 한다.
  for(let i = 1; i < N + 1; i++) {
    costs.push([0, i, W[i]]); // 새로운 정점을 추가한다. (각 논에 직접 우물을 파는 비용)

    for(let j = 1; j < N + 1; j++) {
      costs.push([i, j, P[i][j]]); // 논들 사이에 물을 끌어오는 비용
    }
  }

  // 크루스칼 알고리즘을 하기 위해 가중치를 기준으로 정렬시킨다.
  const sortedCosts = costs.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({length: N + 1}, (_, idx) => idx); // 집합을 위한 부모 정점

  let answer = 0;
  
  for(const [a, b, cost] of sortedCosts) {
    if(!compare(parent, a, b)) {
      answer += cost;
      union(parent, a, b);
    }
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]); // 논의 개수

// 각 논에 우물을 파는 비용
const W = input.slice(1, N + 1).map(Number);
W.unshift(0);

// 논들 사이에 물을 끌어오는 비용
const P = input.slice(N + 1).map(element => [0, ...element.split(' ').map(Number)]);
P.unshift(new Array(N + 1).fill(0));

console.log(solution(N, W, P));
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

function solution(N, M, coordinate, connect) {
  const parent = Array.from({length: N + 1}, (_, idx) => idx);
  const costs = [];
  let answer = 0;

  // 연결된 두 황선자씨와 우주신은 같은 집합으로 표기한다.
  for(const [a, b] of connect) {
    union(parent, a, b);
  }

  // 2차원 좌표계로 나타낼 수 있는 모든 통로에 대한 정보를 구한다.
  for(let i = 0; i < N - 1; i++) {
    let [x1, y1] = coordinate[i];

    for(let j = i + 1; j < N; j++) {
      let [x2, y2] = coordinate[j];

      // 모든 통로들의 길이
      let cost = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      costs.push([i + 1, j + 1, cost]);
    }
  }

  costs.sort((a, b) => a[2] - b[2]);


  // 크루스칼 알고리즘
  for(const [a, b, cost] of costs) {
    if(!compare(parent, a, b)) {
      answer += cost;
      union(parent, a, b);
    }
  }

  return answer.toFixed(2); // 소수점 2자리까지 반환
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const coordinate = input.slice(1, N + 1).map(element => element.split(' ').map(Number));

const connect = input.slice(N + 1).map(element => element.split(' ').map(Number));

console.log(solution(N, M, coordinate, connect));
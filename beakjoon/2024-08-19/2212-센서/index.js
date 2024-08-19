function solution(N, K, sensor) {
  if(K >= N) return 0;
  
  sensor.sort((a, b) => a - b); // 센서의 거리를 오름차순 정렬을 한다.

  // i 센서와 i + 1 센서의 거리 차이를 구한다.
  const diff = new Array(N - 1).fill(0); 

  for(let i = 0; i < N - 1; i++) {
    diff[i] = sensor[i + 1] - sensor[i];
  }

  // 차이 배열을 내림차순으로 정렬한다.
  diff.sort((a, b) => b - a);

  return diff.slice(K - 1).reduce((prev, curr) => prev + curr);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);
const sensor = input[2].split(' ').map(Number);

console.log(solution(N, K, sensor));
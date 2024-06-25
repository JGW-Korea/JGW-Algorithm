function solution(n, times) {
  times.sort((a, b) => a - b);

  const dp = new Array(n).fill(0); // 누적합을 이용한 문제 풀이
  dp[0] = times[0];
  
  for(let i = 1; i < n; i++) {
    dp[i] = times[i] + dp[i - 1];
  }

  return dp.reduce((prev, curr) => prev + curr);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const times = input[1].split(' ').map(Number);

console.log(solution(n, times));
function solution(N, numbers) {
  const dp = new Array(N).fill(0);

  dp[0] = numbers[0];
  
  for(let i = 1; i < N; i++) {
    dp[i] = numbers[i] > numbers[i] + dp[i - 1] ? numbers[i] : numbers[i] + dp[i - 1];
  }

  return Math.max(...dp)
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, numbers));
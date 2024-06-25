function solution(n, prices) {
  let sum = 0; // 최대 이익
  let maxValue = prices[n - 1]; // 최대값을 나타내는 변수

  for(let i = n - 2; i >= 0; i--) {
    if(maxValue < prices[i]) maxValue = prices[i];
    else sum += maxValue - prices[i];
  }

  return sum;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const tc = Number(input.shift());

for(let i = 0; i < tc; i++) {
  const n = Number(input.shift());
  const prices = input.shift().split(' ').map(Number);

  console.log(solution(n, prices));
}
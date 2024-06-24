function solution(n) {
  let count = 0; // 설탕 봉지 개수

  while(n >= 0) {
    if(n === 0 || n % 5 === 0) {
      count += Math.floor(n / 5);
      n %= 5;
      break;
    }

    n -= 3;
    count += 1;
  }

  return n === 0 ? count : -1;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

console.log(solution(Number(input)));
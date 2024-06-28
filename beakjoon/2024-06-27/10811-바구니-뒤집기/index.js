function solution(N, M, range) {
  // 바구니의 숫자를 1 ~ N까지 표현하는 일차원 배열
  const cardNumbers = Array.from({ length: N + 1 }, (_, idx) => idx);

  for(const [i, j] of range) { // 범위를 가져오는 반복문

    let mid = Math.floor((i + j) / 2);
    
    for(let start = i; start <= mid; start++) {
      [cardNumbers[start], cardNumbers[(i + j) - start]]
       = [cardNumbers[(i + j) - start], cardNumbers[start]];
    }
  }

  return cardNumbers.slice(1).join(' ');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const range = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(N, M, range));
function solution(N, lines) {
  lines.sort((a, b) => a[0] - b[0]);
  
  let answer = 0;
  let start = lines[0][0];
  let end = lines[0][1];

  for(let i = 1; i < N; i++) {
    if(end < lines[i][0]) {
      answer += (end - start);
      start = lines[i][0];
      end = lines[i][1];
    } else if(lines[i][0] <= end && lines[i][1] >= end){
      end = lines[i][1];
    }
  }

  return answer + (end - start);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const lines = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(N, lines));
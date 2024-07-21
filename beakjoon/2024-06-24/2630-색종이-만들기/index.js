function solution(N, papers) {
  // 흰색, 파란색 색종이 개수
  let whitePaperCount = 0; 
  let bluePaperCount = 0;

  function divide(row, col, length) {
    let sum = 0;

    // 현재 색종이의 영역의 상태를 구한다.
    for(let i = row; i < row + length; i++) {
      for(let j = col; j < col + length; j++) {
        sum += papers[i][j];
      }
    }

    if(sum === length * length) bluePaperCount += 1; // 현재 색종이의 영역 상태가 파란색 종이만 있을 경우
    else if(sum === 0) whitePaperCount += 1; // 현재 색종이의 영역 상태가 흰색 종이만 있을 경우
    else {
      length = Math.floor(length / 2); // 현재 종이의 2/N 값을 계산한다.

      divide(row, col, length); // 1사분면
      divide(row, col + length, length); // 2사분면
      divide(row + length, col, length); // 3사분면
      divide(row + length, col + length, length); // 4사분면
      
    }
  }

  divide(0, 0, N);
  
  return whitePaperCount + "\n" + bluePaperCount;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const papers = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(N, papers));
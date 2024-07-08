function solution(N, papers) {
  const result = [0, 0, 0]; // -1, 0, 1의 개수
  
  function divide(row, col, length) {
    let count = [0, 0, 0];
    let size = length * length;

    for(let i = row; i < row + length; i++) {
      for(let j = col; j < col + length; j++) {
        switch(papers[i][j]) {
          case -1:
            count[0] += 1;
            break;
          case 0:
            count[1] += 1;
            break;
          case 1:
            count[2] += 1;
            break;
        }
      }
    }

    // 현재 -1, 0, 1로만 채워진 종이가 아닐 경우
    if(!count.includes(size)) {

      length = Math.floor(length / 3);

      divide(row, col, length); // 1사분면
      divide(row, col + length, length); // 2사분면
      divide(row, col + (length * 2), length); // 3사분면

      divide(row + length, col, length); // 4사분면
      divide(row + length, col + length, length); // 5사분면
      divide(row + length, col + (length * 2), length); // 6사분면

      divide(row + (length * 2), col, length); // 7사분면
      divide(row + (length * 2), col + length, length); // 8사분면
      divide(row + (length * 2), col + (length * 2), length); // 9사분면
    } else {
      result[count.indexOf(size)] += 1; // 맞을 경우 해당 위치에 값을 증가시킨다.
    }
  }

  divide(0, 0, N);
  
  return result.join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const papers = Array.from({length: N}, () => []);

for(let i = 1; i < N + 1; i++) {
  papers[i - 1] = input[i].split(' ').map(Number);
}

console.log(solution(N, papers));
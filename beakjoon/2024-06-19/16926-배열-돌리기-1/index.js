function solution(N, M, R, arr) {
  let answer = "";

  function rotate() {
    let min = Math.min(N, M); // 2차원 배열의 N x M의 값 중에서 최소값을 찾는다.
    let temp = Array.from({length: N}, () => new Array(M).fill(0)); // 임시 배열

    for(let limit = 0; limit < Math.floor(min / 2); limit++) {

      for(let j = (M - 2) - limit; j >= 0 + limit; j--) { // 윗 줄 반시계방향 회전
        temp[0 + limit][j] = arr[0 + limit][j + 1];
      }

      for(let j = 1 + limit; j < N - limit; j++) { // 왼쪽 줄 반시계방향 회전
        temp[j][0 + limit] = arr[j - 1][0 + limit];
      }

      for(let j = 1 + limit; j < M - limit; j++) { // 아랫 줄 반시계방향 회전
        temp[(N - 1) - limit][j] = arr[(N - 1) - limit][j - 1];
      }

      for(let j = (N - 2) - limit; j >= 0 + limit; j--) { // 오른쪽 줄 반시계방향 회전
        temp[j][(M - 1) - limit] = arr[j + 1][(M - 1) - limit];
      }
    }
    
    return temp;
  }
  
  for(let rot = 0; rot < R; rot++) { // 총 R번 만큼 회전시킨다.
    arr = rotate(); // 회전시킨 배열을 arr에 저장한다.
  }

  arr.forEach(element => answer += element.join(' ') + '\n');
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M, R] = input[0].split(' ').map(Number);
const arr = Array.from({length: N}, () => []);

for(let i = 1; i < N + 1; i++) {
  arr[i - 1] = input[i].split(' ').map(Number);
}

console.log(solution(N, M, R, arr));
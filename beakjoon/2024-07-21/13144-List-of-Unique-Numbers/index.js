function solution(N, numbers) {
  let isUsed = new Array(Math.max(...numbers) + 1).fill(false); // 현재 위치의 번호를 사용 유무를 판단하기 위한 일차원 배열
  let end = 0; // 수열에서 같은 수가 등장하지 않은 마지막 위치
  let count = 0; // 조건을 만족하는 경우의 수

  // 조건을 만족하는 경우의 수를 구하고 i번째 위치의 수는 다시 사용할 수 있다고 표시해야 되기 때문에 N까지 반복
  for(let i = 0; i < N; i++) {
  
    // 마지막 위치가 N 보다 작으면서 사용하고 있지 않을 수일 경우
    while(end < N && !isUsed[numbers[end]]) {
      isUsed[numbers[end++]] = true;
    }

    // 같은 수가 등장할 경우 경우의 수를 계산하고 i번째 위치의 수는 다시 사용할 수 있다고 표시한다.
    count += end - i;
    isUsed[numbers[i]] = false;
  }

  return count;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, numbers));
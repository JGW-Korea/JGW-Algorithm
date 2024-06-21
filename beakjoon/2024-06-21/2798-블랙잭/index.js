function solution(N, M, numbers) {
  let maxValue = Number.MIN_SAFE_INTEGER;

  // 총 3장의 카드를 선택할 수 있기 때문에 3중 반복문을 사용한다. (브루트 포스)
  for(let i = 0; i < N; i++) {
    for(let j = i + 1; j < N; j++) {
      for(let k = j + 1; k < N; k++) {
        if(numbers[i] + numbers[j] + numbers[k] <= M) {
          maxValue = Math.max(maxValue, numbers[i] + numbers[j] + numbers[k]);
        }
      }
    }
  }

  return maxValue; // M에 최대한 가까운 값을 반환한다.
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, M, numbers));
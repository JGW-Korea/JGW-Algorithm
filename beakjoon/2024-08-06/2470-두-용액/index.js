function solution(N, numbers) {
  numbers.sort((a, b) => a - b);
  
  const answer = [0, 0]; // 두 용액의 값을 담는다.
  let [p1, p2] = [0, N - 1]; // 두 개의 포인터를 설정한다.
  let temp = Number.MAX_SAFE_INTEGER; // 0에 가까운 수를 저장한다.

  while(p1 < p2) {
    
    const sum = numbers[p1] + numbers[p2];
    // 절대값을 이용해서 0에 가장 가까운 수를 계산한다.
    const abs = Math.abs(numbers[p1] + numbers[p2]);
    
    // 두 용액의 값을 처리한다.
    if(abs < temp) {
      temp = Math.min(temp, abs);
      answer[0] = numbers[p1];
      answer[1] = numbers[p2];
    }

    // 합계가 0보다 클 경우에는 p2 포인터를 1 감소한다.
    if(sum > 0) {
      p2 -= 1;
    } else { // 합계가 0보다 작을 경우에는 p1 포인터를 1 증가한다.
      p1 += 1;
    }
  }

  return answer.sort((a, b) => a - b).join(' ');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, numbers));
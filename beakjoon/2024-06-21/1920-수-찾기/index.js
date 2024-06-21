function solution(n, numbers1, m, numbers2) {
  numbers1.sort((a, b) => a - b); // 이진 탐색을 위해서는 반드시 탐색해야 될 배열이 정렬되어야 한다.
  
  const answer = []; // M개의 줄에 대한 답을 저장한다.

  for(const num of numbers2) {
    // 이진 탐색을 위한 left와 right
    let left = 0;
    let right = n;
    let flag = false; // 수가 있는지 판별

    // 이진 탐색 로직
    while(left <= right) {
      let mid = Math.floor((left + right) / 2); // 중간 값을 가져온다.

      if(num === numbers1[mid]) { // number1의 중간 값과 현재 값이 같을 경우
        flag = true;
        break;
      }

      if(num < numbers1[mid]) { // numbers1의 중간 값이 현재 값보다 큰 경우
        right = mid - 1;
      } else { // numbers1의 중간 값이 현재 값보다 작은 경우
        left = mid + 1;
      }
      
    }

    if(flag) answer.push(1);
    else answer.push(0);
  }

  return answer.join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

// N개의 자연수
const n = Number(input[0]);
const nNumbers = input[1].split(' ').map(Number);

// M개의 자연수
const m = Number(input[2]);
const mNumbers = input[3].split(' ').map(Number);

console.log(solution(n, nNumbers, m, mNumbers));
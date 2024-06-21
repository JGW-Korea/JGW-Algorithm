function solution(n, numbers) {
  numbers.sort((a, b) => a - b);
  const numbers2 = [];

  for(let i = 0; i < n; i++) {
    for(let j = i; j < n; j++) {
      numbers2.push(numbers[j] + numbers[i]);
    }
  }

  numbers2.sort((a, b) => a - b);

  let answer = 0;

  for(let i = 0; i < n; i++) {
    for(let j = i; j < n; j++) {
      let a = numbers[j] - numbers[i];
      let left = 0;
      let right = numbers2.length - 1;

      while(left <= right) {

        const mid = Math.floor((left + right) / 2);
        
        if(numbers2[mid] === a) {
          answer = Math.max(answer, numbers[j]);
          break;
        }

        if(a < numbers2[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
        
      }
    }
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const numbers = input.slice(1).map(Number);

console.log(solution(n, numbers));
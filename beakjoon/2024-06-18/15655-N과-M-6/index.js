function solution(N, M, numbers) {
  numbers.sort((a, b) => a - b);

  const number = new Array(M).fill(0);
  const isUsed = new Array(Math.max(...numbers) + 1).fill(false);

  let result = '';

  function dfs(currentLength) {

    if(currentLength === M) {

      for(let i = 1; i < M; i++) {
        if(number[i - 1] > number[i]) return
      }
      
      result += number.join(' ') + '\n';
      return;
    }

    for(let i = 0; i < N; i++) {
      if(!isUsed[numbers[i]]) {
        number[currentLength] = numbers[i];
        isUsed[numbers[i]] = true;
        dfs(currentLength + 1);
        isUsed[numbers[i]] = false;
      }
    }
  }

  dfs(0);

  return result;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, M, numbers.sort((a, b) => a - b)));
function solution(N, K, elements) {
  const numbers = [];

  let result = 0;
  
  function permutation(currentLength, length) {
    if(currentLength === length) {
      let value = Number(numbers.join(''));

      if(Number(N) >= value) result = Math.max(result, value);
      return;
    }

    for(let i = 0; i < K; i++) {
      numbers.push(elements[i]);
      permutation(currentLength + 1, length);
      numbers.pop();
    }
  }


  for(let i = 1; i <= N.length; i++) {
    permutation(0, i);
  }
  
  return result;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const elements = input[1].split(' ').map(Number);

console.log(solution(String(N), K, elements.sort((a, b) => b - a)));
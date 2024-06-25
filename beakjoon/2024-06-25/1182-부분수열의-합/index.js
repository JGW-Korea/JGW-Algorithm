function solution(N, S, numbers) {
  let count = 0; // 부분 수열의 합이 S가 되는 경우의 수
  
  function dfs(currentLength, total) {
    if(currentLength === N) {
      if(total === S) count += 1;
      return;
    }

    // 부분 집합 로직
    dfs(currentLength + 1, total);
    dfs(currentLength + 1, total + numbers[currentLength]);
  }

  dfs(0, 0);
  
  return S === 0 ? count - 1 : count;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, S] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

console.log(solution(N, S, numbers));
function solution(n, foods) {
  let minValue = Number.MAX_SAFE_INTEGER; // 신맛과 쓴맛의 가장 차이가 작은 값

  // s(Sour taste) = 신맛, b(bitter) = 쓴맛
  function dfs(currentLength, currentIndex, s, b) {
    if(currentLength > 0) {
      minValue = Math.min(minValue, Math.abs(s - b));
    }
    
    for(let i = currentIndex; i < n; i++) {
      dfs(currentLength + 1, i + 1, s * foods[i][0], b + foods[i][1]);
    }
  }
  
  dfs(0, 0, 1, 0);

  return minValue;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]); // 재료의 개수
const foods = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(n, foods));
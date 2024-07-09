function solution(N, scores) {
  let count = 0; // 점수를 몇 번 감소시켰는지 나타내는 변수
  let idx = 0;
  
  while(true) {
    let flag = false;
    
    while(idx < N && scores[idx] >= scores[idx + 1]) {
      scores[idx] -= 1;
      count += 1;
    }

    for(let i = 1; i < N; i++) {
      if(scores[i - 1] >= scores[i]) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }

    if(flag) break;
    idx += 1;

    if(idx >= N) idx = 0;
  }
  
  return count;
}

const fs = require('fs');
const [N, ...scores] = 
  fs.readFileSync('index.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);


console.log(solution(N, scores));
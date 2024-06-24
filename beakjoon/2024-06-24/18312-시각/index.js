function solution(N, K) {
  let count = 0;
  
  for(let hours = 0; hours <= N; hours++) {
    for(let minutes = 0; minutes < 60; minutes++) {
      for(let seconds = 0; seconds < 60; seconds++) {

        if(
          hours.toString().padStart(2, '0').includes(K) ||
          minutes.toString().padStart(2, '0').includes(K) ||
          seconds.toString().padStart(2, '0').includes(K)
        ) {
          count += 1;
        }
        
      }
    }
  }
  
  return count;
}

const fs = require('fs');
const [N, K] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, K.toString()));
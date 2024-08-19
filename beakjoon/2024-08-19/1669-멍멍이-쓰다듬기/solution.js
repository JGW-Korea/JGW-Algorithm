function solution(X, Y) {
  if(X === Y) return 0;
  
  let dif = Y - X;
  let day = 0;

  for(let i = 1; i < 2 ** 31; i++) {
    for(let j = 0; j < 2; j++) {
      if(dif <= 0) {
        return day;
      }

      day += 1;
      dif -= i;
    }
  }
}

const fs = require('fs');
const [X, Y] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(X, Y));
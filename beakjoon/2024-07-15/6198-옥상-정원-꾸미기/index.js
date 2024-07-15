const fs = require('fs');
const [N, ...heights] = fs.readFileSync('index.txt').toString().trim().split('\n').map(Number);

let result = 0;

for(let i = 0; i < N; i++) {
  let count = 0;

  for(let j = i + 1; j < N; j++) {
    if(heights[i] > heights[j]) {
      count += 1;
    } else {
      break;
    }
  }

  result += count;
}

console.log(result);
function solution(n, paper) {

  const size = [128, 64, 32, 16, 8, 4, 2, 1].filter(element => element <= n);
  let blueColorCount = 0;
  let whiteColorCount = 0;

  size.forEach((element) => {

    for(let i = 0; i <= n - element; i += element) {
      for(let j = 0; j <= n - element; j += element) {

        let color = paper[i][j];
        let flag = false;

        outer:
        for(let x = i; x < i + element; x++) { 
          for(let y = j; y < j + element; y++) {
            if(paper[x][y] === 2 || paper[x][y] !== color) {
              flag = true;
              break outer;
            }
          }
        }

        if(!flag) {
          if(color === 0) whiteColorCount += 1;
          else if(color === 1) blueColorCount += 1;

          for(let x = i; x < i + element; x++) {
            for(let y = j; y < j + element; y++) {
              paper[x][y] = 2;
            }
          }
          
        }
      }
    }
    
  });

  return whiteColorCount + "\n" + blueColorCount;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const paper = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(n, paper));
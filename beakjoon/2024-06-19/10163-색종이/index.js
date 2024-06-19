function solution(n, papers) {
  // 색종이가 놓이는 평명은 10000 x 10000으로 구성된 격자 모양의 직사각형 모양이다.
  const note = Array.from({length: 1001}, () => new Array(1001).fill(0));

  // 주어진 색종이 개수만큼 평면에 붙인다. 
  for(let paper = 1; paper <= n; paper += 1) {
    const [a, b, c, d] = papers[paper - 1];

    let currentXPos = 1000 - b;
    let currentYPos = a;

    // 평면에 색종이를 붙일 위치를 통해 색종이를 붙인다. (x, y 좌우반전)
    for(let x = currentXPos; x > currentXPos - d; x--) {
      for(let y = currentYPos; y < currentYPos + c; y++) {
        note[x][y] = paper;
      }
    }
  }

  const answer = [];
  
  // 입력에서 주어진 순서대로 색종이가 보이는 부분의 면적을 확인한다.
  for(let paper = 1; paper <= n; paper += 1) {
    let width = 0;

    for(let x = 0; x < 1001; x++) {
      for(let y = 0; y < 1001; y++) {
        if(note[x][y] === paper) width += 1;
      }
    }

    answer.push(width);
  }

  return answer.join('\n');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const papers = [];

for(let i = 1; i < n + 1; i++) {
  // const [a, b, c, d] = ;
  papers.push(input[i].split(' ').map(Number));
}

console.log(solution(n, papers));
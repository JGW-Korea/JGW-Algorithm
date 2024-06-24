function solution(n, r, c) {
  let res = 0;
  let answer = 0;

  function dfs(row, col, size) {
    if(row === r && col === c) {
      answer = res;
      return;
    }

    if(r >= row && r < row + size && c >= col && c < col + size) {
      size = Math.floor(size / 2);
      dfs(row, col, size); // 1 사분면
      dfs(row, col + size, size); // 2 사분면
      dfs(row + size, col, size); // 3 사분면
      dfs(row + size, col + size, size); // 4 사분면
    } else {
      res += size * size
    }
  }
  
  // function dfs(row, col, size) {
  //   if (row === r && col === c) {
  //     answer = res;
  //     return;
  //   }
  //   if (r >= row && r < row + size && c >= col && c < col + size) {
  //     // 영역 내에 있음
  //     size = Math.floor(size / 2);
  //     dfs(row, col, size);
  //     dfs(row, col + size, size);
  //     dfs(row + size, col, size);
  //     dfs(row + size, col + size, size);
  //   } else res += size * size; // 좌표 못 찾음!
  // }

  dfs(0, 0, Math.pow(2, n));

  return answer;
}

const fs = require('fs');
const [N, R, C] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, R, C));
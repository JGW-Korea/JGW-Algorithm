function solution(k, n, result, board) {
  let flag = false; // 도착순서 문자열과 같은지 판별
  let answer = ""; // 감추어진 가로 줄
  
  function recursion(x, y, player, currentResult, hideComb, temp) {
    console.log(x, y);
    
    // 현재 출발한 선수가 도착했을 경우
    if(x === n) {
      currentResult[y] = player; // 출발한 선수의 도착 위치를 담는다.
      const current = currentResult.join(''); // 모든 도착 인원들을 담은 배열을 문자열로 변환시킨다.
      
      if(current.length === k && current === result) { // 문자열의 길이가 선수들의 수와 같으면서 입력된 도착한 순서와 같을 경우
        flag = true;
        answer = hideComb.join('');
      }
      
      return;
    }

    // 현재 출발한 선수가 아직 마지막 위치까지 도달하지 못했을 경우
    if((y - 1 >= 0 || y + 1 < k) && x + 1 <= n) {
      if(temp[x][y + 1] === '-') y += 1;
      else if(temp[x + 1][y] === '-') {
        x += 1;
        y -= 1;
      } else if(temp[x + 1][y] === '?') {
        recursion(x + 1, y, player, currentResult, hideComb[y] = '*', temp[x + 1][y] = '*');
        recursion(x + 1, y, player, currentResult, hideComb[y] = '-', temp[x + 1][y] = '-');
      } else {
        recursion(x + 1, y, player, currentResult, hideComb, temp);
        recursion(x + 1, y, player, currentResult, hideComb, temp);
      }
    }
    
  }

  // 현재 위치(X, Y), 출발하고 있는 인원, 도착한 순서, 사다리 숨겨진 구성 조합, 입력으로 주어진 사다리 구성
  recursion(0, 0, 'A', new Array(k).fill(''), new Array(k -1).fill(''), board);

  return flag ? answer : '*'.repeat(k-1);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const k = Number(input[0]);
const n = Number(input[1]);
const result = input[2];
const board = input.slice(3).map(element => ['*', ...element.split('')]);

console.log(solution(k, n, result, board));
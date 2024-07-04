const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const board = input.slice(1).map(element => element.split(' ').map(Number));

const maxDP = new Array(3).fill(0);
const minDP = new Array(3).fill(0);
const tempMaxDP = new Array(3).fill(0);
const tempMinDP = new Array(3).fill(0);

for(let i = 0; i < N; i++) {
  const [left, mid, right] = board[i];

  if(i === 0) {
    maxDP[0] = minDP[0] = left;
    maxDP[1] = minDP[1] = mid;
    maxDP[2] = minDP[2] = right;
  } else {
    tempMaxDP[0] = Math.max(maxDP[0], maxDP[1]) + left;
    tempMaxDP[1] = Math.max(maxDP[0], maxDP[1], maxDP[2]) + mid;
    tempMaxDP[2] = Math.max(maxDP[1], maxDP[2]) + right;

    tempMinDP[0] = Math.min(minDP[0], minDP[1]) + left;
    tempMinDP[1] = Math.min(minDP[0], minDP[1], minDP[2]) + mid;
    tempMinDP[2] = Math.min(minDP[1], minDP[2]) + right;

    [maxDP[0], maxDP[1], maxDP[2]] = [tempMaxDP[0], tempMaxDP[1], tempMaxDP[2]];
    [minDP[0], minDP[1], minDP[2]] = [tempMinDP[0], tempMinDP[1], tempMinDP[2]];
  }

}

console.log(Math.max(...maxDP) + " " + Math.min(minDP));
function binarySearch(target, arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return false;
    }

    if (target < arr[mid]) right = mid - 1;
    else left = mid + 1;
  }

  return true;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);
const B = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let result = [];

for (let i = 0; i < N; i++) {
  if (binarySearch(A[i], B)) {
    result.push(A[i]);
  }
}

if(result.length) console.log(result.length + "\n" + result.sort((a, b) => a - b).join(' '));
else console.log(0);
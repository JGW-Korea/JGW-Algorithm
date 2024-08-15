const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const memos = input.slice(1, N + 1).map(element => element.split(' '));
const targets = input.slice(N + 1);

const notepad = {};
let result = "";

memos.forEach(([memo, pwd]) => {
  notepad[memo] = pwd;
});

targets.forEach(target => result += notepad[target] + "\n");

console.log(result);
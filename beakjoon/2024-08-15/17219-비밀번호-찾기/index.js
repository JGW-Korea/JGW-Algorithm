const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const memos = input.slice(1, N + 1).map(element => element.split(' '));
const targets = input.slice(N + 1);

const notepad = {}; // 객체를 이용해서 사이트의 주소와 비밀번호를 담는다.
let result = "";

memos.forEach(([site, pwd]) => notepad[site] = pwd); // 사이트의 주소를 Key, 비밀번호를 Value로 담는다.

// 저장된 사이트 주소의 원소를 통해서 객체의 Key에 접근을 해서 Value 값을 넣어준다.
targets.forEach(element => result += notepad[element] + "\n");
console.log(result);
const fs = require('fs');
const input = fs.readFileSync('./beakjoon/index.txt').toString().trim().split(' ').map(Number);

console.log(input);
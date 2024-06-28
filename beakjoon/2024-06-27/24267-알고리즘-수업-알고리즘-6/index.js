const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

const result = (BigInt(input) * BigInt(input - 1) * BigInt(input - 2)) / BigInt(4);
console.log(result.toString());
console.log(3);
function solution(str) {
  const stack = [];

  for (const letter of str) {
    if (!["(", ")", "[", "]"].includes(letter)) continue;
    else {
      if (["(", "["].includes(letter)) stack.push(letter);
      else {
        if (letter === ")" && stack[stack.length - 1] !== "(") return 'no';
        else if (letter === "]" && stack[stack.length - 1] !== "[") return 'no';
        stack.pop();
      }
    }
  }
  return stack.length ? 'no' : 'yes';
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

let result = "";

for(let i = 0; i < input.length - 1; i++) {
  result += solution(input[i]) + "\n";
}

console.log(result);
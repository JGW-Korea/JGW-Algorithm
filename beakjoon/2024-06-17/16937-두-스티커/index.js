
function solution(h, w, n, stickers) {
  // H x W 크기의 모눈종이를 2차원 배열로 표현한다.
  let paper = Array.from({ length: h }, () => new Array(w).fill(0));
  let count = 0; // 붙인 스티커의 개수

  // 2차원 배열 회전하는 함수
  function rotate(r, c, sticker) {
    const temp = Array.from({ length: c }, () => new Array(r).fill(0));

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        temp[j][r - 1 - i] = sticker[i][j];
      }
    }

    return [c, r, temp];
  }

  // 모눈 종이에 스티커를 붙이는 함수
  function pastable(x, y, sticker, r, c) {

    // 스티커를 붙일 수 있는지 확인한다.
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (paper[x + i][y + j] === 1 && sticker[i][j] === 1) return false;
      }
    }

    // 스티커를 붙일 수 있다면 스티커를 모눈 종이 위에 붙인다.
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        paper[x + i][y + j] = 1;
      }
    }

    return true;
  }

  // 주어진 스티커를 가져온다.
  for (let [r, c, sticker] of stickers) {
    for (let rot = 0; rot < 4; rot++) {
      // 스티커를 총 4번 회전시킨다.
      let isPaste = false;

      // 스티커를 모눈 종이 가장 위쪽에서 왼쪽으로 붙이기 시작한다.
      for (let x = 0; x <= h - r; x++) {
        if (isPaste) break;

        for (let y = 0; y <= w - c; y++) {
          if (pastable(x, y, sticker, r, c)) {
            isPaste = true;
            count += 1; // 스티커를 붙인 개수를 1 증가한다.
            break;
          }
        }
      }

      if (isPaste) break;
      [r, c, sticker] = rotate(r, c, sticker);
    }
  }

  // 스티커가 붙여진 영역 구하기
  if(count < 2) return 0; // 스티커가 2개 이상 붙여지지 않았다면 0을 반환한다.
  else {
    let answer = 0;

    for(let i = 0; i < h; i++) {
      for(let j = 0; j < w; j++) {
        if(paper[i][j] === 1) answer += 1;
      }
    }

    return answer; // 스티커 영역을 반환한다.
  }
  
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n"); // 제출 시 /dev/stdin로 수정


const [h, w] = input[0].split(" ").map(Number);
const n = Number(input[1]);
const stickers = [];

for (let i = 2; i < input.length; i++) {
  const [r, c] = input[i].split(" ").map(Number);
  const sticker = Array.from({ length: r }, () => new Array(c).fill(1));

  stickers.push([r, c, sticker]);
}

console.log(solution(h, w, n, stickers));

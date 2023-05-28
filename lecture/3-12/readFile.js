// 콜백 지옥을 방지하기 위해 promises 지원.
const fs = require("fs").promises;

// node에선 콜백이 대부분 에러와 데이터 순서로 간다.
fs.readFile("./readme.txt")
  .then((data) => {
    // 2진법을 16진법으로 바꾼 데이터.
    console.log(data);
    // 문자화
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });

// const fs = require("fs");

// // node에선 콜백이 대부분 에러와 데이터 순서로 간다.
// fs.readFile("./readme.txt", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   // 2진법을 16진법으로 바꾼 데이터.
//   console.log(data);
//   // 문자화
//   console.log(data.toString());
// });

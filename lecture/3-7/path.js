const path = require("path");

// 아래처럼 써주면 운영체제에 따라 경로를 알아서 구별해준다.
// join은 절대경로가 들어있다면 절대경로를 무시.
path.join(__dirname, "..", "var.js");

//resolve는 join과 비슷. (resolve는 절대경로를 존중해서 앞에 있는 것들을 무시.)
// 현재 경로의 var,js
console.log(path.resolve(__dirname, "..", "./var.js"));
// root 경로(가장 상위 폴더)의 var.js
console.log(path.resolve(__dirname, "..", "/var.js"));

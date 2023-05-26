//구조분해 할당 시에는 속성명과 변수명이 같아야한다.
const { odd, even } = require("./var");
//변수명을 마음대로 지을 수 있음.
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));

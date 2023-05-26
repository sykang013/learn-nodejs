const { odd, even } = require("./var");
//require는 노드에서 제공해주는 메서드(외부 모듈을 가져올 수 있게 해준다.)

//아래. 구조분해할당이 등장하기 전에는 아래와 같이 일일이 해줬어야했음.
// const value = require("./3-2-var.js");
// const odd = value.odd;
// const even = value.even;

function checkOddOrEven(number) {
  if (number % 2) {
    return odd;
  } else {
    return even;
  }
}

//module.exports는 파일에서 단 한번만 써야한다.
module.exports = checkOddOrEven;

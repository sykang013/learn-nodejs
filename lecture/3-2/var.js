const odd = "홀수입니다";
const even = "짝수입니다";

// 모듈 기본 작성법
// module.exports = {
//   odd,
//   even,
// };

// 모듈도 생략이 가능함.
exports.odd = odd;
exports.even = even;

// 위 예제의 경우에는 아래가 적용된다.
// module.exports === exports === {}

// 다만, 모듈로 함수를 내보낼 경우 이름을 바꾸면 (checkOddOrEven 같이) 참조 관계가 끊어지므로 모듈.익스포트와 익스포트는 달라지게 된다.
// module.exports !== exports === {}

// 고로 한가지만 내보내고 싶으면 module.exports = function
// 두가지 이상을 내보내고 싶으면 module.exports = { odd, even } 을 쓰거나,
//// exports.odd = odd;  exports.even = even;  이렇게 사용

// module.exports 와 exports.a 는 같이 쓸 수 없다.

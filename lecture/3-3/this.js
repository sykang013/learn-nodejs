// JS에서 this를 출력하면 브라우저에서는 윈도우가(전역갹채) 출력 됨.
// 노드에서 전역스코프(anonymous)의 this는 global이 아님. 출력해보면 빈객체가 나온다.
// 빈 객체가 나오는 이유가 this === module.exports === {} === exports 라서.
// 고로, 노드의 전역 스코프에서의 this는 module.exports 이다.
console.log(this); //글로벌이 아님
console.log(this === module.exports);

// 다만 function 안에 들어있는 this는 글로벌
function a() {
  console.log(this === global);
}

a();

// 그 외에는 JS의 this와 똑같음.

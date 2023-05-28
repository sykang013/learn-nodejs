// node가 http를 쉽게 만들 수 있도록 제공
const http = require("http");

// 응답을 거부할 수도 있음
const server = http
  .createServer((req, res) => {
    // 아래: 얘네도 stream 이다.
    res.write("<h1>Hello Node!</h1>");
    res.write("<p>Hello server</p>");
    res.end("<p>Hello Soo</p>");
  })

  // 서버도 프로그램이기 때문에 process로 올려줘야한다.
  // process로 올릴 떄에는 port를 하나 잡아먹는다.
  // 서버를 하는 경우(listen)에는 터미널 하나를 소비한다.
  .listen(
    8080
    // , () => {
    // console.log("8080번 포트에서 서버 대기 중입니다");}
  );
// listening이란 이벤트가 있어서 콜백을 뺄 수도 있다.
server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다");
});
// 비동기는 에러 핸들링 꼭 해주기
server.on("error", (error) => {
  console.error(error);
});

// node 에서 제공해주는 require 메서드를 통해 외부 모듈을 가져올 수 있다.
const http = require("http");

// 서버 만들기(req 요청, res 응답)
http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("Hello Cookie");
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다.");
  });

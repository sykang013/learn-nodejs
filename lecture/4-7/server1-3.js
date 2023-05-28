const https = require("https");
const fs = require("fs");

// https는 인증키를 인증기관에서 가져오는 절차를 거쳐야한다.
https
  .createServer(
    {
      // 서버에서 sync 써도 되는 경우 (딱 한번만 실행할 때, 서버에서는 (서버 시작 전) 초기화할 때)
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Server!</p>");
    }
  )
  // https인 경우는 443을 많이 쓴다(포트번호 생략이 가능하니까)
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중입니다!");
  });

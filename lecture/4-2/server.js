// node가 http를 쉽게 만들 수 있도록 제공
const http = require("http");
const fs = require("fs").promises;

// async는 꼭 에러처리
const server = http
  .createServer(async (req, res) => {
    try {
      // 어떤 브라우저의 경우 html인지 못알아먹는 경우가 있는데-safari- 아래와 같이 직접 알려준다
      // html 부분은 파일을 따로 빼서 그 파일을 읽어오게 하는게 깔끔.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      const data = await fs.readFile("./server.html");
      res.end(data);
    } catch (error) {
      console.error(err);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })

  .listen(8080);
server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다");
});
server.on("error", (error) => {
  console.error(error);
});

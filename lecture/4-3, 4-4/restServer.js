const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {}; // 데이터 저장용. 메모리에 저장되는 것이라 서버 재시작시 정보 지워짐

// 서버 만들기 (req = request, res = response)
http
  .createServer(async (req, res) => {
    try {
      // http 메소드가 GET 요청이고, url이 / 일 때(이 때 /는 http://localhost:8082 <-맨 뒤에 생략되어 브라우저에서 표기된다)
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile(
            // restFront.html 을 읽어서 전달해줘라
            path.join(__dirname, "restFront.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8", // json 형식으로 보내겠다
          });
          return res.end(JSON.stringify(users));
        }
        // /도 /about도 /users도 아니면
        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
      }
      // POST 요청은 데이터를 같이 보낸다. 그 데이터를 서버에서 받아서 처리해주는것.
      else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            // 200번을 써도 되긴 하는데, 201 번은 '생성됨' 이라는 의미가 있다.(구체적))
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다");
  });

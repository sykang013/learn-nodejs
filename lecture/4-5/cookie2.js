const http = require("http");
const fs = require("fs").promises;
const path = require("path");

//  문자열을 객체로 바꿔주는 함수
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8084");
      const name = url.searchParams.get("name");
      const expires = new Date();
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정(유효시간 미설정시 session cookie 됨.)
      expires.setMinutes(expires.getMinutes() + 5);
      // 301 이나 302 는 redirection
      res.writeHead(302, {
        Location: "/",
        // encodeURIComponen 는 한글입력의 경우 발생 오류 방지를 위해 사용
        "Set-Cookie": `name=${encodeURIComponent(
          name
          // 쿠키의 만료기간을 넣지 않으면 session cookie가 된다.
          // HttpOnly 는 JS 로 쿠키에 접근하지 못하게 사용(보안 이슈. 특히 로그인)
          // Path=/ 는 / 아래에 있는 페이지에서는 cookie가 유효하다.
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
      // name이라는 쿠키가 있는 경우 아래가 실행
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    }
    // 그 외는 아래 실행
    else {
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });

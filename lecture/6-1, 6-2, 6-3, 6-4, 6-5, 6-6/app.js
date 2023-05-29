const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("combined"));
app.use(cookieParser("cookiepassword"));
// 바디파서가 express 안에 5년 전쯤 포함됨. 아래 두 줄은 거의 필수로 넣음. req.on 같은것을 안써줘도 알아서 데이터를 파싱해줌
app.use(express.json()); // client에서 json 데이터를 보냈을 때 json 데이터를 파싱
app.use(express.urlencoded({ extended: true })); // client에서 form 을 파싱 // true면 qs, false 면 querystring 인데 qs가 강력하니 그거 추천

app.get("/", (req, res, next) => {
  // req.cookies; // 쿠키 파서 : 번거로운 과정 없이 쿠키파싱이 되어있고, express에서 쿠키 사용할 수 있게 됨.
  // req.signedCookies; // 서명된 쿠키(비밀번호로 접근해서 해커들이 브라우저에서 읽지 못하게 하는)
  // 아래와 같이 쓰기 불편했던 것을
  // 'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
  // 이렇게 처리할 수 있음
  // res.cookie("name", encodeURIComponent(name), {
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: "/",
  // });
  // // 쿠키 지우기
  // res.clearCookie("name", encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: "/",
  // });
  req.body.name; // 바디파서
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/category/Javascript", (req, res) => {
  res.send("hello Javascript");
});

app.get("/category/:name", (req, res) => {
  res.send("hello wildcard");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

app.use((req, res, next) => {
  res.status(404).send("404page 입니다");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러가 발생했습니다. 주요 정보는 표시되지 않습니다.");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});

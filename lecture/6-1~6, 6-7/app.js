const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(cookieParser("cookiepassword"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session());
/* -------------------------------------------------------------------------- */
/*                                 static 미들웨어                                */
/* -------------------------------------------------------------------------- */
// app.use("요청 경로", express.static("실제 경로"));
//// 요청경로 ex. localhost:3000/hello.css
//// 실제경로 ex. lecture/public/hello.css
//// 이렇게 가면 보안에 좋음(img, pdf, mov 등 가능)
app.use("/", express.static(__dirname, "public")); // html, css 같은 정적 파일 보내줄 때 사용

app.get("/", (req, res, next) => {
  req.body.name;
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

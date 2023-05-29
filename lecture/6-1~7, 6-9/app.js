/* -------------------------------------------------------------------------- */
/*                                   multer                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 1) multer 임포트
const multer = require("multer");
const fs = require("fs");

// 업로드 폴더 생성(서버 시작 전 만드는 것이라 sync 매서드 사용가능)
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
// multer를 호출하고 그 결과물을 upload에 담음
// 2) storage(업로드한 파일을 어디에 저장하느냐 ex.디스크 or 메모리 or, 구글클라우드 같은 클라우드 등)와
//// limits 라는 자주 쓰이는 두 옵션
const upload = multer({
  storage: multer.diskStorage({
    //// 어디다 저장할지 ('현재 폴더의 uploads라는 폴더에 저장하겠다)
    destination(req, file, done) {
      done(null, "uploads/");
    },
    // 어떤 이름으로 저장할지 (덮어씌워짐을 방지하기위한 Date.now)
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
// upload 안에 single 이라는 미들웨어
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

app.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 갑니다.");
  }
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

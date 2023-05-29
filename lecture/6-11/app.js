/* -------------------------------------------------------------------------- */
/*                                   dotenv                                  */
/* -------------------------------------------------------------------------- */

// dotenv 불러오기 (dotenv는 털리면 안된다. 드라이브, 클라우드, 깃 같은 곳에 올리면 안됨.)
const dotenv = require("dotenv");
// dotenv는 최대한 위에서 불러오는것이 좋다. 중요 정보들을 넣어줘야하기 때문에.
// processenv 값을 사용하는(그 값에 따라 동작이 달라지는) 패키지가 있다면, 그 패키지보다 위에 있어야한다.
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
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

/* -------------------------------------------------------------------------- */
/*                                   multer                               */
/* -------------------------------------------------------------------------- */
// 1) multer 임포트
const multer = require("multer");
const fs = require("fs");

// 1-1)업로드 폴더 생성(서버 시작 전 만드는 것이라 sync 매서드 사용가능)
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
// 2) storage(업로드한 파일을 어디에 저장하느냐 ex.디스크 or 메모리 or, 구글클라우드 같은 클라우드 등)와
//// limits 라는 자주 쓰이는 두 옵션으로 어디다가, 어떻게, 어떤 이름으로 할지 설정.
//// 'multer를 호출하고 그 결과물을 upload에 담아라'
const upload = multer({
  storage: multer.diskStorage({
    //// 어디다 저장할지 ('현재 폴더의 uploads라는 폴더에 저장하겠다)
    destination(req, file, done) {
      done(null, "uploads/");
    },
    //// 어떤 이름으로 저장할지 (덮어씌워짐을 방지하기위한 Date.now )
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      //// done(첫번째 인수 자리는 보통 null, 두번째 자리부터는 애러처리)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
// 3) upload 라는 객체를 라우터에 장착
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

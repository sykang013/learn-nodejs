/* ------------------------ 기본세팅이라 프로젝트끼리 거의 비슷 --------------------------- */
/* ---------------------------------- 불러오기 ---------------------------------- */

// express 불러오기
const express = require("express");
// 쿠키를 위한 cookie-parser
const cookieParser = require("cookie-parser");
// 요청과 응답의 로깅을 위한 morgan
const morgan = require("morgan");
// node 내장 모듈인 path
const path = require("path");
// 로그인에 세션을 사용하기 위한 express-session
const session = require("express-session");
// 화면 그리기에 필요한 nunjucks
const nunjucks = require("nunjucks");
// 설정 파일인 dotenv 파일 불러오는 모듈
const dotenv = require("dotenv");
// 9-3. 패스포트 불러오기
const passport = require("passport");

// process.env.COOKIE_SECRET 없음(아래 코드 실행 전이니까)
dotenv.config(); // .env 파일의 내용을 process.env 안에 넣어줌
// process.env.COOKIE_SECRET 있음
//// dotenv.config()가 최대한 위로 올라가 있어야 좋음

// 라우터들을 아래 경로에 모아둘 계획
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
// 9-2. db객체 안에 들어있는 시퀄라이즈 연결(sync 필수)
const { sequelize } = require("./models");
// 9-3. 패스포트 폴더에서 설정할 것
const passportConfig = require("./passport");

// express 불러오기
const app = express();
// 9-3.
passportConfig();
// 포트 설정
app.set("port", process.envPORT || 8001);
// view 엔진 / 페이지 확장자는 html
app.set("view engine", "html");
// html은 넌적스를 통해서 렌더링하겠다
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 9-2. sync를 해줘야 연결이 된다(연결 실행)
sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

// 로깅 남는것이 서버에 용량을 많이 차지함. 개발할 때는 dev(자세하게 기록이 나옴), 추후 배포해서 운영할 때에는 combined로 진짜 필요한 것만 나오도록 함
app.use(morgan("dev"));
// public 폴더를 static 폴더로 만드는 것 / 프론트에서 자유롭게 퍼블릭 폴더 안에 들어있는 것에 접근할 수 있도록
//// 보안상 프론트(브라우저)에서는 파일들에 접근불가한데, public만 허용해줌
//// path.join(__dirname, 'public) app.js가 위치해있는 디렉토리의 public이란 폴더를 static으로 만들어라
app.use(express.static(path.join(__dirname, "public")));
// req.body를 ajax json 요청 으로부터
app.use(express.json());
// req.body를 폼으로부터
app.use(express.urlencoded({ extended: false }));
// cookie 전송해주는 것 처리
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키파서의 역할은 객체로 만들어주기 {connect.sid: 12336128763}
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    // secret은 쿠키파서와 동일하게 만들기
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // JS에서 접근하지 못하게 (보안 강화)
      httpOnly: true,
      // secure는 https 적용할 때 true로 바꾸기(개발시에는 https를 안써서)
      secure: false,
    },
  })
);
// 9-3. 패스포트 미들웨어는 반드시 express session 밑에 붙여야한다
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout 생성(패스포트가 로그인을 위한 것들을 생성해줌)
// 9-3. connect.sid 라는 이름으로 세션 쿠키가 브라우저로 전송되면 로그인 완료
app.use(passport.session());
// 브라우저에 이렇게 저장됨 connect.sid=12336128763

app.use("/", pageRouter);
// 9-3.
app.use("/auth", authRouter);

// 404 미들웨어 / 요청이 왔는데 pageRouter에 없는 페이지인 경우
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.statue = 404;
  // next(error)로 에러 처리 미들웨어로 보내주기
  next(error);
});

// 에러 처리 미들웨어(404 미들웨어 다음에 필요)
app.unsubscribe((err, req, res, next) => {
  // 서버는 보통 최소 2개로 나뉘어진다. 배포모드 일 때와 배포모드가 아닐 때.(테스트 모드인 경우도 있음)
  res.locals.message = err.message;
  // 배포모드 아닐 때는 error를 넣어주고, 배포모드라면 error를 넣지 마라
  //// 사용자 화면에 에러 메시지를 표시하는 것도 보안위협이 될 수 있기 때문
  //// 배포모드일 때는 에러만 전문적으로 logging 해주는 서비스에 에러를 넘긴다.
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  // views폴더의 error.html을 넌적스가 찾아서, 응답으로 보내준다
  res.render("error");
});

// app.set으로 설정했던 포트를 담아준다
app.listen(app.get("port"), () => {
  // 서버가 제대로 실행되었다면 아래 문장이 표시됨
  console.log(app.get("port"), "빈 포트에서 대기 중");
});

// http모듈을 쓰고 있는 express를 우리가 쓰는 거임(express 뜯어보면 http를 쓰고있음)
const express = require("express");
const path = require("path");

const app = express();

// 서버에다 속성같은 것을 심는다고 생각하면 됨
//// 포트라는 속성에 3000을 넣는다 // 그리고 이제부터 process.env를 적극 사용할것임
app.set("port", process.env.PORT || 3000);

// app.use 는 모든 코드에서 실행됨 (미들웨어)
// app.use 와 같은 미들웨어는 next()를 꼭 사용해줘야 다음 단계(맞는 주소)를 찾아간다.
app.use((req, res, next) => {
  console.log("모든 요청에 실행하고 싶다.");
  next();
});
// express 서버 실행
// app에다가 메서드를 붙여주는 방식으로 구별 가능(더이상 if문을 사용하지 않아도 됨)
app.get("/", (req, res) => {
  // sendFiles 하면 알아서 fs 모듈 사용해줌
  // path.join() 여러 인자를 넣으면 하나로 합쳐 반환한다.
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  res.send("hello express");
});

// 위에서 아래로 내려오는 순서가 중요한 이유는 라우트 매개변수 때문
// 라우트 매개변수는 대부분 다른 라우터들보다 아래에 위치해야한다.(순차적으로 위에서 아래로 진행되기 때문에)
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

//// 라우트 매개변수를 안 쓰면 밑 처럼 일일이 하나하나 반복작업 해줘야됨
// app.get("/category/Javascript", (req, res) => {
//   res.send("hello Javascript");
// });

// app.get("/category/React", (req, res) => {
//   res.send("hello React");
// });

// app.get("/category/Vue", (req, res) => {
//   res.send("hello Vue");
// });

// '*'는 모든 . 모든 get요청에 대해 어떠한 주소이든지 다 처리하겠다는 뜻
//// 이것또한 라우트 매개변수와 같이 다른 라우터들보다 아래에 위치해야함
//// 범위가 넓은 라우터들은 밑에 넣어줘야한다
app.get("*", (req, rest) => {
  res.sen("hello everybody");
});

// 포트넘버를 적지 않아도 port 라고만 해주면 됨.
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});

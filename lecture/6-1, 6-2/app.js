// http모듈을 쓰고 있는 express를 우리가 쓰는 거임(express 뜯어보면 http를 쓰고있음)
const express = require("express");
const path = require("path");

const app = express();

// 서버에다 속성같은 것을 심는다고 생각하면 됨
//// 포트라는 속성에 3000을 넣는다 // 그리고 이제부터 process.env를 적극 사용할것임
app.set("port", process.env.PORT || 3000);
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

app.get("/about", (req, res) => {
  res.send("hello express");
});

// 포트넘버를 적지 않아도 port 라고만 해주면 됨.
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커 프로세스를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
    // 아래 : 한 워커 프로세스 종료 되었다면(서버가 종료되면 안되니까) 다시 하나 만들어주기 위한 코드
    cluster.fork();
  });
} else {
  // 워커들이 포트에서 대시
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Contetn-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Cluster!</p>");
      setTimeout(() => {
        // 워커 존재를 확인하기 위해 1초마다 강제 종료
        process.exit(1);
      }, 1000);
    })
    // cluster가 좋은게 여러개의 서버를 하나의 포트에 묶어둘 수 있다.
    .listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}

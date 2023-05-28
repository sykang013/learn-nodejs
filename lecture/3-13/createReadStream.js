const fs = require("fs");
// ceateReadStream은 64키로바이트씩 읽는다.(읽어야할 파일이 그것보다 작으면 한방에 읽어버림.)
// highWaterMark로 읽을 바이트 단위를 정해줄 수 있다.
const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 });

// 빈 배열 만들어서 이 곳에 push로 모아주기
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data:", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end:", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error:", err);
});

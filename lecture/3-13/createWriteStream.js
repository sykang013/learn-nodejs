const fs = require("fs");

const writeStream = fs.createWriteStream("./writeme.txt");

// createReadeStream은 write, end 있었고 createWriteStream은 finish 추가
// finish는 이벤트 리스너
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

// \n은 줄바꿈임(JS 용어)
writeStream.write("이 글을 씁니다.\n");
writeStream.write("한 번 더 씁니다.\n");
writeStream.end();

const fs = require("fs").promises;

// node에선 콜백이 대부분 에러와 데이터 순서로 간다.
fs.writeFile("./writeme.txt", "You should write.")
  .then(() => {
    return fs.readFile("./writeme.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });

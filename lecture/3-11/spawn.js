const spawn = require("child_process").spawn;

// 노드에서 파이썬 실행가능(파이썬이 깔려있는 경우)
const process = spawn("python", ["test.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});

const exec = require("child_process").exec;

// 아래: 구조분해 할당
// const { exec } = require("child_process");

var process = exec("dir");

process.stdout.on("data", function (data) {
  console.log(data.toString("utf8"));
});

process.stderr.on("data", function (data) {
  console.error(data.toString("utf8"));
});

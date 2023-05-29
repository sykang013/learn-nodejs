const express = require("express");

// 변수에 express.Router 담음
const router = express.Router();

//GET / 라우터
router.get("/", (req, res) => {
  res.send("Hello, User");
});

// 내보내기
module.exports = router;

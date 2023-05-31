/* -------------------------------------------------------------------------- */
/*                             9-6. 게시글, 이미지 업로드하기                            */
/* -------------------------------------------------------------------------- */
const express = require("express");
const multer = require("multer");
const path = require("path");
// 파일 조작
const fs = require("fs");

const { afterUploadImage, uploadPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

try {
  // uploads 하는 폴더가 있는지 확인
  fs.readdirSync("uploads");
} catch (error) {
  // 없으면 uploads 폴더 만들기
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

// 멀터 사용
const upload = multer({
  // 사용자가 올린 파일을 disk에 저장하겠다
  storage: multer.diskStorage({
    // 목적지는 uploads 폴더이다
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    // 파일 저장 이름은
    filename(req, file, cb) {
      console.log(file);
      // 확장자 추출
      const ext = path.extname(file.originalname); // 이미지.png -> 이미지20230531.png (이미지 뒤에 날짜, 시간을 붙여서 중복되지 않도록)

      cb(
        null,
        // 이름 추출
        path.basename(file.originalname, ext) +
          // 뒤에 현재시간 붙여주기
          Date.now() +
          ext
      );
    },
  }),
  // 파일 사이즈 5메가바이트 (요즘엔 고화질 사진이 많아서 용량이 작을 수 있다. 늘려도 됨.)
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
//// main.html의 append에 등록된 이름과 같아야한다 (img)
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

// POST /post
// upload랑 설정이 달라서 새로 만듬(이 업로드는 사진이 아니라 글 post)
const upload2 = multer();
// 라우터의 가장 마지막에 있는 애들이 컨트롤러
router.post("/", isLoggedIn, upload2.none(), uploadPost);

module.exports = router;

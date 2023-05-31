/* -------------------------------------------------------------------------- */
/*                                 페이지 라우터 만들기                                */
/* -------------------------------------------------------------------------- */
// express 가져오기
const express = require("express");
const router = express.Router();
// 컨트롤러 불러오기
const {
  renderJoin,
  renderProfile,
  renderMain,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

// 라우터들에서 공통적으로 쓸 수 있는 데이터를 담은 변수를 선언하는 자리가 res.locals
router.use((req, res, next) => {
  // 9-3. req.user 입력
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  // 미들웨어는 항상 next 호출 잊지 말기
  next();
});

// 메인화면
//// 라우터의 마지막 미들웨어는 '컨트롤러'라고 불린다(renderProfile, renderMain 같은 애들)
// 9-3. 패스포트의 isLoggedIn, isNotLoggedIng
//// 로그인 한 사람만 프로필 렌더하게
router.get("/profile", isLoggedIn, renderProfile);
//// 로그인 안 한 사람만 회원가입 가능하게
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;

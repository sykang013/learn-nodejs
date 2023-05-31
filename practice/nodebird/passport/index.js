const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

// 회원가입 시킬 거니까 유저 테이블에 데이터 꽂아줘야함
module.exports = () => {
  passport.serializeUser((user, done) => {
    // user === exUser
    done(null, user.id); // user id만 추출 (메모리에 유저 정보를 모두 저장하면 메모리가 너무 커짐)
  });
  // 세션 {1239120932 : 1}   { 세션쿠키: 유저아이디 } -> 메모리 저장됨

  passport.deserializeUser((id, done) => {
    // id: 1
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) //req.user, req.session
      .catch((err) => done(err));
  });

  local();
};

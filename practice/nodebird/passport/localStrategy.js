/* -------------------------------------------------------------------------- */
/*                            이 사람을 로그인 시켜도 되는지 판단                            */
/* -------------------------------------------------------------------------- */
const passport = require("passport");
// 최신문법
const { Strategy: LocalStrategy } = require("passport-local");
// 구 문법
//// const LocalStrategy = require("passport-local").Strategy;
//bcrypt가 좋은 이유는, 암호화(hash)와 비교를 알아서 해줘서이다.
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

module.exports = () => {
  // localstrategy(로그인 전략) 은 이 사람을 로그인 해줘도 되는지의 여부 가리기
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email 를 유저네임으로 받겠다
        passwordField: "password", // req.body.password 를 패스워드로 받겠다
        passReqToCallback: false, // true 인 경우 async() 첫번째 인자에 req를 넣어줘야한다
      },
      async (email, password, done) => {
        // done(서버실패, 성공유저, 로직실패)
        try {
          // DB에 저장된 정보와 로그인 시도자가 입력한 비번이 같은지 확인
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            // 일치한다는 뜻
            if (result) {
              done(null, exUser); // 성공 유저
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." }); // 로직 실패
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." }); // 로직실패
          }
        } catch (error) {
          console.error(error);
          done(error); // 서버실패(오타, DB문제 등)
        }
      }
    )
  );
};

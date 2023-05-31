/* -------------------------------------------------------------------------- */
/*                               9-3. 회원가입 기능 구현                              */
/* -------------------------------------------------------------------------- */
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

// 회원가입은 패스포트와 아무 관련이 없다.
exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body; // 구조분해할당
  try {
    // 입력된 이메일로 이미 가입한 유저가 있는지 찾기
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      // 있다면 에러 메시지 띄우기
      return res.redirect("/join?error=exist");
    }
    // 없다면 입력된 비밀번호를 bcrypt로 암호화(너무 길면 느려져서, 12 정도면 적당)
    const hash = await bcrypt.hash(password, 12);
    // 사용자 등록
    await User.create({
      email,
      nick,
      // 사용자 비번은 암호화 된 것으로
      password: hash,
    });
    // 회원가입 완료되었다면 로그인 화면으로 돌려보내기
    return res.redirect("/"); //  status 302
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// POST /auth/login   <- 로그인은 여기로 폼 요청
exports.login = (req, res, next) => {
  // 로그인을 하면 아래가 호출 (서버실패, 성공유저, 로직실패)
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // 서버실패
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // 로직실패
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      // 로그인 성공
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

// 로그아웃
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

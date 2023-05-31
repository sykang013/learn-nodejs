/* -------------------------------------------------------------------------- */
/*                               9-3. 회원가입 기능 구현                              */
/* -------------------------------------------------------------------------- */
const User = require("../models/user");
const bcrypt = require("bcrypt");

// 회원가입은 패스포트와 아무 관련이 없다.
exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body; // 구조분해할당
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
    next(error);
  }
};

exports.login = () => {};

exports.logout = () => {};

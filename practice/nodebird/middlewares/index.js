/* -------------------------------------------------------------------------- */
/*                             9-3. 패스포트 통한 로그인 여부                            */
/* -------------------------------------------------------------------------- */
exports.isLoggedIn = (req, res, next) => {
  // 패스포트 통해서 로그인 했니?
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // 패스포트 통해서 로그인 안 했니?
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다");
    res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
  }
};

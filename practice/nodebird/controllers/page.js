exports.renderProfile = (req, res, next) => {
  // 프론트로 넘기고 싶은 정보들 적어주기
  res.render("profile", { title: "내 정보 - NodeBird" });
};
exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "회원 가입 - NodeBird" });
};
exports.renderMain = (req, res, next) => {
  res.render("main", { title: "NodeBird", twits: [] });
};

// 실무에서는 라우터, 컨트롤러, 서비스를 나눠서 코딩하는 추세
// 라우터(컨트롤러 호출) -> 컨트롤러(서비스 호출. 그리고 요청, 응답 안다) -> 서비스(요청, 응답 모름)

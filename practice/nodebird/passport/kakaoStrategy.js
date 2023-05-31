const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      // localstrategy와 좀 다름
      // accessToken과 refreshToken은 카카로 API를 호출하는데에 사용됨
      // profile은 사용자 정보가 들어있는데, 카카오가 이걸 변경할 수 있으니 clg로 찍어서 구성 확인하기
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          // 사용자가 있으면
          if (exUser) {
            // 로그인
            done(null, exUser);
          } else {
            // 아니라면 회원가입
            const newUser = await User.create({
              // 아래와같은 정보는 최근에 이 구조에 들어가있었는데, 바뀔 수 있으니 확인
              email: profile._json?.kakao_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

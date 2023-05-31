/* -------------------------------------------------------------------------- */
/*                              9-6. 게시글, 이미지 업로드                             */
/* -------------------------------------------------------------------------- */
const { Post, Hashtag } = require("../models");

// multer를 통해 이미지를 업로드하면 req.file이 생김(싱글이라서)
// 어레이, 필즈는 req.files가 생김
exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  // 업로드된 img url을 프론트로 보내주기
  res.json({ url: `/img/${req.file.filename}` });
};

// 실제 게시글 업로드
exports.uploadPost = async (req, res, next) => {
  // 9-6 req.body.content, req.body.url을 활용할 수 있다.
  try {
    // 게시글 저장
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      // 로그인한 사용자 객체에서 id 가져오기
      UserId: req.user.id,
    });
    // 문자열에서 특정 패턴이 일치하는지 검사하거나, 특정 패턴 추출하려면 정규표현식이 제일 쉽다.
    //// 공백 또는 #이 없는 나머지
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          // findOrCreate 는 시퀄라이즈에서 제공. 기존 해시태그 있으면 찾아서 가져오고, 없으면 만들어서 가져옴.
          return Hashtag.findOrCreate({
            // 맨 첫글자인 # 뗴고, 전부 소문자로
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      console.log("result", result);
      // 포스트와 해시태그 다 대 다 관계 생성되는 것
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

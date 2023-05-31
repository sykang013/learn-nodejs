/* -------------------------------------------------------------------------- */
/*                              게시글 정보 담은 테이블 만들기                              */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");

/* ------------------ 모델의 기본 꼴(class만들고, extends.Model 하고) ------------------ */
class Post extends Sequelize.Model {
  // 1) initiate 가 모델 정보들(테이블 정보) 입력하는 곳
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // 2) associate 는 테이블 관계를 입력하는 곳
  static associate(db) {
    db.Post.belongsTo(db.User);
    // 다 대 다 관계. 중간 테이블은 PostHashtag
    // as와 foreignKsy 안 적는 이유 : 테이블 이름이 달라서 헷갈릴 이름이 없기 때문
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  }
}

module.exports = Post;

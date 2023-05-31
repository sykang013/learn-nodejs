/* -------------------------------------------------------------------------- */
/*                              해시태그 정보 담은 테이블 만들기                              */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");

/* ------------------ 모델의 기본 꼴(class만들고, extends.Model 하고) ------------------ */
class Hashtag extends Sequelize.Model {
  // 1) initiate 가 모델 정보들(테이블 정보) 입력하는 곳
  static initiate(sequelize) {
    Hashtag.init(
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // 2) associate 는 테이블 관계를 입력하는 곳
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  }
}

module.exports = Hashtag;

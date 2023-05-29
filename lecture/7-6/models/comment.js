/* -------------------------------------------------------------------------- */
/*               Comment 테이블에 대응되는 시퀄라이즈 모델                                  */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");

// 최근에 바뀐 문법 적용됨 (2023년)
class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        // commenter(댓글작성자)는 없는데, 관계 컬럼 이라는 것으로 시퀄라이즈에서 특별히 관리함
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  //   static associate(db) {
  //     db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  //   }
}

module.exports = Comment;

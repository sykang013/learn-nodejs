/* -------------------------------------------------------------------------- */
/*                  User 테이블에 대응되는시퀄라이즈 모델                                  */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");

// 최근에 바뀐 문법 적용됨 (2023년)
class User extends Sequelize.Model {
  static initiate(sequelize) {
    // 1) init에 컬럼 정의
    User.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          // 고유하게
          unique: true,
        },
        age: {
          // 시퀄라이즈와 mysql 문법이 조금씩 다르다. INTEGER, STRING 등
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          // 시퀄라이즈에서는 불리언, mysql에서는 tinyint
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          // mysql에서는 DATETIME, 시퀄라이즈에서는 DATE(날짜만 표시하고프면 DateOnly)
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // 2) 모델에 대한 설정
        sequelize,
        timestamps: false,
        // snake case냐 camel case냐
        underscored: false,
        // 시퀄라이즈는 기본적으로 modelName(JS에서 쓰이는 이름)을
        modelName: "User",
        // 소문자로 만들고 복수형으로 바꿔서 tableName에(sql에서 쓰이는 이름) 사용한다.
        tableName: "users",
        // paranoid가 ture 면 deLetedAt 로 soft delete 기능을 사용할 수 있다
        // deletedAt: true // soft delete
        // 정말 지워버리는것은 hard delete
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}

module.exports = User;

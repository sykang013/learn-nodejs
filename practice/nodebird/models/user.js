/* -------------------------------------------------------------------------- */
/*                              회원 정보 담은 테이블 만들기                              */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");

/* ------------------ 모델의 기본 꼴(class만들고, extends.Model 하고) ------------------ */
class User extends Sequelize.Model {
  // 1) initiate 가 모델 정보들(테이블 정보) 입력하는 곳
  static initiate(sequelize) {
    User.init(
      {
        email: {
          // 40자 이내
          type: Sequelize.STRING(40),
          // 카카오톡 로그인하기도 있기 때문에 비어있어도 됨
          allowNull: true,
          // 다만 있을 경우에는 고유해야한다
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          // 비밀번호는 암호화 되기 때문에 매우 길어질 수 있음
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          // local 또는 kakao 둘 중 하나만 적게끔 제한을 두는 것
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        // 카카오 로그인 전용
        snsId: {
          type: Sequelize.STRING(30),
          // 시퀄라이즈에서 (email과 snsID 중 하나만 있는지 검사해주는) 주거나 validation 기능을 지원해줌
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt(유저생성일), updatedAt(최근의 유저 정보 수정일) 자동으로 기록
        underscored: false, // created_at, updated_at  난 카멜케이스가 더 좋아서 false
        modelName: "User", // JS에서 쓰는 이름
        tableName: "users", // DB의 테이블 이름
        paranoid: true, // soft delete를 위함 : deletedAt 유저 삭제일('2년 전에 탈퇴했는데 취소해주세요 데이터 복구해주세요')
        // 정말 싹 지워버리면 hard delete
        charset: "utf8mb4", // 이모티콘 저장하고싶으면 mb4 붙이기
        collate: "utf8mb4_general_ci", // 저장된 문자를 어떤 방식으로 정렬할 것인지 / ci로 하면 무난함
      }
    );
  }
  // 2) associate 는 테이블 관계를 입력하는 곳
  static associate(db) {
    // 사용자와 댓글은 일 대 다 관계(한 사용자가 게시글 여러개 작성)
    db.User.hasMany(db.Post);
    // 팔로워는 다대다 관계(테이블 하나 생성됨)
    db.User.belongsToMany(db.User, {
      // 팔로워 (나는 유명 연예인의 팔로워)
      //// 유명 연예인(팔로잉)의 id를 찾아야 그 연예인의 팔로워인 나를 찾을 수 있기 때문
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      // 팔로잉 (유명 연예인은 나의 팔로잉)
      //// 나의 id를 찾아야 누구를 팔로잉 하고있는지 알 수 있기 때문
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;

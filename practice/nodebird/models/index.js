/* -------------------------------------------------------------------------- */
/*                          만든 모델들 호출해주기 (자동화 적용)                              */
/* -------------------------------------------------------------------------- */
const Sequelize = require("sequelize");
// 폴더, 파일 읽을 수 있는 fs 모듈
const fs = require("fs");
const path = require("path"); // 읽을 파일 경로
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
// 모델들은 두고두고 재사용 하기 위해 db라는 하나의 객체로 묶어둠
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

// 얘는 index.js 가 된다
const basename = path.basename(__filename); // index.js
fs.readdirSync(__dirname)
  .filter((file) => {
    // . 으로 시작하는 숨김파일 제외, 파일의 마지막 세글자가 .js 가 아닌 것 제외
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

// 꼭 initiate가 전부 끝나고 associate를 해줘야함
Object.keys(db).forEach((modelName) => {
  console.log(db, modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

/* -------------------------------------------------------------------------- */
/*                               만들 모델 호출(자동화 전)                              */
/* -------------------------------------------------------------------------- */
/*
const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
// 모델들은 두고두고 재사용 하기 위해 db라는 하나의 객체로 묶어둠
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

// 만들었던 모델들을 한번씩 호출 해줘야함
User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);
*/

const Sequelize = require("sequelize");
// Sequelize는 시퀄라이즈 패키지이자 생성자입니다.
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
// MySQL과 연동할 때는 config 폴더 안의 config.json 정보가 사용
// config/config.json에서 데이터베이스 설정을 불러온 후
const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성합니다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = sequelize;
// 연결 객체를 나중에 재사용하기 위해 db.sequelize에 넣어둠
db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);
// 모델이랑 시퀄라이즈랑 연결

User.associate(db);
Comment.associate(db);

module.exports = db;
// mysql2 ,드라이버와 노드와 시퀄라이즈 연결해주는 코드

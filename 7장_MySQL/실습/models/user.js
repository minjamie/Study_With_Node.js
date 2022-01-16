const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false, //soft delete시 true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    // comment 테이블의 commenter라는 컬럼이 User id를 참조
  }
};

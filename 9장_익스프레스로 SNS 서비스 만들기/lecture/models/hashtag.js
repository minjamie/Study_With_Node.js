const Sequelize = require("sequelize");

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(140),
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, {
      through: "PostHashtag",
    });
  }
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "id",
        foreignKey: "userId",
      });
    }
  }
  UserInfos.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "익명",
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      introduce: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "UserInfos",
      //modelName: "User-Infos", << 불러올때  await User-Infos로 불러와야 했어서 오류
    }
  );
  return UserInfos;
};

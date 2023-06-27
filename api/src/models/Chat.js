const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Chat", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};

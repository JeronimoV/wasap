const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

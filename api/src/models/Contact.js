const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Contact", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  });
};

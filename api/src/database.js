const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { PORTDATABASE, HOST, PASSWORD, DBNAME, USER } = process.env;

const sequelize = new Sequelize(
  `postgresql://${USER}:${PASSWORD}@${HOST}:${PORTDATABASE}/${DBNAME}`
);

const modelList = [];
const pathModelsFiles = [];
const requires = [];

const pathModels = path.join(__dirname, "models");
const models = fs.readdirSync(pathModels);
models.forEach((value) => modelList.push(value));
modelList.forEach((value) =>
  pathModelsFiles.push(path.join(__dirname, "/models", value))
);
pathModelsFiles.forEach((value) => requires.push(require(value)));
requires.forEach((value) => value(sequelize));

const { User, Message, Chat, Contact } = sequelize.models;

User.belongsToMany(User, {
  through: Contact,
  as: "UserContact",
  foreignKey: "UserId",
  otherKey: "FriendId",
});

User.belongsToMany(User, {
  through: Chat,
  as: "UserChat",
  foreignKey: "UserId",
  otherKey: "FriendId",
});

User.hasMany(Message);
Message.belongsTo(User);

Message.belongsTo(Chat);
Chat.hasMany(Message);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

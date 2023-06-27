const express = require("express");
const server = express();
const { getAllMessages } = require("../controllers/messageController");

server.get("/:nickname", getAllMessages);

module.exports = server;

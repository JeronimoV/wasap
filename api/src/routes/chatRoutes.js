const express = require("express");
const server = express();
const { getUserChats } = require("../controllers/chatController");

//user all chats
server.get("/:id", getUserChats);

module.exports = server;

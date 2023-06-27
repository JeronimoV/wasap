const express = require("express");
const server = express();
const cors = require("cors");
const chat = require("./chatRoutes");
const message = require("./messageRoutes");
const user = require("./userRoutes");
const contact = require("./contactRoutes");

server.use(express.json());
server.use(cors());

server.use("/user", user);
server.use("/message", message);
server.use("/chat", chat);
server.use("/contact", contact);

module.exports = server;

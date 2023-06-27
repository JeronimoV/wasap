const express = require("express");
const server = express();
const {
  searchUsers,
  getUserData,
  getUserDataProfile,
  loginUser,
  registerUser,
  isLogged,
  updateUser,
} = require("../controllers/userController");

server.get("/search/:nickname", searchUsers);

server.get("/:id", getUserData);

server.post("/profile", getUserDataProfile);

server.post("/login", loginUser);

server.post("/register", registerUser);

server.post("/islogged", isLogged);

server.put("/update", updateUser);

module.exports = server;

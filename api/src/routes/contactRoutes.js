const express = require("express");
const server = express();
const {
  getUserContacts,
  getContactInfo,
  addContact,
  deleteContact,
} = require("../controllers/contactController");

//obtener los contactos del usuario
server.get("/user/:id", getUserContacts);

//obtener contacto con id
server.post("/", getContactInfo);

server.post("/create", addContact);

server.delete("/delete", deleteContact);

module.exports = server;

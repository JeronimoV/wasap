const { conn } = require("./database");
const server = require("./routes/index");
const { Chat, Contact, Message } = require("./database");
require("dotenv").config();
const { PORT } = process.env;

conn
  .sync({ force: false })
  .then(() => {
    const actualServer = server.listen(PORT, () => {
      console.log("Server connected");
    });
    const io = require("socket.io")(actualServer, {
      cors: { origin: "*" },
    });

    let allUsers = [];

    io.on("connection", (socket) => {
      socket.on("connect_user", (id) => {
        const connectData = { socket: socket, id: id };
        allUsers.push(connectData);
      });
      socket.on("create-chat", async (data) => {
        await Contact.create({
          UserId: data.UserId,
          FriendId: data.FriendId,
        });

        await Contact.create({
          UserId: data.FriendId,
          FriendId: data.UserId,
        });

        const newChat = await Chat.create({
          UserId: data.UserId,
          FriendId: data.FriendId,
        });

        const usersToSend = allUsers.filter(
          (value) => value.id === data.FriendId || value.id === data.UserId
        );

        usersToSend.forEach((value) =>
          io.to(value.socket.id).emit("new-chat", newChat)
        );
      });
      socket.on("send-message", async (data) => {
        const newMessage = await Message.create({
          ChatId: data.ChatId,
          message: data.message,
          UserId: data.UserId,
        });
        const usersToSend = allUsers.filter(
          (value) => value.id === data.FriendId || value.id === data.UserId
        );

        console.log(usersToSend);

        usersToSend.forEach((value) =>
          io.to(value.socket.id).emit("new-message", newMessage)
        );
      });
      socket.on("disconnect", () => {
        const newUserList = allUsers.filter(
          (value) => value.socket.id !== socket.id
        );
        allUsers = newUserList;
      });
    });
  })
  .catch((err) => console.log(err));

const { Chat, User, Message } = require("../database");
const { Op } = require("sequelize");

const getUserChats = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("You need to send an id!");
    }
    const allChats = await Chat.findAll({
      where: { [Op.or]: [{ UserId: id }, { FriendId: id }] },
    });

    const dataToSend = [];

    await Promise.all(
      allChats.map(async (value) => {
        if (value.UserId === id) {
          const actualFriend = await User.findOne({
            where: { id: value.FriendId },
          });
          const allMessages = await Message.findAll({
            where: { ChatId: value.id },
          });
          const orderedMessages = allMessages.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            } else {
              return -1;
            }
          });
          console.log("ALL MESSAGES", orderedMessages);
          const chatAndMessages = {
            id: value.id,
            FriendId: value.FriendId,
            UserId: value.UserId,
            allMessages: orderedMessages,
          };
          actualFriend.setDataValue("ChatsData", chatAndMessages);
          dataToSend.push(actualFriend);
        } else {
          const actualFriend = await User.findOne({
            where: { id: value.UserId },
          });
          const allMessages = await Message.findAll({
            where: { ChatId: value.id },
          });
          const orderedMessages = allMessages.sort((a, b) => {
            if (a.id < b.id) {
              return 1;
            } else {
              return -1;
            }
          });
          console.log("ALL MESSAGES", orderedMessages);
          const chatAndMessages = {
            id: value.id,
            FriendId: value.FriendId,
            UserId: value.UserId,
            allMessages: orderedMessages,
          };
          actualFriend.setDataValue("ChatsData", chatAndMessages);
          dataToSend.push(actualFriend);
        }
      })
    );

    res.status(200).json(dataToSend);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getUserChats,
};

const { Contact, User, Chat } = require("../database");
const { Op } = require("sequelize");

const getUserContacts = async (req, res) => {
  const { id } = req.params;
  try {
    const allContacts = await Contact.findall({ where: { UserId: id } });
    res.status(200).json(allContacts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getContactInfo = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const actualContact = await Contact.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: [{ UserId: userId }, { FriendId: friendId }] },
          { [Op.and]: [{ UserId: friendId }, { FriendId: userId }] },
        ],
      },
    });
    if (!actualContact) {
      throw new Error("Contact not found!");
    }
    res.status(200).json(actualContact);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const addContact = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const [actualUser, actualFriend] = await Promise.all([
      User.findOne({ where: { id: userId } }),
      User.findOne({ where: { id: friendId } }),
    ]);
    if (!actualUser || !actualFriend) {
      throw new Error("Some user doesnt exist!");
    }

    await Contact.create({
      UserId: userId,
      FriendId: friendId,
    });

    await Contact.create({
      UserId: friendId,
      FriendId: userId,
    });

    await Chat.create({
      UserId: userId,
      FriendId: friendId,
    });

    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const deleteContact = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const actualContact = await Contact.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: [{ UserId: userId }, { FriendId: friendId }] },
          { [Op.and]: [{ UserId: friendId }, { FriendId: userId }] },
        ],
      },
    });
    if (!actualContact) {
      throw new Error("Contact doesnt exist!");
    }
    await actualContact.destroy();
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getUserContacts,
  getContactInfo,
  addContact,
  deleteContact,
};

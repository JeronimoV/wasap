const { Message } = require("../database");

const getAllMessages = async (req, res) => {
  const { nickname } = req.params;
  try {
    const allMessages = await Message.findAll({
      where: { nickName: nickname },
    });
    res.status(200).json(allMessages);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllMessages,
};

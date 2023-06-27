const { User, Contact } = require("../database");
const { encryptPassword, comparePassword } = require("../utils/encyptPassword");
const { Op } = require("sequelize");

const searchUsers = async (req, res) => {
  const { nickname } = req.params;
  try {
    if (!nickname) {
      throw new Error("You need to send all the data!");
    }
    const searchResult = await User.findAll({
      where: { nickName: { [Op.iLike]: `%${nickname}%` } },
    });

    console.log(searchResult);

    res.status(200).json(searchResult);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getUserData = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("You need to send an id!");
    }
    const actualUser = await User.findOne({ where: { id: id } });

    if (!actualUser) {
      throw new Error("User doesn´t exist!");
    }

    res.status(200).json(actualUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getUserDataProfile = async (req, res) => {
  const { nickname, id } = req.body;
  try {
    if (!nickname) {
      throw new Error("You need to send a nickname!");
    }
    const nicknameToSearch = nickname
      .split("%20")
      .toString()
      .replaceAll(",", " ")
      .replaceAll("%C3%B1", "ñ");
    console.log("DATAAA", nickname, id);
    const searchResult = await User.findOne({
      where: { nickName: nicknameToSearch },
    });

    if (!searchResult) {
      throw new Error("User doesn´t exist!");
    }

    const areContact = await Contact.findOne({
      where: { [Op.and]: [{ UserId: id }, { FriendId: searchResult.id }] },
    });

    const dataToSend = {
      areContacts: areContact ? true : false,
      userData: searchResult,
    };

    res.status(200).json(dataToSend);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ((!email, !password)) {
      throw new Error("You need to send all the data!");
    }
    const actualUser = await User.findOne({ where: { email: email } });

    if (!actualUser) {
      throw new Error("User doesn´t exist!");
    }

    const compareResult = await comparePassword(password, actualUser.password);

    if (compareResult) {
      res.status(200).json(actualUser);
    } else {
      throw new Error("Passwords doesn´t match!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const registerUser = async (req, res) => {
  const { nickName, email, password } = req.body;
  try {
    if (!nickName || !email || !password) {
      throw new Error("You need to send all the data!");
    }

    const matchUser = await User.findOne({ where: { email: email } });

    if (matchUser) {
      throw new Error("Email also registered!");
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await User.create({
      nickName: nickName,
      email: email,
      password: hashedPassword,
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      coverPhoto:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const isLogged = async (req, res) => {
  const { id } = req.params;
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  const { id, nickName, email, picture, coverPhoto } = req.body;
  try {
    console.log(nickName, email, picture, coverPhoto);
    if (!nickName && !email && !picture && !coverPhoto) {
      throw new Error("You need to send some data!");
    }
    const actualUser = await User.findOne({ where: { id: id } });

    if (email) {
      const matchEmail = await User.findOne({ where: { email: email } });
      if (matchEmail) {
        throw new Error("Email already exist!");
      }
    }

    const userData = await actualUser.update({
      nickName: nickName,
      email: email,
      picture: picture,
      coverPhoto: coverPhoto,
    });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  searchUsers,
  getUserData,
  getUserDataProfile,
  loginUser,
  registerUser,
  isLogged,
  updateUser,
};

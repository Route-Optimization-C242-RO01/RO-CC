const { User, sequelize, Token_user } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  try {
    const { name, password, retype_pass } = req.body;
    if (!name || !password || !retype_pass) {
      return res
        .status(400)
        .json({ success: false, message: "Complete your account data" });
    }
    if (password != retype_pass) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords are not the same" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const findName = await User.findOne({ where: { name: name } });
    if (findName) {
      return res
        .status(400)
        .json({ success: false, message: "Name has been used" });
    }
    await User.create({
      name: name,
      password: hashPass,
    });
    return res.status(200).json({
      success: true,
      message: "Account has been successfully registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Complete your account data" });
    }
    const findAcc = await User.findOne({ where: { name: name } });
    if (!findAcc) {
      return res
        .status(400)
        .json({ success: false, message: "name not found" });
    }

    bcrypt.compare(password, findAcc.password, async (err, results) => {
      if (err || !results) {
        return res.status(400).json({
          success: false,
          message: "Your account password is incorrect",
        });
      }
      const id_user = findAcc.id_user;
      const token = jwt.sign(
        {
          id_user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1w",
        }
      );
      await Token_user.create({
        token: token,
        id_user: id_user,
      });
      return res.status(200).json({
        success: true,
        message: "Login berhasil",
        token: token,
        name: findAcc.name,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//logout
const logout = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });
    }

    // Find and delete the token
    const token = req.header("Authorization").replace("Bearer ", "");
    const tokenRecord = await Token_user.findOne({ where: { token } });

    if (!tokenRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Token not found" });
    }

    await tokenRecord.destroy();
    res.status(200).json({ success: true, message: "Logout Success" });
  } catch (error) {
    console.error("Logout error:", error); // Log the error
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, logout };

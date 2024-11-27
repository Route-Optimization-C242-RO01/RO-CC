const { User, sequelize, Token_user } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const register = async (req, res) => {
  try {
    //mengambil inputan user
    const { name, password, retype_pass } = req.body;

    //validasi inputan jika tidak diisikan
    if (!name || !password || !retype_pass) {
      return res
        .status(400)
        .json({code: 400, success: false, message: "Complete your account data" });
    }

    //validasi jika password, dengan konfirmasi password tidak sama
    if (password != retype_pass) {
      return res
        .status(400)
        .json({code:400, success: false, message: "Passwords are not the same" });
    }

    //pembuatan random pass (hash password)
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    //mencari data user berdasarkan nama, jika ada maka akan menghasilkan json 400
    const findName = await User.findOne({ where: { name: name } });
    if (findName) {
      return res
        .status(400)
        .json({code: 400, success: false, message: "Name has been used" });
    }
    
    //jika tidak, akan menambahkan data user baru, dan tampil json 200
    await User.create({
      name: name,
      password: hashPass,
    });
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Account has been successfully registered",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:500, success: false, message: "Server Error" });
  }
};

//login
const login = async (req, res) => {
  try {
    //mengambil inputan user
    const { name, password } = req.body;

    //validasi inputan user jika tidak diisikan
    if (!name || !password) {
      return res
        .status(400)
        .json({code:400, success: false, message: "Complete your account data" });
    }

    //mencari data akun user berdasarkan nama
    const findAcc = await User.findOne({ where: { name: name } });
    if (!findAcc) {
      return res
        .status(400)
        .json({code:400, success: false, message: "name not found" });
    }

    //jika ditemukan akan mencompare password yang sudah di hash
    bcrypt.compare(password, findAcc.password, async (err, results) => {
      //jika password salah
      if (err || !results) {
        return res.status(400).json({
          code:400,
          success: false,
          message: "Your account password is incorrect",
        });
      }
      //jika password tidak salah membuat jwt token
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

      //memanambahkan data token ke database
      await Token_user.create({
        token: token,
        id_user: id_user,
      });
      return res.status(200).json({
        code:200,
        success: true,
        message: "Login berhasil",
        token: token,
        name: findAcc.name,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:500, success: false, message: "Server Error" });
  }
};

//logout
const logout = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({code:400, success: false, message: "User not authenticated" });
    }

    // Find and delete the token
    const token = req.header("Authorization").replace("Bearer ", "");
    const tokenRecord = await Token_user.findOne({ where: { token } });

    if (!tokenRecord) {
      return res
        .status(404)
        .json({code:404, success: false, message: "Token not found" });
    }

    await tokenRecord.destroy();
    res.status(200).json({code:200, success: true, message: "Logout Success" });
  } catch (error) {
    console.error("Logout error:", error); // Log the error
    res.status(500).json({code:500, success: false, message: error.message });
  }
};

module.exports = { register, login, logout };

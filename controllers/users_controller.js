const User = require("../models/users");
const Problem = require("../models/problems");
const Token = require("../models/tokens");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { regex } = require("../utils/regex");
const sendEmail = require("../utils/sendEmail");

module.exports.sign_up = async (req, res) => {
  try {
    if (!regex("username", req.body.username)) {
      return res.send({
        success: false,
        message: "Username is not Valid",
      });
    }

    if (!regex("password6LUN", req.body.password)) {
      return res.send({
        success: false,
        message:
          "The password must contain one lowercase letter, one uppercase letter, one number, and be at least 6 characters long",
      });
    }
    if (!regex("email", req.body.email)) {
      return res.send({
        success: false,
        message: "Email is not Valid",
      });
    }

    const isEmail = await User.countDocuments({
      email: req.body.email,
    });

    if (isEmail) {
      return res.send({
        success: false,
        message: "Email already Registered",
      });
    }
    const isUserName = await User.countDocuments({
      username: req.body.username,
    });

    if (isUserName) {
      return res.send({
        success: false,
        message: "Username already Exist",
      });
    }

    const user = User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = await new Token({
      id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    await sendEmail(
      user.email,
      "Verify Email",
      `<h2>Welcome to CodeBacklog</h2>
      <a href=${url} target="_blank">Verification Token : ${url}</a>`
    );
    return res.status(201).send({
      success: true,
      message:
        "User Sign Up Successfully, Check your MailBox and verify your account",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
};

module.exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { emailVerified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.sign_in = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user) {
      if (user.emailVerified) {
        const token = await user.generateAuthToken();
        return res.send({
          success: true,
          message: "User Sign In Successfully",
          token,
          user: {
            username: user.username,
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
          },
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Your Email is not verified",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "User not exist",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ success: false, message: e.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({}, { password: 0 }).sort({ username: 1 });
    res.status(400).send({ success: true, users });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports.getAuther = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id, { password: 0 });
    if (!user) {
      res.status(400).send({ success: false, error: "Invalid user id" });
    }
    let problems = await Problem.find({ userId: id });
    res.status(200).send({
      success: true,
      user,
      problems,
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

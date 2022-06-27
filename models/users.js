const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    EmailVerified: {
      type: Boolean,
      default: false,
    },
    Password: {
      type: String,
      required: true,
    },
    Name: {
      First: {
        type: String,
        required: true,
      },
      Last: {
        type: String,
        required: true,
      },
    },
    EmailVerifyToken: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET, {
    expiresIn: "24h",
  });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to find User");
  }
  const isMatch = await bcrypt.compare(password, user.Password);
  if (isMatch) {
    return user;
  } else {
    throw new Error("Incorrect Password");
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

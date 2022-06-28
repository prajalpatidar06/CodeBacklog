const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
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
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  } else {
    throw new Error("Incorrect Password");
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

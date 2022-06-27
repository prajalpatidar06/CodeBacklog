const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/users");

const getAuthenticated = async function (token) {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!customer) {
    throw new Error("Unauthorized");
  } else {
    return user;
  }
};

module.exports = async function (req, res, next) {
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization) {
      res.status(401).send({ error: "Auth-key Not found" });
    }
    const token = Authorization.replace("Bearer ", "");
    req.token = token;
    req.user = await getAuthenticated(token);
    next();
    return;
  } catch (e) {
    return res
      .status(401)
      .send({ error: "Please authenticate", message: e.message });
  }
};

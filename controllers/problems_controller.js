const { regex, problemObjectValidation } = require("../utils/regex");
const Problem = require("../models/problems");

module.exports.createProblem = async function (req, res) {
  try {
    let data = problemObjectValidation(req.body);
    data.userId = req.user.id;
    const newProblem = Problem(data);
    await newProblem.save();
    res.status(200).send({
      success: true,
      Problem: newProblem,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

module.exports.getAllProblems = async function (req, res) {
  try {
    const problems = await Problem.find()
      .populate({
        path: "userId",
        select: {
          username: 1,
          name: 1,
          email: 1,
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, problems });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

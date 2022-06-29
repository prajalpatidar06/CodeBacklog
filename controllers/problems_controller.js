const { regex, problemObjectValidation } = require("../utils/regex");
const Problem = require("../models/problems");

module.exports.getAllProblems = async function (req, res) {
  try {
    const data = await Problem.find()
      .populate({
        path: "userId",
        select: {
          username: 1,
          name: 1,
          email: 1,
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports.getAutherProblems = async function (req, res) {
  try {
    let data = await Problem.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports.getProblemById = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await Problem.findById(id);
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

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

module.exports.updateProblem = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await Problem.findById(id);
    if (data && data.userId == req.user.id) {
      if (
        req.body.problemUrl &&
        typeof req.body.problemUrl == "string" &&
        regex("url", req.body.problemUrl.trim())
      ) {
        data.problemUrl = req.body.problemUrl.trim();
      }
      if (
        req.body["status"] !== undefined &&
        typeof req.body.status == "boolean"
      ) {
        data.status = req.body.status;
      }
      if (req.body.notes && typeof req.body.notes == "string") {
        data.notes = req.body.notes.trim();
      }
      if (req.body.code && typeof req.body.code == "string") {
        data.code = req.body.code.trim();
      }
      if (req.body.language && typeof req.body.language == "string") {
        data.language = req.body.language.trim();
      }
      await data.save();
      res.status(200).send({ success: true, data });
    } else {
      res.status(400).send({ success: false, error: "invalid id" });
    }
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports.deleteProblem = async function (req, res) {
  try {
    let id = req.params.id;
    let data = await Problem.findById(id);
    if (data && data.userId == req.user.id) {
      await data.delete();
      res.status(200).send({ success: true });
    } else {
      res.status(400).send({ success: false, error: "invalid id" });
    }
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

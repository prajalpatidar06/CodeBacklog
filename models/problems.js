const mongoose = require("mongoose");

const ProblemsSchema = new mongoose.Schema(
  {
    problemUrl: { type: String, required: true },
    notes: { type: String },
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    code: { type: String },
    language: {
      type: String,
      enum: ["none", "c", "cpp", "python", "java", "javascript"],
      default: "none",
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", ProblemsSchema);
module.exports = Problem;

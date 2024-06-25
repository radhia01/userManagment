const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  priorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Priority",
    required: true,
  },
  echeance: {
    type: Date,
    required: true,
  },
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", TaskSchema);

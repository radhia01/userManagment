const mongoose = require("mongoose");
const ProjectModel = new mongoose.Schema({
  nom: {
    type: String,
  },
  description: {
    type: String,
  },
  dateEcheance: {
    type: Date,
    required: true,
  },
  dateCreation: {
    type: Date,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    default: "654cedce4177a26f57f164c5",
  },
});
module.exports = mongoose.model("Project", ProjectModel);

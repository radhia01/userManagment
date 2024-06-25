const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Le nom est obligatoire"],
  },
  motdepasse: {
    type: String,
    required: [true, "le mot de passe est obligatoire"],
  },
  email: {
    type: String,
    required: [true, "l'email est obligatoire"],
  },
  adresse: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  telephone: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Role", roleSchema);

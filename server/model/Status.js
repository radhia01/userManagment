const mongoose = require("mongoose");
const statusSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Status", statusSchema);

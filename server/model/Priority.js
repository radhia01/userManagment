const mongoose = require("mongoose");
const prioritySchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Priority", prioritySchema);

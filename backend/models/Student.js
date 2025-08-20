const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  room: String
});

module.exports = mongoose.model("Student", studentSchema);

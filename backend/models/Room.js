const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: String,
  capacity: Number,
  occupants: { type: Number, default: 0 }
});

module.exports = mongoose.model("Room", roomSchema);

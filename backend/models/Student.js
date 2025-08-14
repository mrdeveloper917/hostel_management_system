const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  course: String,
  year: String,
  cgpa: String,
  hostelName: String,
  block: String,
  roomNo: String,
  photoUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

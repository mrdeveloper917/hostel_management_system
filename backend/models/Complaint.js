const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  title: String,
  description: String,
  status: { type: String, enum: ['open','in-progress','resolved'], default: 'open' },
  assignedTo: String
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);

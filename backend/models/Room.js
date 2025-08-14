const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  block: String,
  capacity: Number,
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  status: { type: String, enum: ['vacant','occupied','maintenance'], default: 'vacant' }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);

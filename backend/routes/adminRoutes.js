const express = require('express');
const Student = require('../models/Student');
const Room = require('../models/Room');
const Complaint = require('../models/Complaint');

const router = express.Router();

/* -------------------- STUDENTS -------------------- */
// List all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new student
router.post('/students', async (req, res) => {
  try {
    const s = new Student(req.body);
    await s.save();
    req.io?.emit('student:created', s);
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ error: 'Student not found' });
    req.io?.emit('student:updated', s);
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    req.io?.emit('student:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------- ROOMS -------------------- */
// List all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().populate('occupants', 'name email');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create room
router.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    req.io?.emit('room:created', room);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update room
router.put('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    req.io?.emit('room:updated', room);
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete room
router.delete('/rooms/:id', async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Room not found' });
    req.io?.emit('room:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------------------- COMPLAINTS -------------------- */
// List all complaints
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('studentId', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create complaint
router.post('/complaints', async (req, res) => {
  try {
    const c = new Complaint(req.body);
    await c.save();
    req.io?.emit('complaint:created', c);
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update complaint
router.put('/complaints/:id', async (req, res) => {
  try {
    const c = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!c) return res.status(404).json({ error: 'Complaint not found' });
    req.io?.emit('complaint:updated', c);
    res.json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete complaint
router.delete('/complaints/:id', async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Complaint not found' });
    req.io?.emit('complaint:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports

const express = require("express");
const Student = require("../models/Student");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const router = express.Router();

/* --- STUDENTS --- */
router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post("/students", async (req, res) => {
  const { name, email, room } = req.body;
  const student = new Student({ name, email, room });
  await student.save();
  res.json(student);
});

router.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
  res.json(student);
});

router.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

/* --- ROOMS --- */
router.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

router.post("/rooms", async (req, res) => {
  const { number, capacity } = req.body;
  const room = new Room({ number, capacity });
  await room.save();
  res.json(room);
});

/* --- COMPLAINTS --- */
router.get("/complaints", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

router.post("/complaints", async (req, res) => {
  const { studentName, message } = req.body;
  const complaint = new Complaint({ studentName, message });
  await complaint.save();
  res.json(complaint);
});

router.put("/complaints/:id", async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(complaint);
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const User = require('./models/User');
const Student = require('./models/Student');
const Complaint = require('./models/Complaint');

const app = express();



// Middleware
app.use(cors({
    origin : "https://hostel-management-system-lelu.onrender.com"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect DB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://ayushthakur9823:Ayush24@hostelmanagemnt.eezaacu.mongodb.net/?retryWrites=true&w=majority&appName=hostelManagemnt/ hostel_management")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


/* =======================
   TEST ROUTE (Deploy check)
   ======================= */
app.get("/", (req, res) => {
    res.send("✅ Hostel Backend is running successfully!");
});

/* =======================
   AUTH ROUTES
   ======================= */
// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send('All fields required');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('Email already exists');

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error saving user');
    }
});

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);


// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('All fields required');
        }

        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).send('Invalid credentials');

        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

/* =======================
   STUDENT ROUTES
   ======================= */
// Get all students
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get student by ID
app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add new student
app.post("/api/students", async (req, res) => {
    try {
        const { name, email, room } = req.body;
        const student = new Student({ name, email, room });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error adding student" });
    }
});

/* =======================
   COMPLAINT ROUTES
   ======================= */
// Get all complaints
app.get("/api/complaints", async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("studentId", "name email");
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add new complaint
app.post("/api/complaints", async (req, res) => {
    try {
        const { studentId, message } = req.body;
        const complaint = new Complaint({ studentId, message });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: "Error adding complaint" });
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

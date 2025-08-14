require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

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

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});




//  Profile server

app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
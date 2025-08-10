// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email, password });
        await newUser.save();

        // Yaha check karne ke liye log print hoga
        console.log("✅ User saved:", newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Error saving user:", error);
        res.status(500).json({ message: "Signup failed" });
    }
});

module.exports = router;

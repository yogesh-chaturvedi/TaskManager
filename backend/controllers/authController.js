const bcrypt = require('bcrypt');
const UserModel = require("../models/User");

// Signup Controller
const signupController = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered. Please login instead.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        // Send success response
        res.status(201).json({
            success: true, message: "Signup successful!", user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { signupController };

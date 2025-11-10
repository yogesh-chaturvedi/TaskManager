const bcrypt = require('bcrypt');
const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');

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
            message: "Signup successful!", user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            success: true
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

// login controller 
const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Check if user already exists
        const isPresent = await UserModel.findOne({ email });
        if (!isPresent) {
            return res.status(400).json({
                message: "No User Found.",
                success: false
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, isPresent.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password.",
                success: false,
            });
        }

        // setting jwt token
        const token = jwt.sign({ userId: isPresent._id, userEmail: isPresent.email }, process.env.JWT_SECRET);


        // setting token into cookie
        res.cookie('Token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        const { _id, name, role } = isPresent;

        // Send success response
        res.status(200).json({ message: 'Login Successfull', success: true, UserData: { _id, name, role } })

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

// logout controllers
const logoutController = async (req, res) => {

    try {
        // clearing token from cookie
        res.clearCookie('Token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })

        // Send success response
        res.status(200).json({ message: 'Logout Successfull', success: true })

    } catch (error) {
        console.error("logout error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};


module.exports = { signupController, loginController, logoutController };

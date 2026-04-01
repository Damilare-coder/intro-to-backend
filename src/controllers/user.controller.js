//controllers decide the kind of request that can pass; they handle requests

import { User } from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        // check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() })

        if (existing) {
            return res.status(400).json({ message: "User already exists!" })
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered",
            user: { id: user.id, email: user.email, username: user.username }
        })
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email (case insensitive)
        const user = await User.findOne({ 
            email: email.toLowerCase() 
        });

        // If user doesn't exist
        if (!user) {
            return res.status(400).json({ 
                message: "User not found" 
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid credentials" 
            });
        }

        // Login successful
        res.status(200).json({
            message: "User logged in",
            user: {
                id: user._id,           // Use _id instead of .id (more reliable)
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Login error:", error);   // ← Important: Log the real error
        res.status(500).json({
            message: "Internal server error",
            error: error.message   // Remove this line in production
        });
    }
};

export {
    registerUser,
    loginUser
}
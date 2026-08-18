const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })};

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword    
        })

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email
            }
        })
    
    
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            return res.status(200).json({
                token: generateToken(foundUser._id),
            });
        }

        res.status(401).json({
            message: "Invalid email or password"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { registerUser, loginUser };
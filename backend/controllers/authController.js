import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validationResult } from "express-validator";
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name,email: email.toLowerCase(),password: hashedPassword});
        res.status(201).json({
            success: true,
            message: "Registration Successful"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: "Please login using Google"
            });
        }
        const match = await bcrypt.compare( password,user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        console.log("JWT SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "7d" } );
        res.status(200).json({ success: true,token, user: {id: user._id,name: user.name,email: user.email,picture: user.picture }});   
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const googleSuccess = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id,email: req.user.email}, process.env.JWT_SECRET,{expiresIn: "7d"});       
        res.redirect(`http://localhost:5173/oauth-success?token=${token}`); 
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const googleFailure = (req, res) => {
    res.status(401).json({
        success: false,
        message: "Google Authentication Failed"
    });
};
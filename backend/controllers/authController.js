import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc Register a new user

export const registerUser = async(req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({message: "User registered successfully"});
    } catch (error){
        res.status(500).json({message: "Server error", error});
    }
};

// @desc Login user

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentails"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        );
        
        res.json({
            message: "Login successfull",
            token,
            user: { id: user._id, name: user.name, role: user.role}
        })
    } catch (error){
        res.status(500).json({message: "Server error", error});
    }
};
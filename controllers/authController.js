import userModel from '../models/userModel.js';
import { hashPassword } from './../helpers/authHelper.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // 🛑 Validations (Better structure)
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // 🔍 Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered, please login',
            });
        }

        // 🔒 Hash password
        const hashedPassword = await hashPassword(password);

        // 📝 Save user in DB
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        }).save();

        // ✅ Success Response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in Registration',
            error: error.message,
        });
    }
};

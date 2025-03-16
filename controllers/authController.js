import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered, please login',
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Save user in DB
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        }).save();

        // Success Response
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

//LOGIN CONTROLLER
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;

        //Validation
        if(!email || !password) {
            return res.status(404).json({
                success: false,
                message: 'Inavlid UserName or Password'
            });
        }

        //Check user
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Registred"
            });
        }

        //Check if password is correct
        const match = await comparePassword(password,user.password);
        if(!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            users: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    }

    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message:  'Error in Login',
            error: error.message
        });
    }
};
import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected Routes (Needs token to access)
export const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided, authorization denied.",
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized Access. Admins only.",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Admin Middleware",
            error: error.message,
        });
    }
};

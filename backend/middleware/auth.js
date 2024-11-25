import { trycatchmethod } from './trycatchmethod.js';
import { ErrorHandler } from "../util/ErrorHandler.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = trycatchmethod(async (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return next(new ErrorHandler("Please login to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message); 
        return next(new ErrorHandler("Invalid token", 401));
    }
});

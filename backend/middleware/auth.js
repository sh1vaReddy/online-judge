import { trycatchmethod } from './trycatchmethod.js';
import { ErrorHandler } from "../util/ErrorHandler.js";
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/User.js';

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


export const authoriesrole = (...roles) => {
  return (req, res, next) => {
    // Ensure req.user exists and has a role
    if (!req.user || !req.user.role) {
        return next(new ErrorHandler("User role not defined", 403));
    }

    
    if (!roles.includes(req.user.role)) {
        return next(
            new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,
                403
            )
        );
    }

    next();
  };
};

  
export const socketAuthenticator = async (err, socket, next) => {
    try {
        if (err) return next(err);

        const authToken = socket.request.cookies["token"];

        
        if (!authToken) {
            return next(new ErrorHandler("Please login to access this route", 401));
        }

        const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

        const user = await UserModel.findById(decodedData._id);

        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }

        socket.user = user;
        next();

    } catch (error) {
        console.error("Socket Auth Error:", error);
        return next(new ErrorHandler("Please login to access this route", 401));
    }
};
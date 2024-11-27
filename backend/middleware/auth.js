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


export const authoriesrole = (...roles) => {
    return (req, res, next) => {
      // Ensure the user object exists and has a role
      if (!req.user || !req.user.role) {
        return next(
          new ErrorHandler("User role is not available to check access", 403)
        );
      }
  
      // Check if the user's role is in the allowed roles
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
  

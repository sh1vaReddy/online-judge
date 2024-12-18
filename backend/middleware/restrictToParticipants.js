import jwt from 'jsonwebtoken';
import { ContestModel } from "../model/ContestSchema.js";
import { trycatchmethod } from "../middleware/trycatchmethod.js";
import  {ErrorHandler}  from '../util/ErrorHandler.js'

export const restrictToParticipants = trycatchmethod(async (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return next(new ErrorHandler("Please login to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        const { id } = req.params;

        const contest = await ContestModel.findById(id);

        if (!contest) {
            return res
                .status(404)
                .json({ success: false, message: "Contest not found." });
        }

        const isParticipant = contest.participants.some(
            (participantId) => participantId.toString() === userId
        );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You are not a participant in this contest.",
            });
        }

        // Proceed to the next middleware if all checks pass
        next();
    } catch (err) {
        // Handle any errors during token verification or other operations
        return next(new ErrorHandler("Invalid or expired token. Please login again.", 401));
    }
});

import { LeaderboardModel } from '../model/LeaderboardSchema.js';
import mongoose from 'mongoose';
import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ContestModel } from "../model/ContestSchema.js";
import { UserModel } from "../model/User.js";

export const createLeaderboard = trycatchmethod(async (req, res) => {
    const { contestId, score } = req.body;

    // Threshold for submissions after which score is reduced
    const SUBMISSION_THRESHOLD =process.env.SUBMISSION_THRESHOLD;
    const SCORE_PENALTY = process.env.SCORE_PENALTY;

    // Fetch or create leaderboard for the contest
    let leaderboard = await LeaderboardModel.findOne({ contestId });
    let username=await UserModel.findById(req.user._id);

    if (!leaderboard) {
        leaderboard = await LeaderboardModel.create({
            contestId,
            rankings: [
                {
                    userId: req.user._id,
                    Username:username.username,
                    score,
                    submissions: 1,
                    rank: 1,
                },
            ],
        });
    } else {
        const userIndex = leaderboard.rankings.findIndex(
            (entry) => entry.userId.toString() === req.user._id.toString()
        );

        if (userIndex !== -1) {
            // Update existing user's score and submission count
            leaderboard.rankings[userIndex].submissions += 1;

            // Apply penalty if submissions exceed the threshold
            if (leaderboard.rankings[userIndex].submissions > SUBMISSION_THRESHOLD) {
                leaderboard.rankings[userIndex].score = Math.max(
                    0,
                    leaderboard.rankings[userIndex].score - SCORE_PENALTY
                );
            } else {
                leaderboard.rankings[userIndex].score += score;
            }
        } else {
            // Add new user to the rankings
            leaderboard.rankings.push({
                userId: req.user._id,
                score,
                submissions: 1,
                rank: leaderboard.rankings.length + 1,
            });
        }

        // Sort rankings by score in descending order
        leaderboard.rankings.sort((a, b) => b.score - a.score);

        // Reassign ranks based on the sorted order
        leaderboard.rankings.forEach((entry, index) => {
            entry.rank = index + 1;
        });
    }

    await leaderboard.save();

    

    res.status(200).json({
        success: true,
        message: 'Leaderboard updated successfully',
        data: leaderboard,
    });
});



export const getAllLeaderboards = trycatchmethod(async (req, res) => {
    // Fetch all leaderboards from the database
    const leaderboards = await LeaderboardModel.find();

    
    if (!leaderboards || leaderboards.length === 0) {
        // No leaderboards found
        return res.status(400).json({
            success: false,
            message: "No leaderboards found.",
        });
    }
    

    // Successfully fetched leaderboards
    return res.status(200).json({
        success: true,
        message: "Leaderboards retrieved successfully.",
        data: leaderboards,
    });
});

export const getLeaderboardByContestId = trycatchmethod(async (req, res) => {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contest ID format. ID must be a 24-character hexadecimal string.",
            });
        }

        // Find the leaderboard by ID
        const leaderboard = await LeaderboardModel.findById(id);

        if (!leaderboard) {
            return res.status(404).json({
                success: false,
                message: "Leaderboard not found.",
            });
        }

        // Return the found leaderboard
        return res.status(200).json({
            success: true,
            message: "Leaderboard retrieved successfully.",
            data: leaderboard,
        });
    });

export const updateLeaderboard = trycatchmethod(async (req, res) => {
        const { id } = req.params;
    const { userId, score } = req.body;

    const leaderboard = await LeaderboardModel.findById(id);

    if (!leaderboard) {
        return res.status(404).json({
            success: false,
            message: "Leaderboard not found",
        });
    }

    const userIndex = leaderboard.rankings.findIndex(
        (r) => r.userId.toString() === userId
    );

    if (userIndex > -1) {
        leaderboard.rankings[userIndex].score += score;
        leaderboard.rankings[userIndex].submissions += 1;
    } else {
        leaderboard.rankings.push({ userId, score, submissions: 1 });
    }

    // Sort rankings by score in descending order and update ranks
    leaderboard.rankings.sort((a, b) => b.score - a.score);
    leaderboard.rankings.forEach((r, i) => (r.rank = i + 1));

    await leaderboard.save();

    res.status(200).json({
        success: true,
        message: 'Rankings updated successfully',
        data: leaderboard.rankings,
    });
});


export const deleteLeaderboar=trycatchmethod(async()=>{
    const {id}=req.params;

    const deleteLeaderboard=await LeaderboardModel.findByIdAndDelete(id);
    if (!deleteLeaderboard) {
        return res.status(404).json({ success: false, message: 'Leaderboard not found' });
      }
    
      // Notify clients about leaderboard deletion
      io.emit("leaderboardDeleted", { contestId: id });

      res.status(200).json({
        success: true,
        message: 'Leaderboard deleted successfully',
      });

})
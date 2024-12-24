import express from 'express';
import { createLeaderboard, getAllLeaderboards, getLeaderboardByContestId, updateLeaderboard } from '../controller/Leaderboard_Controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router=express.Router();


router.post("/create/leaderborad",isAuthenticated,createLeaderboard);
router.get("/GetallLeaderBoard",getAllLeaderboards);
router.get("/Leaderboard/:id",getLeaderboardByContestId);
router.put("/update/Leaderboard/:id",updateLeaderboard);
router.delete("/delete/Leaderborad/:id",getAllLeaderboards);


export default router;
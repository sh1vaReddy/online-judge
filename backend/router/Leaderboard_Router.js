import express from 'express';
import { createLeaderboard, getAllLeaderboards, getLeaderboardByContestId, updateLeaderboard } from '../controller/Leaderboard_Controller.js';
const router=express.Router();


router.post("/create/leaderborad",createLeaderboard);
router.get("/GetallLeaderBoard",getAllLeaderboards);
router.get("/Leaderboard/:id",getLeaderboardByContestId);
router.put('update/Leaderboard/:id',updateLeaderboard);


export default router;
import express from 'express';
import { createLeaderboard, deleteLeaderboar, getAllLeaderboards, getLeaderboardByContestId, updateLeaderboard } from '../controller/Leaderboard_Controller.js';
import { isAuthenticated,authoriesrole } from '../middleware/auth.js';
const router=express.Router();


router.post("/create/leaderborad",isAuthenticated,authoriesrole("admin"),createLeaderboard);
router.get("/GetallLeaderBoard",getAllLeaderboards);
router.get("/Leaderboard/:id",isAuthenticated,authoriesrole("admin"),getLeaderboardByContestId);
router.put("/update/Leaderboard/:id",isAuthenticated,authoriesrole("admin"),updateLeaderboard);
router.delete("/delete/Leaderborad/:id",isAuthenticated,authoriesrole("admin"),deleteLeaderboar);


export default router;
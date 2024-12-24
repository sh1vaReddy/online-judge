import express from 'express';
import { createLeaderboard, getAllLeaderboards } from '../controller/Leaderboard_Controller.js';
const router=express.Router();


router.post("/create/leaderborad",createLeaderboard);
router.get("/GetallLeaderBoard",getAllLeaderboards)


export default router;
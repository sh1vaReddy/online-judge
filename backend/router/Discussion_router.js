import express from "express";
const router = express.Router();
import { createDiscussion } from "../controller/Discussion.js";


router.post("/Discussion/create",createDiscussion);

export default router;
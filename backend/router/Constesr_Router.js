import express from 'express';
const router=express.Router();
import {createContest} from '../controller/Contest_Controller.js';

router.post('/create/contest',createContest);

export default router;
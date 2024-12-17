import express from 'express';
const router=express.Router();
import {createContest, getallContest} from '../controller/Contest_Controller.js';

router.post('/create/contest',createContest);
router.get('/getallcontest',getallContest);

export default router;
import express from 'express';
const router=express.Router();
import {createContest, getallContest, getallcontestbyid} from '../controller/Contest_Controller.js';

router.post('/create/contest',createContest);
router.get('/getallcontest',getallContest);
router.get('/getcontest/:id',getallcontestbyid);

export default router;
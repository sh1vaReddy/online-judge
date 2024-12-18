import express from 'express';
const router=express.Router();
import {createContest, getallContest, getallcontestbyid} from '../controller/Contest_Controller.js';
import { restrictToParticipants } from '../middleware/restrictToParticipants.js';
import { isAuthenticated,authoriesrole } from '../middleware/auth.js';

router.post('/create/contest',isAuthenticated,authoriesrole,createContest);
router.get('/getallcontest',isAuthenticated,authoriesrole,getallContest);
router.get('/getcontest/:id',isAuthenticated,restrictToParticipants,getallcontestbyid);

export default router;
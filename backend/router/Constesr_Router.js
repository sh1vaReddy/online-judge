import express from 'express';
const router=express.Router();
import {createContest, getallContest, getallcontestbyid,  getContestList,  getContestsOfTheUser} from '../controller/Contest_Controller.js';
import { restrictToParticipants } from '../middleware/restrictToParticipants.js';
import { isAuthenticated,authoriesrole } from '../middleware/auth.js';

router.post('/create/contest',isAuthenticated,authoriesrole,createContest);
router.get('/getallcontest',getallContest);
router.get('/getcontest/:id',getallcontestbyid);
router.get('/user/contest',isAuthenticated,getContestsOfTheUser)
router.get('/getcontsetlist',getContestList)


export default router;
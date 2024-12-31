import express from 'express';
const router=express.Router();
import {createContest, getallContest, getallcontestbyid,  getContestList,  getContestsOfTheUser} from '../controller/Contest_Controller.js';
import { restrictToParticipants } from '../middleware/restrictToParticipants.js';
import { isAuthenticated,authoriesrole } from '../middleware/auth.js';

router.post('/create/contest',isAuthenticated,authoriesrole("admin"),createContest);
router.get('/getallcontest',isAuthenticated,authoriesrole("admin"),getallContest);
router.get('/getcontest/:id',isAuthenticated,restrictToParticipants,getallcontestbyid);
router.get('/user/contest',isAuthenticated,authoriesrole("admin"),getContestsOfTheUser)
router.get('/getcontsetlist',isAuthenticated,authoriesrole("admin"),getContestList)


export default router;
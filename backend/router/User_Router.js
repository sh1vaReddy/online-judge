import express from 'express';
const router=express.Router();
import {getallusers, getmyprofile, getuserbyid, Login, logout, Register} from '../controller/User_Controller.js';
import {authoriesrole, isAuthenticated} from '../middleware/auth.js';

router.post('/sing_up',Register);
router.post('/Login',Login)
router.get('/me',isAuthenticated,getmyprofile);
router.get('/logout',isAuthenticated,logout);
router.get("/getallusers",isAuthenticated,authoriesrole("admin"),getallusers)
router.post("/getUserInfo",getuserbyid);

export default router;  
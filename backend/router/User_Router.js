import express from 'express';
const router=express.Router();
import {getmyprofile, Login, logout, Register} from '../controller/User_Controller.js';
import {isAuthenticated} from '../middleware/auth.js';

router.post('/sing_up',Register);
router.post('/Login',Login)
router.get('/me',isAuthenticated,getmyprofile);
router.get('/logout',isAuthenticated,logout);

export default router;  
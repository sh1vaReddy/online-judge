import express from 'express';
const router=express.Router();
import {Login, Register} from '../controller/User_Controller.js'
import {isAuthenticated} from '../middleware/auth.js' 
import { profile } from '../controller/Profile.js';

router.post('/sing_up',Register);
router.post('/Login',Login)
router.get('/profil',isAuthenticated,profile)

export default router;
import express from 'express';
const router=express.Router();
import {Login, Register} from '../controller/User_Controller.js'

router.post('/sing_up',Register);
router.post('/Login',Login)

export default router;
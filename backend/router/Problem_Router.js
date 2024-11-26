import express from 'express';
const router=express.Router();
import {createproblem, deleteproblem, getallproblem, getproblem, updateproblem} from '../controller/Problem_Controller.js';
import {isAuthenticated} from '../middleware/auth.js' 

router.post('/create/problem',isAuthenticated,createproblem);
router.get('/getallproblems',getallproblem);
router.get('/problems/:id?', getproblem);
router.get('/problems/title/:title?', getproblem);
router.delete('/problems/:id?',deleteproblem);
router.delete('/problems/title/:title?',deleteproblem);
router.put('/problems/:id?',updateproblem);
router.put('/problems/title/:title?',updateproblem);


export default router;
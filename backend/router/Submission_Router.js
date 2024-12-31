import express from "express";
const router = express.Router();
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionsByProblemId,
  getSubmissionsByUserId,
  updateSubmission,
  deleteSubmission,
} from "../controller/Submission_Controller.js";
import {isAuthenticated,authoriesrole} from '../middleware/auth.js';


router.post('/submissions',isAuthenticated,createSubmission);
router.get('/submissions',isAuthenticated,getAllSubmissions);
router.get('/submissions/user/:user_id',getSubmissionsByUserId);
router.get('/submissions/problem/:id',getSubmissionsByProblemId);
router.put('/submissions/:id',isAuthenticated,authoriesrole("admin"),updateSubmission);
router.delete('/submissions/:id',isAuthenticated,authoriesrole("admin"),deleteSubmission);

export default router;

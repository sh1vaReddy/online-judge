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


router.post('/submissions/',createSubmission);
router.get('/submissions/',getAllSubmissions);
router.get('/submissions/user/:user_id',getSubmissionsByUserId);
router.get('/submissions/problem/:problem_id',getSubmissionsByProblemId);
router.put('/submissions/:id',updateSubmission);
router.delete('/submissions/:id',deleteSubmission);

export default router;

import express from 'express';
const router = express.Router();
import {
  createproblem,
  deleteproblem,
  getallproblem,
  getproblem,
  updateproblem,
} from '../controller/Problem_Controller.js';
import { isAuthenticated, authoriesrole } from '../middleware/auth.js';

// Create a new problem (admin-only)
router.post(
  '/create/problem',
  isAuthenticated,
  authoriesrole('admin'),
  createproblem
);

// Get all problems (authenticated users)
router.get(
  '/getallproblems',
  isAuthenticated,
  authoriesrole('admin', 'user'),
  getallproblem
);

// Get problem by ID or title
router.get('/problems/:id?', getproblem);
router.get('/problems/title/:title?', isAuthenticated, getproblem);

// Delete problem by ID or title (admin-only)
router.delete(
  '/problems',
  isAuthenticated,
  authoriesrole('admin'),
  deleteproblem
);

// Update problem by ID or title (admin-only)
router.put(
  '/update/problems',
  isAuthenticated,
  authoriesrole('admin'),
  updateproblem
);


export default router;

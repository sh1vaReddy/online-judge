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
router.get('/problems/:id?', isAuthenticated, getproblem);
router.get('/problems/title/:title?', isAuthenticated, getproblem);

// Delete problem by ID or title (admin-only)
router.delete(
  '/problems/:id?',
  isAuthenticated,
  authoriesrole('admin'),
  deleteproblem
);
router.delete(
  '/problems/title/:title?',
  isAuthenticated,
  authoriesrole('admin'),
  deleteproblem
);

// Update problem by ID or title (admin-only)
router.put(
  '/problems/:id?',
  isAuthenticated,
  authoriesrole('admin'),
  updateproblem
);
router.put(
  '/problems/title/:title?',
  isAuthenticated,
  authoriesrole('admin'),
  updateproblem
);

export default router;

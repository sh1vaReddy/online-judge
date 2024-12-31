import express from "express";
const router = express.Router();
import {
  createproblem,
  deleteproblem,
  getAllProblems,
  getproblem,
  updateproblem,
} from "../controller/Problem_Controller.js";
import { isAuthenticated, authoriesrole } from "../middleware/auth.js";

// Create a new problem (admin-only)
router.post(
  "/create/problem",
  isAuthenticated,
  authoriesrole,
  createproblem
);


router.get(
  "/getallproblems",
   getAllProblems
);

// Get problem by ID or title
router.get("/problems/:id?", getproblem); // Public route for fetching a problem by ID
router.get(
  "/problems/title/:title?",
  getproblem
);

// Delete problem by ID or title (admin-only)
router.delete(
  "/problems",
  isAuthenticated,
  authoriesrole("admin"),
  deleteproblem
);

// Update problem by ID or title (admin-only)
router.put(
  "/update/problems",
  isAuthenticated,
  authoriesrole("admin"),
  updateproblem
);



export default router;

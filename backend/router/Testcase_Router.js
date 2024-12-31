import {
  createTestcases,
  getalltestcase,
  gettestcasebyid,
  gettestcasebyproblemid,
  updatetestcase,
  deletetestcase,
  testcasemData
} from "../controller/TestCase_controller.js";
import express from 'express';
const router=express.Router();
import {isAuthenticated,authoriesrole} from '../middleware/auth.js'
// Routes for test cases

// Create a new test case
router.post("/testcases",isAuthenticated,authoriesrole("admin"),createTestcases );

// Get all test cases
router.get("/testcases", getalltestcase);

// Get a single test case by its ID
router.get("/testcases/:id", gettestcasebyid);

// Get all test cases for a specific problem ID
router.get("/testcases/problem/:id", gettestcasebyproblemid);

// Update a test case by its ID
router.put("/testcases/:id",isAuthenticated,authoriesrole("admin"),updatetestcase);

// Delete a test case by its ID
router.delete("/testcases/:id",isAuthenticated,authoriesrole("admin"),deletetestcase);


export default router;

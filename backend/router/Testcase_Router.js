import {
  createTestcase,
  getalltestcase,
  gettestcasebyid,
  gettestcasebyproblemid,
  updatetestcase,
  deletetestcase
} from "../controller/TestCase_controller.js";
import express from 'express';
const router=express.Router();
// Routes for test cases

// Create a new test case
router.post("/testcases", createTestcase);

// Get all test cases
router.get("/testcases", getalltestcase);

// Get a single test case by its ID
router.get("/testcases/:id", gettestcasebyid);

// Get all test cases for a specific problem ID
router.get("/testcases/problem/:problemId", gettestcasebyproblemid);

// Update a test case by its ID
router.put("/testcases/:id", updatetestcase);

// Delete a test case by its ID
router.delete("/testcases/:id", deletetestcase);

export default router;

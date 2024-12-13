import { TestcaseModel } from "../model/TestCaseSchema.js";
import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ErrorHandler } from "../util/ErrorHandler.js";

// Create Test Case
export const createTestcases = trycatchmethod(async (req, res, next) => {
  const { testcases } = req.body;

  if (!Array.isArray(testcases) || testcases.length === 0) {
    return next(new ErrorHandler("Testcases must be a non-empty array", 400));
  }

  // Validate each testcase in the array
  for (const testcase of testcases) {
    if (!testcase.problem_id || !testcase.input || !testcase.output) {
      return next(new ErrorHandler("Each testcase must include problem_id, input, and output", 400));
    }
  }

  const createdTestcases = await TestcaseModel.insertMany(
    testcases.map(({ problem_id, input, output }) => ({
      problem_id,
      input,
      expected_output: output,
    }))
  );

  res.status(201).json({
    success: true,
    message: "Successfully created test cases.",
    createdTestcases,
  });
});


// Get All Test Cases
export const getalltestcase = trycatchmethod(async (req, res, next) => {
  const allTestcases = await TestcaseModel.find().populate("problem_id", "title");
  res.status(200).json({
    success: true,
    message: "All test cases retrieved successfully.",
    testcases: allTestcases,
  });
});

// Get Test Case by ID
export const gettestcasebyid = trycatchmethod(async (req, res, next) => {
  const testcase = await TestcaseModel.findById(req.params.id).populate(
    "problem_id",
    "title"
  );

  if (!testcase) {
    return next(new ErrorHandler("Test case not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Test case retrieved successfully.",
    testcase,
  });
});

// Get Test Cases by Problem ID
export const gettestcasebyproblemid = trycatchmethod(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Problem ID is required", 400));
  }

  const testcases = await TestcaseModel.find({ problem_id: id }).populate(
    "problem_id",
    "title"
  );

  if (!testcases.length) {
    return next(new ErrorHandler("No test cases found for the given problem ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "Test cases retrieved successfully.",
    testcases,
  });
});

// Update Test Case
export const updatetestcase = trycatchmethod(async (req, res, next) => {
  const { problem_id, input, expected_output } = req.body;

  if (!problem_id || !input || !expected_output) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const updatedTestcase = await TestcaseModel.findByIdAndUpdate(
    req.params.id,
    {
      problem_id,
      input,
      expected_output,
      updated_at: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!updatedTestcase) {
    return next(new ErrorHandler("Test case not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Test case updated successfully.",
    updatedTestcase,
  });
});

// Delete Test Case
export const deletetestcase = trycatchmethod(async (req, res, next) => {
  const deletedTestcase = await TestcaseModel.findByIdAndDelete(req.params.id);

  if (!deletedTestcase) {
    return next(new ErrorHandler("Test case not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Test case deleted successfully.",
    deletedTestcase,
  });
});

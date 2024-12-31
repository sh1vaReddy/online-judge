import { TestcaseModel } from "../model/TestCaseSchema.js";
import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ErrorHandler } from "../util/ErrorHandler.js";
import { ProblemModel } from "../model/ProblemSchema.js";

// Create Test Case
export const createTestcases = trycatchmethod(async (req, res, next) => {
  const { testcases } = req.body;
  console.log(testcases);

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
   const Problem_id=await ProblemModel.findById(id);
   const findtestId=Problem_id.problem_id;
   console.log(findtestId);

  if (!findtestId) {
    return next(new ErrorHandler("Problem ID is required", 400));
  }

  const testcases = await TestcaseModel.find({
    problem_id:findtestId});

  console.log(testcases);

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

export const testcasemData = async (req, res) => {
  console.log("Starting to insert data into the database...");
  try {
    const problems = [
      {
        problem_id: 1,
        test_cases: [
          { input: "[2, 7, 11, 15], target = 9", expected_output: "[0, 1]" },
          { input: "[3, 2, 4], target = 6", expected_output: "[1, 2]" },
          { input: "[3, 3], target = 6", expected_output: "[0, 1]" }
        ]
      },
      {
        problem_id: 2,
        test_cases: [
          { input: "\"abcabcbb\"", expected_output: "3" },
          { input: "\"bbbbb\"", expected_output: "1" },
          { input: "\"pwwkew\"", expected_output: "3" }
        ]
      },
      {
        problem_id: 3,
        test_cases: [
          { input: "[[1,3],[2,6],[8,10],[15,18]]", expected_output: "[[1,6],[8,10],[15,18]]" },
          { input: "[[1,4],[4,5]]", expected_output: "[[1,5]]" },
          { input: "[[1,3],[5,7],[8,10]]", expected_output: "[[1,3],[5,7],[8,10]]" }
        ]
      },
      {
        problem_id: 4,
        test_cases: [
          { input: "\"()\"", expected_output: "true" },
          { input: "\"()[]{}\"", expected_output: "true" },
          { input: "\"(]\"", expected_output: "false" }
        ]
      },
      {
        problem_id: 5,
        test_cases: [
          { input: "123", expected_output: "321" },
          { input: "-123", expected_output: "-321" },
          { input: "120", expected_output: "21" }
        ]
      }
    ];
    
    const insertedProblems = await TestcaseModel.insertMany(problems);
    res.status(201).json({
      message: "Problems successfully inserted into the database.",
      insertedCount: insertedProblems.length,
      insertedProblems,
    });
  } catch (error) {
    console.error("Error inserting problems:", error);
    res.status(500).json({ message: "Error inserting problems into the database", error });
  }
};

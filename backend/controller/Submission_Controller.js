import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ProblemModel } from "../model/ProblemSchema.js";
import { SubmissionModel } from "../model/SubmissionSchema.js";
import { ErrorHandler } from "../util/ErrorHandler.js";

// Create a new submission

export const createSubmission = trycatchmethod(async (req, res, next) => {
  const {
    user_id,
    problem_id,
    code,
    language,
    execution_time,
    memory_used,
    status,
    test_cases_passed,
    total_test_cases,
  } = req.body;


  

  // Validate the presence of all fields
  

  // Create the submission record in the database
  const newSubmissionResult = await SubmissionModel.create({
    user_id,
    problem_id,
    code,
    language,
    execution_time,
    memory_used,
    status,
    test_cases_passed,
    total_test_cases,
  });

  // Respond with success
  res.status(201).json({
    success: true,
    message: "Submission created successfully.",
    submission: newSubmissionResult,
  });
});


// Get all submissions
export const getAllSubmissions = trycatchmethod(async (req, res, next) => {
  const submissions = await SubmissionModel.find()
    .populate("problem_id", "title")
    .exec();


  res.status(200).json({
    success: true,
    message: "All submissions retrieved successfully.",
    submissions,
  });
});

// Get submissions by user_id
export const getSubmissionsByUserId = trycatchmethod(async (req, res, next) => {
  const { user_id } = req.params;
  const submissions = await SubmissionModel.find({ user_id }).populate(
    "problem_id",
    "title"
  );

  if (!submissions || submissions.length === 0) {
    return next(new ErrorHandler("No submissions found for this user", 404));
  }

  res.status(200).json({
    success: true,
    message: "Submissions retrieved successfully.",
    submissions,
  });
});

// Get submissions by problem_id
export const getSubmissionsByProblemId = trycatchmethod(async (req, res, next) => {
   const { id } = req.params;


  const submissions = await SubmissionModel.find({
    problem_id:id }).populate(
    "problem_id",
    "title"
  );

  if (!submissions || submissions.length === 0) {
    return next(new ErrorHandler("No submissions found for this problem", 404));
  }

  res.status(200).json({
    success: true,
    message: "Submissions retrieved successfully.",
    submissions,
  });
});



// Update a submission by ID
export const updateSubmission = trycatchmethod(async (req, res, next) => {
  const { id } = req.params;

  const {
    user_id,
    problem_id,
    code,
    language,
    execution_time,
    memory_used,
    status,
    test_cases_passed,
    total_test_cases,
  } = req.body;

  if (
    !user_id ||
    !problem_id ||
    !code ||
    !language ||
    !execution_time ||
    !memory_used ||
    !status ||
    !test_cases_passed ||
    !total_test_cases
  ) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const updatedSubmission = await SubmissionModel.findByIdAndUpdate(
    id,
    {
      user_id,
      problem_id,
      code,
      language,
      execution_time,
      memory_used,
      status,
      test_cases_passed,
      total_test_cases,
    },
    { new: true } // Return the updated document
  );

  if (!updatedSubmission) {
    return next(new ErrorHandler("No submission found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "Submission updated successfully.",
    submission: updatedSubmission,
  });
});

// Delete a submission by ID
export const deleteSubmission = trycatchmethod(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubmission = await SubmissionModel.findByIdAndDelete(id);

  if (!deletedSubmission) {
    return next(new ErrorHandler("No submission found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "Submission deleted successfully.",
    submission: deletedSubmission,
  });
});

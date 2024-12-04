import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ProblemModel } from "../model/ProblemSchema.js";
import { ErrorHandler } from "../util/ErrorHandler.js";


export const createproblem= trycatchmethod(async (req, res, next) => {
  const {
    title,
    description,
    difficulty,
    constraints,
    tags,
    examples,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !difficulty ||
    !constraints ||
    !examples ||
    !tags
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Validate difficulty
  const allowedDifficulties = ["Easy", "Medium", "Hard"];
  if (!allowedDifficulties.includes(difficulty)) {
    return res.status(400).json({
      success: false,
      message: "Invalid difficulty. Allowed values: Easy, Medium, Hard.",
    });
  }

  // Validate arrays
  if (!Array.isArray(tags) || !Array.isArray(examples)) {
    return res.status(400).json({
      success: false,
      message: "Tags and examples must be arrays.",
    });
  }

  // Ensure examples follow correct format
  const areExamplesValid = examples.every(
    (ex) => ex.input && ex.output
  );
  if (!areExamplesValid) {
    return res.status(400).json({
      success: false,
      message:
        "Examples must be an array of objects with 'input' and 'output' properties.",
    });
  }

  // Check if a problem with the same title exists
  const existingProblem = await ProblemModel.findOne({ title });
  if (existingProblem) {
    return res
      .status(409)
      .json({ success: false, message: "Problem already exists." });
  }

  // Create a new problem
  const problem = await ProblemModel.create({
    title,
    description,
    difficulty,
    constraints,
    tags,
    examples,
  });

  return res
    .status(201)
    .json({ success: true, message: "Problem successfully created.", problem });
});

export const getallproblem = trycatchmethod(async (req, res, next) => {
  const problem = await ProblemModel.find();

  if (!problem) {
    return res.status(404).json({
      sucess: true,
      message: "Problems Are NOt Found",
    });
  }

  res.status(200).json({
    sucess: true,
    message: "All Problem",
    problem,
  });
});

export const getproblem = trycatchmethod(async (req, res, next) => {
  const { id, title } = req.params;
  console.log(id);

  if (!id && !title) {
    return res.status(400).json({
      success: false,
      message: "Problem identifier (ID or title ) is required.",
    });
  }

  let problem;

  try {
    if (id && /^\d+$/.test(id)) {
      problem = await ProblemModel.findOne({ problem_id: parseInt(id, 10) });
    } else if (title) {
      problem = await ProblemModel.findOne({ title: title });
    }

    if (!problem) {
      return next(new ErrorHandler("Problem not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Problem successfully found.",
      problem,
    });
  } catch (error) {
    return next(
      new ErrorHandler("An error occurred while fetching the problem.", 500)
    );
  }
});

export const deleteproblem = trycatchmethod(async (req, res, next) => {
  const { id, title } = req.body;

  if (!id && !title) {
    return res.status(400).json({
      success: false,
      message: "Problem identifier (ID or title) is required.",
    });
  }

  let deletedProblem;

  try {
    const filter =
      id && /^\d+$/.test(id)
        ? { problem_id: parseInt(id, 10) }
        : { title: decodeURIComponent(title) };

    deletedProblem = await ProblemModel.findOneAndDelete(filter);

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found. Unable to delete.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem successfully deleted.",
      problem: deletedProblem,
    });
  } catch (error) {
    return next(
      new ErrorHandler("An error occurred while deleting the problem.", 500)
    );
  }
});

export const updateproblem = trycatchmethod(async (req, res, next) => {
  const { id, title } = req.params;

  if (!id && !title) {
    return res.status(400).json({
      success: false,
      message: "Problem identifier (ID or title) is required.",
    });
  }

  const { description, difficulty, constraints, topics } = req.body;

  if (!description && !difficulty && !constraints && !topics) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (description, difficulty, constraints, or topics) must be provided to update.",
    });
  }

  let updatedProblem;

  try {
    const filter =
      id && /^\d+$/.test(id)
        ? { problem_id: parseInt(id, 10) }
        : { title: decodeURIComponent(title) };

    const updateFields = {};

    if (description) updateFields.description = description;
    if (difficulty) {
      const allowedDifficulties = ["Easy", "Medium", "Hard"];
      if (!allowedDifficulties.includes(difficulty)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid difficulty. Allowed values are: Easy, Medium, Hard.",
        });
      }
      updateFields.difficulty = difficulty;
    }
    if (constraints) updateFields.constraints = constraints;
    if (topics) updateFields.topics = topics;

    updatedProblem = await ProblemModel.findOneAndUpdate(filter, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem successfully updated.",
      problem: updatedProblem,
    });
  } catch (error) {
    return next(
      new ErrorHandler("An error occurred while updating the problem.", 500)
    );
  }
});

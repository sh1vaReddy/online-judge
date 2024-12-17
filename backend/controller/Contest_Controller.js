import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ContestModel } from "../model/ContestSchema.js";
import schedule from "node-schedule";
import mongoose from "mongoose";

export const createContest = trycatchmethod(async (req, res, next) => {
  const { name, description, startTime, endTime, problems, participants } =
    req.body;

  // Validate required fields
  if (!name || !description || !startTime || !endTime || !participants) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Validate start and end time
  if (endDate <= startDate) {
    return res.status(400).json({
      success: false,
      message: "End time must be later than start time.",
    });
  }

  try {
    // Create the contest
    const newContest = await ContestModel.create({
      name,
      description,
      startTime: startDate,
      endTime: endDate,
      problems,
      participants,
    });

    // Schedule the contest using cron-style syntax
    const cronExpression = `${startDate.getUTCSeconds()} ${startDate.getUTCMinutes()} ${startDate.getUTCHours()} ${startDate.getUTCDate()} ${
      startDate.getUTCMonth() + 1
    } *`;

    console.log("Scheduling job with cron expression:", cronExpression);

    const job = schedule.scheduleJob(cronExpression, async function () {
      try {
        console.log(`Contest "${newContest.name}" has started!`);
        console.log("Contest ID to be updated:", newContest._id);

        const updatedContest = await ContestModel.findByIdAndUpdate(
          newContest._id,
          { status: "active" },
          { new: true }
        );

        if (updatedContest) {
          console.log(`Contest "${updatedContest.name}" status set to active.`);
        } else {
          console.error("Contest not found or could not be updated.");
        }
      } catch (err) {
        console.error("Error updating contest status:", err);
      }
    });

    console.log("Job scheduled:", job ? "Successfully" : "Failed");

    if (!job) {
      return res.status(500).json({
        success: false,
        message: "Failed to schedule the contest.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Contest successfully created and scheduled.",
      newContest,
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});


//get all contest
export const getallContest = trycatchmethod(async (req, res) => {
  try {
    const contests = await ContestModel.find();

    // Filter contests with status "active"
    const activeContests = contests.filter(
      (contest) => contest.status === "active"
    );

    if (activeContests.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Active contests retrieved successfully.",
        contests: activeContests,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No active contests are available now.",
    });
  } catch (error) {
    console.error("Error retrieving contests:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});


export const getallcontestbyid = trycatchmethod(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid contest ID format. ID must be a 24-character hexadecimal string.",
    });
  }

  try {
    const contest = await ContestModel.findById(id)
      .populate("problems") 
      .populate("participants");

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contest retrieved successfully.",
      contest,
    });
  } catch (error) {
    console.error("Error retrieving contest by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});



export const deletecontest = trycatchmethod(async (req, res) => {
  try {
    const deletedContest = await ContestModel.findByIdAndDelete(req.params.id);
    if (!deletedContest) {
      return res.status(404).json({ success: false, message: "Contest not found" });
    }

    return res.status(200).json({ success: true, message: "Contest deleted successfully" });
  } catch (error) {
    console.error("Error deleting contest:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}); 
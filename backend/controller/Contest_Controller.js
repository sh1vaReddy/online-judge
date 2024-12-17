import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { ContestModel } from "../model/ContestSchema.js";
import schedule from "node-schedule";


export const createContest = trycatchmethod(async (req, res, next) => {
  const { name, description, startTime, endTime, problems, participants } = req.body;

  // Validate required fields
  if (!name || !description || !startTime || !endTime || !participants) {
    return res.status(400).json({ success: false, message: "All fields are required." });
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

    // Schedule the contest start
    const job = schedule.scheduleJob(startDate, async function () {
      try {
        console.log(`Contest "${newContest.name}" has started!`);
        console.log("Updating contest status for ID:", newContest._id);

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



export const getallContest = async (req, res) => {
  try {
    const contests = await ContestModel.find();

    // Filter contests with status "active"
    const activeContests = contests.filter((contest) => contest.status === "active");

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
};


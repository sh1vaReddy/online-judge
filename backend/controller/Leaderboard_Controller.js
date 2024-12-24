import { LeaderboardModel } from '../model/LeaderboardSchema.js';
import { trycatchmethod } from "../middleware/trycatchmethod.js";
import { FakeSplitIntoListParser } from 'langchain/embeddings/fake';

export const createLeaderboard = trycatchmethod(async (req, res) => {
    const { contestId, userId, score } = req.body;

    let leaderboard=await LeaderboardModel.findById({contestId});

    if(!leaderboard)
    {
      leaderboard=await LeaderboardModel.create({
        contestId,
        rankings:[
            {
                userId,
                score,
                submissions:1,
                rank:1,
            },
        ],
      })
    }
    else
    {
       const UserIndex=leaderboard.rankings.findIndex((entry)=>
         entry.userId.toString()==userId
    );

        if(UserIndex!==-1)
        {
            leaderboard.rankings[UserIndex].score+=score;
            leaderboard.rankings[UserIndex].submissions+=1;
        }
        else
        {
            leaderboard.rankings.push({
                userId,
                score,
                submissions:1,
                rank:leaderboard.rankings.length+1,
            })
        }
    }
});


export const getAllLeaderboards = trycatchmethod(async (req, res) => {
    // Fetch all leaderboards from the database
    const leaderboards = await LeaderboardModel.find();
  
    if (!leaderboards || leaderboards.length === 0) {
      // No leaderboards found
      return res.status(400).json({
        success: false,
        message: "No leaderboards found.",
      });
    }
  
    // Successfully fetched leaderboards
    return res.status(200).json({
      success: true,
      message: "Leaderboards retrieved successfully.",
      data: leaderboards,
    });
  });
  


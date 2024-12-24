import { LeaderboardModel } from '../model/LeaderboardSchema';
import { trycatchmethod } from "../middleware/trycatchmethod";

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



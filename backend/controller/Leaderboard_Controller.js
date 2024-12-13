import {LeaderboardModel} from '../model/LeaderboardSchema';
import { trycatchmethod } from "../middleware/trycatchmethod";

export const createLeaderboard=trycatchmethod(async()=>{
    const{contestId}=req.body;

})
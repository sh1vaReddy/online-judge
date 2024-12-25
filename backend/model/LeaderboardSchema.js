import mongoose,{Schema} from 'mongoose';


const LeaderboardSchema=new Schema({
    contestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Contest',
        required:true,
    },
    rankings:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        Username:{
            type:String,
            required:true,
        },
        score:{
            type:Number,
            default:0,
        },
        submissions:{
            type:Number,
            default:0,
        },
        rank:
        {
            type:Number,
        }
    }]},{
    timestamps:true,
});


export const LeaderboardModel=mongoose.model('Leaderboard',LeaderboardSchema);
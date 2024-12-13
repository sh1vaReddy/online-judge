import mongoose, { Schema } from "mongoose";


const contestSchema=new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    startTime:{
        type:Date,
        required: true,
    },
    endTime:{
        type:Date,
        required: true
    },
    problems:[{

            type:mongoose.Schema.Types.ObjectId,
            ref:'Problem'
     }],
    leaderboard:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        score:{
            type:Number,
            default:0,
        },
        submissions:{
            type:Number,
            default:0,
        }
    }],
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
},
{
    timestamps:true,
});


module.exports=mongoose.model('Contest',contestSchema);
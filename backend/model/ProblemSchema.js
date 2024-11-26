import mongoose, { Schema } from "mongoose";
import AutoIncrement from 'mongoose-sequence';

const AutoIncrementFactory = AutoIncrement(mongoose);


const ProblemSchema=new Schema({
    problem_id:{
        type:Number,
        unique: true, 
    },
    title:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
       required:true,
    },
    difficulty:
    {
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true,
    },
    constraints:{
        type:[String],
        required:true,
    },
    topics:
    {
        type:[String],
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    update_at:{
        type:Date,
        default:Date.now,
    }
});

ProblemSchema.plugin(AutoIncrementFactory,{inc_field:'problem_id'});

export const ProblemModel=mongoose.model("Problem",ProblemSchema);
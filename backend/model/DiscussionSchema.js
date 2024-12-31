import mongoose from "mongoose";


const DiscusSchema=new mongoose.Schema({
    problem_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Problem',
        required:true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    user_name:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

export const DiscussModel=mongoose.model('Discuss',DiscusSchema)
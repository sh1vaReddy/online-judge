import { trycatchmethod } from "../middleware/trycatchmethod.js";
import  {ContestModel} from '../model/ContestSchema.js';

export const createContest=trycatchmethod(async(req,res,next)=>{
    const{name,description,startTime,endTime,problems, participants}=req.body;

    if(!name || !description || !startTime || !endTime || !participants)
    {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const newContest=await ContestModel.create({
        name,
        description,
        startTime,
        endTime,
        problems,
        participants,
    })

    return res.status(201).json({
        success:true,
        message:"Contest Sucesfully Creataed",
        newContest
    })
});


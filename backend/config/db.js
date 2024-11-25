import mongoose from "mongoose";

export const ConnectDB=()=>{
    mongoose.connect(`mongodb://localhost:27017/online_judge`).then(()=>{
        console.log('Database Sucessfuly Connected')
    }).catch((error)=>{
            console.log(error);
        })
};
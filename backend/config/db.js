import mongoose from "mongoose";

export const ConnectDB=()=>{
    mongoose.connect(process.env.mongo_url).then(()=>{
        console.log('Database Sucessfuly Connected')
    }).catch((error)=>{
            console.log(error);
        })
};
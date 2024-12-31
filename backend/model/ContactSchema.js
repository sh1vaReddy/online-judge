import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Email is not valid"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  status:{
    type:String,
    enum:["Pending","Resolved"],
    default:"Pending",
    required:true,
  }
}, { timestamps: true });

export const ContactModel=mongoose.model("Contact",ContactSchema);

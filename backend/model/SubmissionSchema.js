import mongoose, { Schema } from "mongoose";

const SubmissionResultSchema = new Schema({
  user_id: {
    type:mongoose.Schema.ObjectId, 
    ref:'User',
  },
  problem_id: {
    type:mongoose.Schema.ObjectId, 
    ref:'Problem',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['cpp', 'javascript', 'python', 'java'],
    required: true,
  },
  execution_time: {
    type:String,
  },
  memory_used: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Partial', 'Runtime Error', 'Time Limit Exceeded'], 
  },
  test_cases_passed: {
    type: Number,
    default:0
  },
  total_test_cases: {
    type: Number,
    
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

SubmissionResultSchema.index({ user_id: 1, problem_id: 1 });

export const SubmissionModel  = mongoose.model(
  'SubmissionResult',
  SubmissionResultSchema
);

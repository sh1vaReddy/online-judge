import mongoose, { Schema } from "mongoose";

const SubmissionResultSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User',
    required: true,
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId, 
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
    type: Number,
    required: true,
  },
  memory_used: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'],
    required: true,
  },
  test_cases_passed: {
    type: Number,
    required: true,
  },
  total_test_cases: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const SubmissionModel  = mongoose.model(
  'SubmissionResult',
  SubmissionResultSchema
);

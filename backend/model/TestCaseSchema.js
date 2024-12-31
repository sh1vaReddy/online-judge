import mongoose, { Schema } from "mongoose";


const TestCaseSchema = new Schema({
  problem_id: {
    type: Number, 
    unique: true,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  expected_output: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


const TestcaseModel = mongoose.model("TestCase", TestCaseSchema);

export { TestcaseModel };

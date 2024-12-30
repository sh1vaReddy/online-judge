import mongoose, { Schema } from "mongoose";

const TestCaseSchema = new Schema({
  problem_id: {
    type: Number,
    required: true,
  },
  test_cases: [
    {
      input: {
        type: String,
        required: true,
      },
      expected_output: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const TestcaseModel = mongoose.model("TestCase", TestCaseSchema);

export { TestcaseModel };

import mongoose, { Schema } from "mongoose";
import AutoIncrement from "mongoose-sequence";

const AutoIncrementFactory = AutoIncrement(mongoose);

const ExampleSchema = new Schema({
  input: {
    type: String,
    required: [true, "Input is required for an example."],
  },
  output: {
    type: String,
    required: [true, "Output is required for an example."],
  },
});

const ProblemSchema = new Schema({
  problem_id: {
    type: Number,
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  constraints: {
    type: String,
    required: [true, "Constraints are required."],
  },
  examples: {
    type: [ExampleSchema],
    required: [true, "Examples are required."],
  },
  tags: {
    type: [String],
    required: [true, "Tags are required."],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: [true, "Difficulty is required."],
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

ProblemSchema.plugin(AutoIncrementFactory, { inc_field: "problem_id" });


ProblemSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

export const ProblemModel = mongoose.model("Problem", ProblemSchema);

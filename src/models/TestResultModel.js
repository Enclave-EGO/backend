import mongoose from "mongoose";
import { ObjectId } from "../constants/index.js";

const TestResultSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User"
    },
    testId: {
      type: ObjectId,
      required: true,
      ref: "Test"
    },
    score: {
      type: Number
    },
    isPass: {
      type: Boolean
    }
  },
  { timestamps: true }
);

const TestResultModel = mongoose.model("TestResult", TestResultSchema);

export default TestResultModel;

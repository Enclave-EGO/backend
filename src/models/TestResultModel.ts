import mongoose from "mongoose";
import { ObjectId } from "../types";

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
      type: Number,
      required: true,
      default: 0
    },
    isPass: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const TestResultModel = mongoose.model("TestResult", TestResultSchema);
export default TestResultModel;

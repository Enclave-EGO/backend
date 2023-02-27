import mongoose from "mongoose";
import { ObjectId } from "../constants";

const QuestionSchema = new mongoose.Schema(
  {
    testId: {
      type: ObjectId,
      required: true,
      ref: "Test"
    },
    content: {
      type: String,
      required: true
    },
    isMultiChoice: {
      type: Boolean,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const TestSchema = new mongoose.Schema(
  {
    lessonId: {
      type: ObjectId,
      required: true,
      ref: "Lesson"
    },
    timeLimit: {
      type: Number
    },
    score: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const TestModel = mongoose.model("Test", TestSchema);

export default TestModel;
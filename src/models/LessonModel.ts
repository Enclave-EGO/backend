import mongoose from "mongoose";
import { ObjectId } from "../types";

const LessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    videoId: {
      type: String,
      required: true
    },
    courseId: {
      type: ObjectId,
      required: true,
      ref: "Course"
    }
  },
  { timestamps: true }
);

const LessonModel = mongoose.model("Lesson", LessonSchema);
export default LessonModel;
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

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
      ref: "Course"
    }
  },
  { timestamps: true }
);

const LessonModel = mongoose.model("Lesson", LessonSchema);

export default LessonModel;

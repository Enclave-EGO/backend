import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cost: {
      type: Number
    },
    description: {
      type: String
    },
    thumbnail: {
      type: String
    },
    userId: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", CourseSchema);

export default CourseModel;
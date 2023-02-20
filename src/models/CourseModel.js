import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new mongoose.Schema(
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
<<<<<<< HEAD
      type: ObjectId,
=======
      type: String,
>>>>>>> e514d184d571f3dc420a3d3e1f5f04dc0b16658e
      ref: "User"
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;

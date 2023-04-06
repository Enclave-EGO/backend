import mongoose from "mongoose";
import { ObjectId } from "~/types";

const RegisterSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User"
    },
    courseId: {
      type: ObjectId,
      required: true,
      ref: "Course"
    }
  },
  { timestamps: true }
);

const RegisterModel = mongoose.model("Register", RegisterSchema);
export default RegisterModel;

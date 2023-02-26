import mongoose from "mongoose";
import { ObjectId } from "../constants";

const RegisterSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true
    },
    courseId: {
      type: ObjectId,
      required: true
    }
  },
  { timestamps: true }
);

const RegisterModel = mongoose.model("Register", RegisterSchema);

export default RegisterModel;

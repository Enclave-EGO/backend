import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

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

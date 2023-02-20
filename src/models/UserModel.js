import mongoose from "mongoose";
import { Role } from "../utils/index.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    max: 100,
    required: true
  },
  password: {
    type: String,
    max: 200,
    required: true
  },
  name: {
    type: String,
    max: 200,
    required: true
  },
  email: {
    type: String,
    max: 200,
    required: true
  },
  role: {
    type: Number,
    enum: Role,
    default: Role.LEARNER,
    required: true
  },
  avatar: {
    type: String,
    max: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

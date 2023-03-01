import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI;
const LOCALHOST_URL = `http://localhost:${PORT}`;
const SWAGGER_URL = `${LOCALHOST_URL}/api-docs/`;
const EXPIRES_IN = process.env.EXPIRES_IN;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ObjectId = mongoose.Types.ObjectId;

export {
  PORT,
  MONGO_URI,
  LOCALHOST_URL,
  SWAGGER_URL,
  EXPIRES_IN,
  JWT_SECRET_KEY,
  ObjectId
};

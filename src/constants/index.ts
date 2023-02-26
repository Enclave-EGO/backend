import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4001;
export const MONGO_URI = process.env.MONGO_URI;
export const LOCALHOST_URL = `http://localhost:${PORT}`;
export const SWAGGER_URL = `${LOCALHOST_URL}/api-docs/`;
export const EXPIRES_IN = process.env.EXPIRES_IN;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const ObjectId = mongoose.Types.ObjectId;

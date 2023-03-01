import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const ObjectId = mongoose.Types.ObjectId;
export const PORT = process.env.PORT || 4001;
export const MONGO_URI = process.env.MONGO_URI;
export const EXPIRES_IN = process.env.EXPIRES_IN;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const LOCALHOST_URL = `http://localhost:${PORT}/`;
export const SWAGGER_URL = `http://localhost:${PORT}/api-docs/`;

export const DEFAULT_USER_AVATAR =
  "https://res.cloudinary.com/dtpti4fdq/image/upload/v1677661649/default-avatar_urcr1t.jpg";
export const DEFAULT_COURSE_THUMBNAIL =
  "https://res.cloudinary.com/dtpti4fdq/image/upload/v1677661649/default-course-thumbnail_livmtf.png";

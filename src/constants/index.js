import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4001;

export { PORT, MONGO_URL };

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4001;
const LOCALHOST_URL = `http://localhost:${PORT}`;
const SWAGGER_URL = `${LOCALHOST_URL}/api-docs/`;

export { PORT, MONGO_URI, LOCALHOST_URL, SWAGGER_URL };

import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4001;
const LOCALHOST_URL = `http://localhost:${PORT}`;
const SWAGGER_URL = `${LOCALHOST_URL}/api-docs/`;

export { PORT, MONGO_URL, LOCALHOST_URL, SWAGGER_URL };

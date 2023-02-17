import mongoose from "mongoose";
import { MONGO_URI } from "../../constants/index.js";

const connectDatabase = () => {
	mongoose
		.set("strictQuery", false)
		.connect(MONGO_URI)
		.then(() => {
			console.log("Connected to DB");
		})
		.catch((err) => {
			console.log("err", err);
		});
};

export default connectDatabase;

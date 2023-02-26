import mongoose from "mongoose";
import { MONGO_URI } from "../../constants";

const connectDatabase = () => {
  mongoose
    .set("strictQuery", false)
    .connect(String(MONGO_URI))
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Connect to database failed", error);
    });
};

export default connectDatabase;

import mongoose from "mongoose";
import { MONGO_URI } from "../../constants/index.js";

const connectDatabase = async () => {
  mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connect to database success");
      return true;
    })
    .catch((error) => {
      console.log("Connect to database fail", error);
      return false;
    });
};

export default connectDatabase;

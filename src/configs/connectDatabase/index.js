import mongoose from "mongoose";
import { MONGO_URI } from "../../constants/index.js";

const connectDatabase = (server) => {
  mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connect to database success");

      // Stop server to pass CI step
      server.close();
    })
    .catch((error) => {
      console.log("Connect to database fail", error);
    });
};

export default connectDatabase;

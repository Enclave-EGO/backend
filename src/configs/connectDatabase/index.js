import mongoose from "mongoose";
import { MONGO_URI } from "../../constants/index.js";
import kill from "kill-port";

const connectDatabase = () => {
  mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connect to database success");

      kill(4001, "tcp").then(console.log).catch(console.log);
    })
    .catch((error) => {
      console.log("Connect to database fail", error);
    });
};

export default connectDatabase;

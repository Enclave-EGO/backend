import mongoose from "mongoose";
import { MONGO_URL } from "../../constants/index.js";

const connectDatabase = (app) => {
    mongoose
    .set("strictQuery", false)
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) =>{
        console.log('err', err);
    });
};

export default connectDatabase;

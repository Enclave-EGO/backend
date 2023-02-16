import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = (app) => {
    mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) =>{
        console.log('err', err);
    });
};

export default connectDatabase;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = (app) => {
    mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT||4000, () => {
            console.log(`Server is listening at http://localhost:${process.env.PORT}/`);
	        console.log(`API Documentation: http://localhost:${process.env.PORT}/api-docs/`);
        })
    })
    .catch((err) =>{
        console.log('err', err);
    });
};

export default connectDatabase;

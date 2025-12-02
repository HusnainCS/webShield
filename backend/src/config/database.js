import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
      console.log("Connecting to the Database .......");
      await mongoose.connect(process.env.DB_URL);
 console.log("Database is connected a successfully")
    } catch (error) {
        console.error("The error of connecting database is",error);
     };
};
export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const DB_LINK=process.env.DB_LINK;
export const  connectDB =async () =>{
    await mongoose.connect(DB_LINK);
    console.log("db connected");
}

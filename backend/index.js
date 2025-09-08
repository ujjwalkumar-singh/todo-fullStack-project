import express from 'express';
import dotenv from 'dotenv'
import todoRoute from './routes/todoRoute.js'
import user from './routes/userRoute.js'
import { connectDB } from './DB/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
dotenv.config();
const port=Number(process.env.PORT)||3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.get("/",(req,res)=>{
  res.send("hellow world");
})
connectDB()
app.use("/todo",todoRoute); 
app.use("/user",user);
console.log(port);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});

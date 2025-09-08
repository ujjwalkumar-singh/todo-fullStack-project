import jwt from "jsonwebtoken"
import { user_model } from "../model/user.model.js";
export const authMiddleware= async (req,res,next)=>{
   console.log("authMiddleware function called 1");
   try {
      const token=req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
      console.log(token);
      
      if(!token){
         return res.status(401).json({message:"token missing or not found "})
      }
      const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
       if(!decodedToken){
         return res.status(401).json({message:"token missing or expired"})
      }
      console.log(decodedToken.id);
      const user=await user_model.findById(decodedToken.id).select("-password");
      if(!user){
         return res.status(401).json({message:"user not found"})
      }
      console.log(user);
      req.user=user;
      next();
     
   } catch (error) {
      return res.status(401).json({message:"error in the auth midddleware"})
   }
}
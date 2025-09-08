import { user_model } from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
export const createUser = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
         return res.status(400).json({ message: "All field are required" });
      }

      const exisingUser=await user_model.findOne({email});
      if(exisingUser){
         return res.status(409).json({message:"user already exist"})
      }
      const hashedPassword=await bcrypt.hash(password,10);
      // const newUser=await todo_model.create({username,email,password});
      const newUser = new user_model({
         username, email, password:hashedPassword
      })
      const saved = await newUser.save();
      res.status(201).json({ message: "user created successfuly", saved })
   } catch (error) {
      if (error.code === 11000) {
         res.status(400).json({ message: "user already exist" })
      }
      else
         res.status(400).json({ message: "something went wrong while registering", error:error.message })
   }
}

export const loginUser = async (req, res) => {
   const {email,password}=req.body;
   if(!email || !password){
      return res.status(401).json({message:"Password and email both are required."})
   }
   const user=await user_model.findOne({email});
   if(!user){
      return res.status(401).json({message:"Unorthorised Access, - Signup First"})
   }
   //  console.log( user.password);
    
   const check= await bcrypt.compare(password, user.password);   
   if(!check){
      return res.status(401).json({message:"Wrong Password, Try Again"})
   }
   
   const token=jwt.sign({
      id:user._id
   },
   process.env.JWT_SECRET,
   {
      expiresIn:"10d"
   })

   res.cookie("token",token, {
    httpOnly: true,   // prevents JS access (protects from XSS)
    secure: false,     // send only over HTTPS
    sameSite: "lax" // helps prevent CSRF
  }).json({message:"login successfuly",token});
}

export const logoutUser = (req, res) => {
   try {
      // const token = req.cookies.token;
      const token = req.cookies?.token; //|| req.headers["authorization"]?.split(" ")[1];
      console.log("token",token);
      
      if(!token){
        return res.status(401).json({message:"token not found for logout in logout function"})
      }
      res.clearCookie("token",{
    httpOnly: true,   // prevents JS access (protects from XSS)
   //  secure: true,     // send only over HTTPS
    sameSite: "lax" // helps prevent CSRF
  }).json({message:"loggedOut successfuly"})
   } catch (error) {
       return res.status(500).json({message:"error while doing logout",error})
   }
}
export const getInfo = async (req, res) => {
   try {
      // const token = req.cookies.token;
      const token = req.cookies?.token; //|| req.headers["authorization"]?.split(" ")[1];
      console.log("hii ujjwal token",token);
      
      if(!token){
        return res.status(401).json({message:"token not found"})
      }

      const verifyToken= jwt.verify(token, process.env.JWT_SECRET);
      if(!verifyToken){
         return res.status(401).json({message:"unauthorised access"})
      }
      console.log(verifyToken);

      const user= await user_model.findById(verifyToken.id).select("-password");
      if(!user){
         return res.status(401).json({message:"user not found"})
      }
      return  res.status(200).json({message:"user fetched successfuly",user})
      
      
   } catch (error) {
       return res.status(500).json({message:"error while doing logout",error})
   }
}

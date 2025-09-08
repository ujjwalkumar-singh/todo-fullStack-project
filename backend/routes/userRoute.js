import express from 'express';
 import { createUser,loginUser,logoutUser ,getInfo} from '../controller/user.controller.js'
 
 const router = express.Router();
    router.post("/register",createUser);
    router.post("/login",loginUser);
    router.post("/logout",logoutUser);
    router.get("/profile",getInfo);
export default router;
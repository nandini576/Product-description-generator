import express from "express";
import passport from "passport";
import User from "../models/User.js";
import {register,login,googleSuccess,googleFailure} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authLimiter from "../middlewares/authLimiter.js";
import {registerValidation,loginValidation} from "../middlewares/validateAuth.js";
const router = express.Router();
router.post("/register",authLimiter,registerValidation,register);
router.post("/login",authLimiter,loginValidation,login);
router.get("/google",passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback",passport.authenticate("google", {session: false,failureRedirect: "/api/auth/google/failure"}),googleSuccess);
router.get("/google/failure",googleFailure);
router.get("/profile",authMiddleware,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({success:true,user});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});
export default router;
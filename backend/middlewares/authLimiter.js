import rateLimit from "express-rate-limit";
const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many attempts. Try again after 15 minutes."
    }
});
export default authLimiter;
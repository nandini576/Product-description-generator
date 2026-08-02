import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generateRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import passport from "./config/passport.js";
const app = express();
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true
    })
);
app.use(express.json());
// Passport OAuth initialization
app.use(passport.initialize());
app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Backend is running successfully"
    });
});
app.use("/api/generate",generateRoutes);
app.use("/api/history",historyRoutes);
app.use("/api/auth",authRoutes);
app.use(errorHandler);
export default app;
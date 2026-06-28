import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generateRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully"
    });
});
app.use("/api/generate", generateRoutes);
app.use("/api/history", historyRoutes);
app.use(errorHandler);
export default app;
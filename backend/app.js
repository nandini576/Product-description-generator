import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generateRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/generate", generateRoutes);
app.use("/api/history", historyRoutes);
// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully 🚀"
    });
});

// Error Middleware (Always Last)
app.use(errorHandler);
export default app;
import express from "express";
import {generateDescription} from "../controllers/generateController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router=express.Router();
router.post("/",authMiddleware,generateDescription);
export default router;
import express from "express";
import {generateDescription} from "../controllers/generateController.js";
const router=express.Router();
router.post("/",generateDescription);
export default router;
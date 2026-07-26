import express from "express";
import {createHistory,getAllHistory,getHistoryById,updateHistory,deleteHistory,searchHistory} from "../controllers/historyController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();
router.get("/",authMiddleware, getAllHistory);
router.get("/search",authMiddleware, searchHistory);
router.get("/:id",authMiddleware, getHistoryById);
router.post("/",authMiddleware, createHistory);
router.put("/:id",authMiddleware, updateHistory);
router.delete("/:id", authMiddleware,deleteHistory);
export default router;
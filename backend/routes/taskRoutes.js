import express from "express";
import { createTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new task
router.post("/", protect, createTask);

export default router;

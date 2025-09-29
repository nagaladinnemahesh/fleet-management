import express from "express";
import { assignDriverVehicle } from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admins can assign drivers and vehicles
router.post("/assign", protect, authorize("admin"), assignDriverVehicle);

export default router;

import express from "express";
import { addVehicle, getVehicles } from "../controllers/vehicleController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin adds vehicle
router.post("/", protect, authorize(["admin"]), addVehicle);

// Admin views all vehicles
router.get("/", protect, authorize(["admin"]), getVehicles);

export default router;

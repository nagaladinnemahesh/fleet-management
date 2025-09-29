import express from "express";
import { createShipment, getShipments, assignShipment, getMyShipments } from "../controllers/shipmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client creates shipment request
router.post("/", protect, authorize(["client"]), createShipment);

// Admin views all shipments
router.get("/", protect, authorize(["admin"]), getShipments);

// Admin assigns shipment
router.put("/:id/assign", protect, authorize(["admin"]), assignShipment);

// Client views their shipments
router.get("/my", protect, authorize(["client"]), getMyShipments);

export default router;

import express from 'express';
import {createShipment, getShipments, assignShipment, getMyShipments} from '../controllers/shipmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// client creates shipment request
router.post("/", authMiddleware(['client']), createShipment);

// admin views all shipments
router.get("/", authMiddleware(['admin']), getShipments);

// admin assigns shipment to driver and vehicle
router.put("/:id/assign", authMiddleware(['admin']), assignShipment);

// client views their shipments
router.get("/my", authMiddleware(['client']), getMyShipments);

export default router;
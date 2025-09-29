import Shipment from "../models/Shipment.js";
import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";

// Client creates shipment
export const createShipment = async (req, res) => {
  const { shipmentType, pickupLocation, deliveryLocation, weight, priority } = req.body;

  try {
    const shipment = await Shipment.create({
      client: req.user._id,
      shipmentType,
      pickupLocation,
      deliveryLocation,
      weight,
      priority
    });
    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin gets all shipments
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate("client assignedDriver assignedVehicle");
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin assigns shipment
export const assignShipment = async (req, res) => {
  const { id } = req.params;
  const { driverId, vehicleId, deliveryDate } = req.body;

  try {
    const shipment = await Shipment.findById(id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    const driver = await User.findById(driverId);
    const vehicle = await Vehicle.findById(vehicleId);

    if (!driver || driver.role !== "driver") {
      return res.status(400).json({ message: "Invalid driver" });
    }
    if (!vehicle || vehicle.status !== "available") {
      return res.status(400).json({ message: "Invalid or unavailable vehicle" });
    }

    shipment.assignedDriver = driverId;
    shipment.assignedVehicle = vehicleId;
    shipment.deliveryDate = deliveryDate;
    shipment.status = "assigned";
    await shipment.save();

    vehicle.status = "assigned";
    await vehicle.save();

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Client views their shipments
export const getMyShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ client: req.user._id }).populate("assignedDriver assignedVehicle");
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

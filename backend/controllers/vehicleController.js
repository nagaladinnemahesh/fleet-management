import Vehicle from "../models/Vehicle.js";

// Admin adds vehicle
export const addVehicle = async (req, res) => {
  const { plateNumber, type, capacity } = req.body;

  try {
    const vehicleExists = await Vehicle.findOne({ plateNumber });
    if (vehicleExists) return res.status(400).json({ message: "Vehicle already exists" });

    const vehicle = await Vehicle.create({ plateNumber, type, capacity });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin gets all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

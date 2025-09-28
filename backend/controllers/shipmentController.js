import Shipment from '../models/Shipment.js';

export const createShipment = async (req, res) => {
    try {
        const {shipmentType, weight, priority, pickupLocation, deliveryLocation} = req.body;

        const shipment = await Shipment.create({
            clientId: req.user.id, // logged in client
            shipmentType,
            weight,
            priority,
            pickupLocation,
            deliveryLocation
        });

        res.status(201).json({message: "Shipment request created", shipment});
    } catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

export const getShipments = async(req, res) => {
    try {
        const shipments = await Shipment.find()
            .populate('clientId', 'name email')
            .populate('driverId', 'name')
            .populate('vehicleId', 'vehicleNo type');

        res.json(shipments);
    } catch(error){
        res.status(500).json({message: "Server error", error})
    }
};

export const assignShipment = async(req, res) => {
    try {
        const {driverId, vehicleId, expectedDelivery} = req.body;

        const shipment = await Shipment.findByIdAndUpdate(
            req.params.id,
            {driverId, vehicleId, expectedDelivery, status: "assigned"},
            {new: true}
        );

        if (!shipment) return res.status(404).json({message: "Shipment not found"});

        res.json({message: "Shipement assigned successfully", shipment});
    } catch (error){
        res.status(500).json({message: "Server error", error});
    }
};

export const getMyShipments = async(req, res) => {
    try {
        const shipments = await Shipment.find({clientId: req.user.id})
            .populate('driverId', 'name')
            .populate('vehicleId', 'vehicleNo type');
        
        res.json(shipments);
    } catch (error){
        res.status(500).json({message: "Server error", error});
    }
};


import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // requesting user
    shipmentType: {type: String, required: true},
    weight: {type: Number, required: true},
    priority: {type: String, enum: ["low","medium","high"], default: "low"},
    pickupLocation: {type: String, required: true},
    deliveryLocation : {type: String, required: true},
    status: {
        type: String,
        enum: ["pending", "assigned", "in-progress", "delivered"],
        default: "pending"
    },
    assignedDriver: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    assignedVehicle: {type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"},
    expectedDelivery: {type: Date}
    }, {timestamps: true});

const Shipment = mongoose.model("Shipment", shipmentSchema)

export default Shipment;
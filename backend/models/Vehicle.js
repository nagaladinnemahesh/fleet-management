import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["available", "assigned"], default: "available" }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;

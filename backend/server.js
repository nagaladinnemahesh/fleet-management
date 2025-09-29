import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";



import authRoutes from "./routes/authRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js"

dotenv.config();
connectDB();

const app = express();

//middleware 
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
// app.use("/api/tasks", taskRoutes);
app.use("/api/vehicless", vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


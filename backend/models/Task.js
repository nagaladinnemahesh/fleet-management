import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    priority: {type: String, enum: ["low", "medium", "high"], default: "low"},
    status: {type: String, enum: ["pending", "in-progress", "completed"], default: "pending"},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);
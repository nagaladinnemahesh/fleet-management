import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const {title, description, priority, assignedTo} = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            assignedTo,
            createdBy: req.user.id // logged in user
        });

        const savedTask = await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task: savedTask,
        });
    } catch (error){
        res.status(500).json({message: "Error creating task", error: error.message});
    }
};
const Task = require('../models/Task');


const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTaskById = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
};

const createTask = async (req, res) => {
    try {
        const { title, description , status } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const task = await Task.create({
            title,
            description,
            status
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateTask = async (req, res) => {
    try{const taskId = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!taskId) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(taskId);} catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


const deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
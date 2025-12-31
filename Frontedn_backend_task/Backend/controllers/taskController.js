const Task = require("../models/Task");


// CREATE
exports.createTask = async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        status: "Pending",
        userId: req.user.id,
    });
    res.json(task);
};

// READ
exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
};

// UPDATE (toggle status)
exports.updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = task.status === "Pending" ? "Completed" : "Pending";
    await task.save();

    res.json(task);
};

// DELETE
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
};



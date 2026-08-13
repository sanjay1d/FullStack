const getTasks = (req, res) => {
    res.send('Getting all tasks');
};

const getTaskById = (req, res) => {
    const taskId = req.params.id;
    res.send(`Task Id${taskId}`);
};

const createTask = (req, res) => {
    const { title, description } = req.body;

    res.status(201).json({
        message: 'Task created successfully',
        task: {
            title,
            description
        }
    })
}

module.exports = {
    getTasks,
    getTaskById,
    createTask
};
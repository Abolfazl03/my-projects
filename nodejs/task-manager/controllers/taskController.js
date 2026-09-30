const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


const allTasks = async (req, res) => {
  try{
    const tasks = await Task.find({
    user: req.params.id,
  });
  res.status(201).json({
    data:{
      tasks
    }
  })
  } catch (err) {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}
}

const oneTask = async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);

  res.status(201).json({
    data:
    task,
  });
  } catch (err) {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}
}

const deleteTask = async (req, res) => {
  try{
    const task = Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    data: 'deleted'
  });
  } catch (err) {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}
}

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
}


module.exports = {
  createTask,
  allTasks,
  oneTask,
  deleteTask,
  updateTask,
};
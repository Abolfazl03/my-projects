const Task = require('../models/taskModel');
const appError = require('../utils/errorHandling')

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      // user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error)
  }
};


const allTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      data: {
        tasks
      }
    });
  } catch (err) {
    next(err)
  }
};

const oneTask = async (req, res, next) => {
  try{
    const task = await Task.findById(req.params.id);
    if (!task) {
      next(new appError('task not found', 404))
}

  res.status(200).json({
    data:
    task,
  });
  } catch (err) {
    next(err)
}
}

const deleteTask = async (req, res, next) => {
  try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
  return res.status(404).json({
    status: 'fail',
    message: 'Task not found'
  });
}

  res.status(200).json({
    data: 'deleted'
  });
  } catch (err) {
  next(err)
}
}

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
  return res.status(404).json({
    status: 'fail',
    message: 'Task not found'
  });
}
  res.status(200).json({
    data:{
      task
    }
  })
  } catch (err) {
  next(err)
}
}


module.exports = {
  createTask,
  allTasks,
  oneTask,
  deleteTask,
  updateTask,
};
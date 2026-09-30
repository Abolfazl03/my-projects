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

    res.status(201).json({
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


const findTasks = async (req, res) => {
  try{
    const tasks = await Task.find({
    user: req.params.id,
  });
  res.status(201).json({
    data:{
      tasks
    }
  })
  } catch (err){
    console.log(err)
  }
}

const findTask = async (req, res) => {
  try{
    const task = Task.find({
    user: req.params.id,
    title,
  });

  res.status(201).json({
    data:
    task,
  });
  } catch (err){
    console.log(err)
  }
}

const deleteTask = async (req, res) => {
  try{
    const task = Task.deleteOne({
    user: req.params.id,
    title,
  });

  res.status(201).json({
    data: 'deleted'
  });
  } catch (err){
    console.log(err)
  }
}


module.exports = {
  createTask,
  findTasks,
  findTask,
  deleteTask,
};
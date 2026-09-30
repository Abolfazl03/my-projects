const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();


router.route('api/v1/task')
.get(taskController.findTasks)

router.route('api/v1/task/:id')
.get(taskController.findTask)
.delete(taskController.deleteTask)


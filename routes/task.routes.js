const express = require('express');
const { taskExists } = require('../middlewares/task.middlewares');
const {
  createTask,
  getTaks,
  getTaksByStatus,
  deleteTask,
  updateTaks,
} = require('../controllers/task.controllers');
const {validatorString, patchUsersValidation} = require('../models/validations') 

const taskRoutes = express.Router();

taskRoutes.post('/' , createTask);

taskRoutes.get('/', getTaks);

taskRoutes.get('/:status',validatorString,  getTaksByStatus);

taskRoutes.patch('/:id', taskExists,patchUsersValidation, updateTaks);

taskRoutes.delete('/:id', taskExists, deleteTask);

module.exports = {
  taskRoutes,
};

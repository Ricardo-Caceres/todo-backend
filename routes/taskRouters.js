// create task routes in routes/taskRouters.js
import express from 'express';
import {
	getTask,
	createTask,
	updateTask,
	deleteTask,
	updateTaskStatus,
} from '../controllers/taskController.js';
import checkAuth from '../middleware/checkAuth.js';

const taskRoutes = express.Router();

taskRoutes.post('/', checkAuth, createTask);
taskRoutes
	.route('/:id')
	.get(checkAuth, getTask)
	.put(checkAuth, updateTask)
	.delete(checkAuth, deleteTask);

taskRoutes.post('/status/:id', checkAuth, updateTaskStatus);

export default taskRoutes;

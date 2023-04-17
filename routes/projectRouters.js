import express from 'express';
import {
	getProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
	addCollaborator,
	deleteCollaborator,
	getTasksByProject,
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const projectRoutes = express.Router();

projectRoutes
	.route('/')
	.get(checkAuth, getProjects)
	.post(checkAuth, createProject);

projectRoutes
	.route('/:id')
	.get(checkAuth, getProjectById)
	.put(checkAuth, updateProject)
	.delete(checkAuth, deleteProject);

projectRoutes.route('/collaborators/:id').post(checkAuth, addCollaborator);

projectRoutes.route('/collaborators/:id').delete(checkAuth, deleteCollaborator);

projectRoutes.route('/task/:id').get(checkAuth, getTasksByProject);

export default projectRoutes;

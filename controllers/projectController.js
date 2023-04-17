// create a full controller for the ProjectModel:

import ProjectModel from '../models/ProjectModel.js';
import TaskModel from '../models/TaskModel.js';

// @desc    Get all projects for a user (creator)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
	try {
		const projects = await ProjectModel.find({ creator: req.user._id });

		res.json(projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
	try {
		const project = await ProjectModel.findById(req.params.id);
		// check if the project exists
		if (!project) {
			res.status(404);
			throw new Error('Project not found');
		}
		// check if the project belongs to the user
		if (project.creator.toString() !== req.user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized');
		}
		const tasks = await TaskModel.find().where('project').equals(project._id);

		res.status(200).json({ project, tasks });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
	try {
		const { name, description, client, collaborators, doneDate } = req.body;
		const project = new ProjectModel({
			name,
			description,
			client,
			creator: req.user._id,
			collaborators,
			doneDate,
		});
		const createdProject = await project.save();
		res.status(201).json(createdProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
	try {
		const project = await ProjectModel.findById(req.params.id);
		// check if the project exists
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
			// exit the function to prevent further execution
		}
		// check if the project belongs to the user
		if (project.creator.toString() !== req.user._id.toString()) {
			return res.status(401).json({ message: 'Not authorized' });
			// exit the function to prevent further execution
		}

		const { name, description, client, collaborators, doneDate } = req.body;

		project.name = name || project.name; // update the name field with either the new value or keep the old one
		project.description = description || project.description; // same as above
		project.client = client || project.client; // same as above
		project.collaborators = collaborators || project.collaborators; // same as above
		project.doneDate = doneDate || project.doneDate; // same as above

		const updatedProject = await project.save(); // save the updated data in db

		res.json(updatedProject); // send back response with updated data
	} catch (error) {
		// handle errors
		console.error(error); // log errors in console for debugging purposes
		res.status(500).json({ message: 'Server Error' }); // send back 500 status code and a message indicating server error
	} // end of try-catch block
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
	try {
		const project = await ProjectModel.findById(req.params.id);
		// check if the project exists
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
			// exit the function to prevent further execution
		}
		// check if the project belongs to the user
		if (project.creator.toString() !== req.user._id.toString()) {
			return res.status(401).json({ message: 'Not authorized' });
			// exit the function to prevent further execution
		}
		await project.remove();
		res.json({ message: 'Project removed' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Create add collaborator
// @route   POST /api/projects/:id/collaborators
// @access  Private
const addCollaborator = async (req, res) => {
	try {
		const { collaborator } = req.body;
		const project = await ProjectModel.findById(req.params.id);
		if (project) {
			project.collaborators.push(collaborator);
			const updatedProject = await project.save();
			res.json(updatedProject);
		} else {
			res.status(404);
			throw new Error('Project not found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Delete a collaborator
// @route   DELETE /api/projects/:id/collaborators/:collaboratorId
// @access  Private
const deleteCollaborator = async (req, res) => {
	try {
		const project = await ProjectModel.findById(req.params.id);
		if (project) {
			project.collaborators = project.collaborators.filter(
				(collaborator) =>
					collaborator._id.toString() !== req.params.collaboratorId
			);
			const updatedProject = await project.save();
			res.json(updatedProject);
		} else {
			res.status(404);
			throw new Error('Project not found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Get tasks by project
// @route   GET /api/projects/:id/tasks
// @access  Private
const getTasksByProject = async (req, res) => {
	try {
		const project = await ProjectModel.findById(req.params.id);
		if (project) {
			res.json(project.tasks);
		} else {
			res.status(404);
			throw new Error('Project not found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export {
	getProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
	addCollaborator,
	deleteCollaborator,
	getTasksByProject,
};

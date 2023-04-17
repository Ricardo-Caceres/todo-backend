// create task controller in controllers/taskController.js
import TaskModel from '../models/TaskModel.js';
import ProjectModel from '../models/ProjectModel.js';

// @desc    Get all tasks for a project
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await TaskModel.findById(id).populate('project');

		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}

		if (task.project.creator.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'Not authorized to view tasks for this project' });
		}

		res.status(200).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error in Get Task Controller' });
	}
};

// @desc    Create a task
// @route   POST /api/tasks/project/:id
// @access  Private
const createTask = async (req, res) => {
	try {
		const { project } = req.body;
		const existingProject = await ProjectModel.findById(project);

		if (!existingProject) {
			return res.status(404).json({ error: 'Project not found' });
		}

		if (existingProject.creator.toString() !== req.user._id.toString()) {
			return res
				.status(401)
				.json({ error: 'Not authorized to create a task for this project' });
		}

		const task = await TaskModel.create(req.body);

		res.status(201).json({ task });
	} catch (error) {
		console.error(err);
		res.status(500).json({ error: 'Server Error in Task Controller' });
	}
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await TaskModel.findById(id).populate('project');
		console.log(task);
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}

		if (task.project.creator.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'Not authorized to update tasks for this project' });
		}

		// Task is an object that contains a list of properties that can be updated.
		// The properties are defined by the user.
		// This for loop iterates through each property and updates the task object with the new value.
		for (let prop in req.body) {
			task[prop] = req.body[prop];
		}

		const updatedTask = await task.save();
		return res.status(200).json(updatedTask);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: 'Server Error in Update Task Controller' });
	}
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
	// delete a task
	try {
		const { id } = req.params;
		const task = await TaskModel.findById(id).populate('project');
		console.log(task);
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}

		if (task.project.creator.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'Not authorized to Delete tasks for this project' });
		}

		await task.deleteOne();
		res.status(200).json({ message: 'Task deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error in Delete Task Controller' });
	}
};

// @desc    Update a task status
// @route   PUT /api/tasks/:id
// @access  Private
const updateTaskStatus = async (req, res) => {};

export { getTask, createTask, updateTask, deleteTask, updateTaskStatus };

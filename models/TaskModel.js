// crate task model of mongoose schema:
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: Boolean,
			default: false,
		},
		doneDate: {
			type: Date,
			default: Date.now(),
		},
		priority: {
			type: String,
			required: true,
			enum: ['low', 'medium', 'high'],
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserModel',
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model('Task', taskSchema);

export default Task;

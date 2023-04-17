// create ProjectModel Model of mongoose Schema:
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
		doneDate: {
			type: Date,
			default: Date.now(),
		},
		client: {
			type: String,
			required: true,
			trim: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserModel',
		},
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'UserModel',
			},
		],
		created: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		timestamps: true,
	}
);

const Project = mongoose.model('Project', projectSchema);

export default Project;

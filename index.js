import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './config/dbconnection.js';
import userRouters from './routes/userRouters.js';
import projectRouters from './routes/projectRouters.js';
import taskRoutes from './routes/taskRouters.js';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

dbConnection();

// CORS:
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
	origin: (origin, callback) => {
		const exists = whiteList.some((domain) => domain === origin);
		if (exists) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

if (process.env.NODE_ENV === 'development') {
	app.use(cors(corsOptions));
} else {
	app.use(cors());
}

// Routing:
app.use('/api/users', userRouters);
app.use('/api/projects', projectRouters);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

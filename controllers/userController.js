import createId from '../helpers/createId.js';
import UserModel from '../models/UserModel.js';
import generateJWT from '../helpers/generateJWT.js';

// add async to the function to use await in the function:
// const getUsers = async (req, res) => {
//   try {
//     // find all users in the database:
//     const users = await UserModel.find();
//     // send the users to the client:
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

const createUser = async (req, res) => {
	const { email } = req.body;
	// avoid duplicate users:
	const userAlreadyExists = await UserModel.findOne({ email });
	if (userAlreadyExists) {
		const error = new Error('User already exists');
		return res.status(400).json({ message: error.message });
	}
	try {
		const { username, email, password, confirm, role, date } = req.body;
		const token = createId();
		const user = new UserModel({
			username,
			email,
			password,
			token,
			confirm,
			role,
			date,
		});
		// save the user in the database:
		await user.save();
		// send the user to the client:
		res.json({ message: 'User created successfully' });
	} catch (error) {
		console.log(error);
	}
};

// create loginUser function:
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	// find the user in the database:
	const user = await UserModel.findOne({ email });
	// if the user does not exist:
	if (!user) {
		res.status(404).json({ message: 'User does not exist' });
		throw new Error('User does not exist');
	}
	// if the user are not confirmed:
	if (!user.confirm) {
		res.status(403).json({ message: 'User not confirmed' });
		throw new Error('User not confirmed');
	}
	// if the password is not correct:
	const isPasswordCorrect = await user.checkPassword(password);
	if (!isPasswordCorrect) {
		res.status(403).json({ message: 'Password is not correct' });
		throw new Error('Password is not correct');
	}
	// if the user exists and the password is correct send the user to the client without sensible data:
	res.json({
		_id: user._id,
		username: user.username,
		email: user.email,
		token: generateJWT(user._id),
		confirm: user.confirm,
		role: user.role,
		date: user.date,
	});
};

// create confirmUser function:
const confirmUser = async (req, res) => {
	const { token } = req.params;
	// find the user in the database:
	const userConfirm = await UserModel.findOne({ token });
	// if the user does not exist:
	if (!userConfirm) {
		res.status(404).json({ message: 'Token not valid' });
		throw new Error('User does not exist');
	}
	// confirm the user:
	try {
		userConfirm.confirm = true;
		userConfirm.token = '';
		await userConfirm.save();
		res.json({ message: 'User confirmed' });
	} catch (error) {
		console.log(error);
	}
};

// create resetPassword function:
const resetPassword = async (req, res) => {
	const { email } = req.body;
	// find the user in the database:
	const user = await UserModel.findOne({ email });
	// if the user does not exist:
	if (!user) {
		res.status(404).json({ message: 'User does not exist' });
		throw new Error('User does not exist');
	}
	// if the user exists:
	try {
		const token = createId();
		user.token = token;
		await user.save();
		res.json({ message: 'Email send it' });
	} catch (error) {
		console.log(error);
	}
};

// create checkToken function:
const checkToken = async (req, res) => {
	const { token } = req.params;
	// find the user in the database:
	const tokenValit = await UserModel.findOne({ token });
	// if the token is valid:
	if (tokenValit) {
		res.json({ message: 'Token is valid' });
	}
	// if the token is not valid:
	else {
		res.status(404).json({ message: 'Token not valid' });
		throw new Error('Token not valid');
	}
};

// create newPassword function:
const newPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;
	// find the user in the database:
	const checkPassword = await UserModel.findOne({ token });
	// if the token is not valid:
	if (!checkPassword) {
		res.status(404).json({ message: 'Token not valid' });
		throw new Error('Token not valid');
	}
	// if the token is valid:
	try {
		checkPassword.password = password;
		checkPassword.token = '';
		await checkPassword.save();
		res.json({ message: 'Password changed' });
	} catch (error) {
		console.log(error);
	}
};

// add account function:
const account = async (req, res) => {
	const { user } = req;

	res.json({
		_id: user._id,
		username: user.username,
		email: user.email,
		role: user.role,
		date: user.date,
	});
};

export {
	createUser,
	loginUser,
	confirmUser,
	resetPassword,
	checkToken,
	newPassword,
	account,
};

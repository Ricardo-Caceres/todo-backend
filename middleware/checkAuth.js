import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

// create checkAuth middleware usin JWT and bearer token:

const checkAuth = async (req, res, next) => {
	// get the token from the headers:
	let token;

	try {
		token = req.headers.authorization.split(' ')[1];
		// verify the token:
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await UserModel.findById(decoded.id).select(
			'-password -token -confirm -date -__v -createdAt -updatedAt'
		); // remove password, token, confirm, role, date, __v, _id and id from the user object

		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Not authorized, token failed' });
	}

	// if the token is not sent:
	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}
};

export default checkAuth;

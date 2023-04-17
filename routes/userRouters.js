import express from 'express';
import {
	createUser,
	loginUser,
	confirmUser,
	resetPassword,
	checkToken,
	newPassword,
	account,
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// router.get("/", getUsers);

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/confirm/:token', confirmUser);
router.post('/reset-password', resetPassword);
router.route('/reset-password/:token').get(checkToken).post(newPassword);

router.get('/account', checkAuth, account);

// router.put("/:id", updateUser);

// router.delete("/:id", deleteUser);

export default router;

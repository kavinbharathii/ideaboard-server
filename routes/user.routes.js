
import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/guards/all', userController.getAllAttendance);
router.get('/guards/:userid', userController.getUserAttendance);

export default router;

import express from 'express';
import * as taskController from '../controllers/taskControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.get('/get-all', authenticateToken, taskController.getAllTasks);
router.post('/complete', authenticateToken, taskController.completeTask);

export default router;
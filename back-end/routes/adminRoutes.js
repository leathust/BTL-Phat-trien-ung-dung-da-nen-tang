import * as adminController from '../controllers/adminControllers.js';
import express from 'express';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';
import { adminMiddleware } from '../middlewares/adminMiddlewares.js';

const adminRouter = express.Router();

adminRouter.get('/get-all-users', authenticateToken, adminMiddleware, adminController.getAllUsers);
adminRouter.get('/get-all-groups', authenticateToken, adminMiddleware, adminController.getAllGroups);
// adminRouter.get('/get-all-unit', authenticateToken, adminMiddleware, adminController.getAllUnits);

export default adminRouter;
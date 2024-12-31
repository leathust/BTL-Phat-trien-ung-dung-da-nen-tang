import express from 'express';
import * as fridgeController from '../controllers/fridgeControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const fridgeRouter = express.Router();

fridgeRouter.get('/get', authenticateToken, fridgeController.getAllFridgeItems);
fridgeRouter.post('/add', authenticateToken, fridgeController.addItemToFridge);
fridgeRouter.post('/remove', authenticateToken, fridgeController.removeItemFromFridge);
fridgeRouter.post('/expiring', authenticateToken, fridgeController.getExpiringItems);
fridgeRouter.post('/suggest', authenticateToken, fridgeController.suggestDishes);

export default fridgeRouter;
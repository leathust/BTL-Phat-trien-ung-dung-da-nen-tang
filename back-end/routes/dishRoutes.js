import express from 'express';
import * as dishController from '../controllers/dishControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const dishRouter = express.Router();

dishRouter.route('/dish').post(authenticateToken, dishController.createDish);
dishRouter.route('/dish').put(authenticateToken, dishController.updateDish);
dishRouter.route('/dish').delete(authenticateToken, dishController.deleteDish);
dishRouter.route('/dish').get(authenticateToken, dishController.getAllDishes);
dishRouter.route('/dish/:id').get(authenticateToken, dishController.getDishById);

export default dishRouter;
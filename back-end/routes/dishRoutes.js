import express from 'express';
import * as dishController from '../controllers/dishControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const dishRouter = express.Router();

dishRouter.route('/create').post(authenticateToken, dishController.createDish);
dishRouter.route('/update').put(authenticateToken, dishController.updateDish);
dishRouter.route('/delete').delete(authenticateToken, dishController.deleteDish);
dishRouter.route('/get-all-dishs').get(authenticateToken, dishController.getAllDishes);
dishRouter.route('/get-dish/:id').get(authenticateToken, dishController.getDishById);

export default dishRouter;
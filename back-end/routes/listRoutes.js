import express from "express";
import * as listControllers from "../controllers/listControllers.js";
import { authenticateToken } from "../middlewares/tokenMiddlewares.js";

const listRouter = express.Router();

// Định nghĩa các routes
listRouter.route('/create-list').post(authenticateToken, listControllers.createList);
listRouter.route('/update-list').put(authenticateToken, listControllers.updateList);
listRouter.route('/delete-list').delete(authenticateToken, listControllers.deleteList);
listRouter.route('/get-all-lists').get(authenticateToken, listControllers.getAllLists);
listRouter.route('/get-list/:id').get(authenticateToken, listControllers.getListById);

export default listRouter;

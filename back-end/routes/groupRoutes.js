import express from "express";
import * as groupControllers from "./../controllers/groupControllers.js";
import { authenticateToken } from "./../middlewares/tokenMiddlewares.js";
import { adminMiddleware } from "./../middlewares/adminMiddlewares.js";
const groupRouter = express.Router();

groupRouter.route('/create').post(authenticateToken, groupControllers.createGroup);
groupRouter.route('/delete').delete(authenticateToken, adminMiddleware, groupControllers.deleteGroup);
groupRouter.route('/info').get(authenticateToken, groupControllers.getGroupInfo);
groupRouter.route('/invite').post(authenticateToken, groupControllers.sendInvitation);
groupRouter.route('/accept').post(authenticateToken, groupControllers.acceptInvitation);
groupRouter.route('/remove').delete(authenticateToken, adminMiddleware, groupControllers.removeMember);
groupRouter.route('/leave').post(authenticateToken, groupControllers.leaveGroup);
groupRouter.route('/share').post(authenticateToken, groupControllers.shareListWithGroup);
groupRouter.route('/assign-task').post(authenticateToken, adminMiddleware, groupControllers.assignTask);

export default groupRouter;
import express from "express";
import * as groupControllers from "./../controllers/groupControllers.js";
import { authenticateToken } from "./../middlewares/tokenMiddlewares.js";

const groupRouter = express.Router();

groupRouter.route('/create').post(authenticateToken, groupControllers.createGroup);
groupRouter.route('/delete').delete(authenticateToken, groupControllers.deleteGroup);
groupRouter.route('/info').get(authenticateToken, groupControllers.getGroupInfo);
groupRouter.route('/invite').post(authenticateToken, groupControllers.sendInvitation);
groupRouter.route('/accept').post(authenticateToken, groupControllers.acceptInvitation);
groupRouter.route('/remove').delete(authenticateToken, groupControllers.removeMember);
groupRouter.route('/leave').post(authenticateToken, groupControllers.leaveGroup);
groupRouter.route('/share').post(authenticateToken, groupControllers.shareListWithGroup);

export default groupRouter;
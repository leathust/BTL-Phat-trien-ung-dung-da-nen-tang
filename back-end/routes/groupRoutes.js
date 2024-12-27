import express from "express";
import * as groupControllers from "./../controllers/groupControllers.js";
import { authenticateToken } from "./../middlewares/tokenMiddlewares.js";

const groupRouter = express.Router();

groupRouter.route('/group').post(authenticateToken, groupControllers.createGroup);
groupRouter.route('/group').delete(authenticateToken, groupControllers.deleteGroup);
groupRouter.route('/group/info').get(authenticateToken, groupControllers.getGroupInfo);
groupRouter.route('/group/invite').post(authenticateToken, groupControllers.sendInvitation);
groupRouter.route('/group/accept').post(authenticateToken, groupControllers.acceptInvitation);
groupRouter.route('/group/remove').delete(authenticateToken, groupControllers.removeMember);
groupRouter.route('/group/leave').post(authenticateToken, groupControllers.leaveGroup);
groupRouter.route('/group/share').post(authenticateToken, groupControllers.shareListWithGroup);

export default groupRouter;
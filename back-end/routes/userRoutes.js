import express from "express";
import * as userControllers from "./../controllers/userControllers.js";
import { authenticateToken } from "./../middlewares/tokenMiddlewares.js";
import { getReport } from "./../controllers/reportControllers.js";

const userRouter = express.Router();

userRouter.route('/register').post(userControllers.userRegister);
userRouter.route('/login').post(userControllers.userLogin);
userRouter.route('/logout').post(userControllers.userLogout);
userRouter.route('/refresh-token').post(userControllers.refreshToken);
userRouter.route('/get-verification-code').post(userControllers.getVerificationCode);
userRouter.route('/verify-email').post(authenticateToken, userControllers.verifyEmail);
userRouter.route('/find-by-name').get(userControllers.findUserByName);
userRouter.route('/find-by-id').get(userControllers.findUserById);
userRouter.route('/change-password').post(authenticateToken, userControllers.changePassword);
userRouter.route('/update-personal-info').post(authenticateToken, userControllers.updatePersonalInfo);
userRouter.route('/get-report').get(authenticateToken, getReport);

export default userRouter;
import express from "express";
import userControllers from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter
    .route('/')
    .get(userControllers.getUsers)
    .post(userControllers.createUser);

userRouter
    .route('/:id')
    .get(userControllers.getUserByID)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

export default userRouter;
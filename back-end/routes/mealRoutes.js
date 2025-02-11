import express from 'express';
import * as mealController from '../controllers/mealControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.post('/create', authenticateToken, mealController.createMeal); // Tạo một meal mới
router.put('/update/:id', authenticateToken, mealController.updateMeal); // Sửa một meal theo ID
router.delete('/delete/:id', authenticateToken, mealController.deleteMeal); // Xóa một meal theo ID
router.get('/get-all-meals/user/:userId', authenticateToken, mealController.getAllMeals); // Lấy tất cả các meal của một userId
router.get('/get-meal/:id', authenticateToken, mealController.getMealById); // Lấy một meal theo ID

export default router;
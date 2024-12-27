import express from 'express';
import * as mealController from '../controllers/mealControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';
const router = express.Router();

router.post('/meals', authenticateToken, mealController.createMeal); // Tạo một meal mới
router.put('/meals/:id', authenticateToken, mealController.updateMeal); // Sửa một meal theo ID
router.delete('/meals/:id', authenticateToken, mealController.deleteMeal); // Xóa một meal theo ID
router.get('/meals', authenticateToken, mealController.getAllMeals); // Lấy tất cả các meal
router.get('/meals/:id', authenticateToken, mealController.getMealById); // Lấy một meal theo ID

export default router;
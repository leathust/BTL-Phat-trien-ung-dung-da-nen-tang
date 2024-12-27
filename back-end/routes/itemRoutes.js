import express from 'express';
import * as itemController from '../controllers/itemControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.post('/items', authenticateToken, itemController.createItem); // Tạo một item mới
router.put('/items/:id', authenticateToken, itemController.updateItem); // Sửa một item theo ID
router.delete('/items/:id', authenticateToken, itemController.deleteItem); // Xóa một item theo ID
router.get('/items/user/:userId', authenticateToken, itemController.getAllItems); // Lấy tất cả các item
router.get('/items/:id', authenticateToken, itemController.getItemById); // Lấy một item theo ID

export default router;
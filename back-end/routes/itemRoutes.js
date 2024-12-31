import express from 'express';
import * as itemController from '../controllers/itemControllers.js';
import { authenticateToken } from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.post('/create', authenticateToken, itemController.createItem); // Tạo một item mới
router.put('/update/:id', authenticateToken, itemController.updateItem); // Sửa một item theo ID
router.delete('/delete/:id', authenticateToken, itemController.deleteItem); // Xóa một item theo ID
router.get('/get-item/user/:userId', authenticateToken, itemController.getAllItems); // Lấy tất cả các item
router.get('/get-item/:id', authenticateToken, itemController.getItemById); // Lấy một item theo ID

export default router;
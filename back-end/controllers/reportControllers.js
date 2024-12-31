import Task from '../models/taskModel.js';
import Fridge from '../models/fridgeModel.js';
import mongoose from 'mongoose';

// API báo cáo thống kê trong 30 ngày gần nhất
export const getReport = async (req, res) => {
    try {
        const { userId } = req.body;

        // Kiểm tra userId hợp lệ
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Ngày hiện tại và ngày cách đây 30 ngày
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        // Truy vấn tất cả task đã hoàn thành trong vòng 30 ngày gần nhất
        const tasks = await Task.find({
            userId,
            status: 'completed',
            dateToBuy: { $gte: startDate, $lte: endDate },
        });

        // Tính toán báo cáo
        const report = {
            totalPurchases: tasks.length, // Tổng số lần mua sắm
            purchases: [],               // Chi tiết mỗi lần mua
            totalSpent: 0,               // Tổng số tiền đã chi
            expiredItems: 0,             // Số thực phẩm hết hạn
        };

        for (const task of tasks) {
            // Thêm chi tiết từng lần mua
            report.purchases.push({
                taskId: task._id,
                totalCost: task.totalCost || 0,
                date: task.dateToBuy,
            });

            // Tính tổng số tiền đã chi
            report.totalSpent += task.totalCost || 0;
        }

        // Kiểm tra thực phẩm hết hạn trong Fridge
        const fridge = await Fridge.findOne({ userId });
        if (fridge && fridge.items) {
            const today = new Date();
            for (const item of fridge.items) {
                if (new Date(item.expiryDate) < today) {
                    report.expiredItems += 1; // Đếm số lượng thực phẩm hết hạn
                }
            }
        }

        // Phản hồi báo cáo
        return res.status(200).json({
            message: 'Report generated successfully',
            data: report,
        });
    } catch (error) {
        console.error('Error generating report:', error.message);
        return res.status(500).json({
            message: 'Error generating report',
            error: error.message,
        });
    }
};

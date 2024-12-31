import Task from '../models/taskModel.js';

// API get all task
export const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.body;
        const tasks = await Task.find({ userId });
        return res.status(200).json({ message: 'Get all tasks successfully', data: tasks });
    } catch (error) {
        console.error('Error getting all tasks:', error.message);
        return res.status(500).json({ message: 'Error getting all tasks', error: error.message });
    }
};

// API hoàn thành task
export const completeTask = async (req, res) => {
    try {
        const { taskId, totalCost } = req.body;

        // Tìm task theo ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Kiểm tra task đã được hoàn thành chưa
        if (task.status === 'completed') {
            return res.status(400).json({ message: 'Task is already completed' });
        }

        // Cập nhật trạng thái của task
        task.status = 'completed';
        task.totalCost = totalCost ? parseInt(totalCost, 10) : 0; // Mặc định là 0 nếu không hợp lệ
        await task.save();

        return res.status(200).json({ message: 'Task completed successfully', data: task });
    } catch (error) {
        console.error('Error completing task:', error.message);
        return res.status(500).json({ message: 'Error completing task', error: error.message });
    }
};


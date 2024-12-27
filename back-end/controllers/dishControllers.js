import Dish from '../models/dishModel.js';

// Tạo món ăn mới
export const createDish = async (req, res) => {
  try {
    // Lấy thông tin từ body request
    const { userId, dishName, ingredient, instruction, image } = req.body;

    // Tạo một món ăn mới
    const newDish = new Dish({
      userId,
      dishName,
      ingredient,  // ingredient là mảng các ObjectId tham chiếu đến Item
      instruction,
      image
    });

    // Lưu món ăn vào cơ sở dữ liệu
    const dish = await newDish.save();

    res.status(201).json(dish);
  } catch (err) {
    res.status(500).json({ message: 'Error creating dish', error: err });
  }
};

// Lấy tất cả các món ăn
export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
      .populate('ingredient')  // Populating để lấy thông tin Item từ ObjectId
      .exec();

    res.status(200).json(dishes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dishes', error: err });
  }
};

// Lấy món ăn theo ID
export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)
      .populate('ingredient')  // Populating để lấy thông tin Item từ ObjectId
      .exec();

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dish', error: err });
  }
};

// Cập nhật món ăn
export const updateDish = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Trả về món ăn đã được cập nhật
    )
      .populate('ingredient')  // Populating để lấy thông tin Item từ ObjectId
      .exec();

    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: 'Error updating dish', error: err });
  }
};

// Xóa món ăn
export const deleteDish = async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);

    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting dish', error: err });
  }
};

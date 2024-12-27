import Meal from "../models/mealModel.js";

// Tạo một meal mới
export const createMeal = async (req, res) => {
  try {
    const { userId, mealName, dishes, mealTime } = req.body;

    const newMeal = await Meal.create({
      userId,
      mealName,
      dishes,
      mealTime,
    });

    res.status(201).json({
      message: "Meal created successfully",
      meal: newMeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Sửa một meal
export const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, mealName, dishes, mealTime } = req.body;

    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      { userId, mealName, dishes, mealTime },
      { new: true, runValidators: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({
      message: "Meal updated successfully",
      meal: updatedMeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Xóa một meal
export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({
      message: "Meal deleted successfully",
      meal: deletedMeal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Lấy tất cả các meal của một userId
export const getAllMeals = async (req, res) => {
  try {
    const { userId } = req.params;
    const meals = await Meal.find({ userId });

    res.status(200).json({
      message: "Meals retrieved successfully",
      meals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Lấy một meal theo ID
export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({
      message: "Meal retrieved successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
import Item from "../models/itemModel.js";

// Tạo một item mới
export const createItem = async (req, res) => {
  try {
    const { itemName, itemDescription, itemIcon } = req.body;

    const newItem = await Item.create({
      itemName,
      itemDescription,
      itemIcon,
    });

    res.status(201).json({
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Sửa một item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, itemDescription, itemIcon } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { itemName, itemDescription, itemIcon },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Xóa một item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Lấy tất cả các item
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({
      message: "Items retrieved successfully",
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Lấy một item theo ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item retrieved successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
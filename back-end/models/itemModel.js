import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Định nghĩa Schema
const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  itemName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [1, "The name must be at least 1 character"],
    maxlength: [100, "The name cannot exceed 100 characters"],
  },
  itemDescription: {
    type: String,
    trim: true,
    minlength: [1, "The description must be at least 1 character"],
    maxlength: [500, "The description cannot exceed 500 characters"],
  },
  itemIcon: {
    type: String,
    trim: true,
    default: "default-icon.png", // Đặt giá trị mặc định nếu không có icon
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// Export model
const Item = mongoose.model("Item", itemSchema);

export default Item;

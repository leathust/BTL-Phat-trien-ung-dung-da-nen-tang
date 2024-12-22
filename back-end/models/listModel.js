import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Định nghĩa Schema
const listSchema = new mongoose.Schema({
  listId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  userId: {
    type: String,
    required: [true, "UserId is required"],
    ref: "User",
  },
  itemId: {
    type: String,
    required: [true, "ItemId is required"],
    ref: "Item",
  },
  totalCost: {
    type: Number,
    required: true,
    min: [0, "Total cost cannot be negative"],
  },
  dateToBuy: {
    type: Date, // Hoặc `Date` nếu bạn muốn lưu trữ dưới dạng ngày
    required: false,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});


// Export model
const List = mongoose.model("List", listSchema);

export default List;

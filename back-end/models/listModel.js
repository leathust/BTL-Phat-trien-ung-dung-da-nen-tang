import mongoose from "mongoose";

// Định nghĩa Schema
const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required"],
    ref: "User",
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
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
}, { timestamps: true });


// Export model
const List = mongoose.model("List", listSchema);

export default List;

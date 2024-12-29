import mongoose from "mongoose";

// Định nghĩa Schema
const taskSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "The groupId id is required"],
    ref: "Group",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required"],
    ref: "User",
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    unit: {
      type: String,
      required: true,
        default: "kg",
    },
  }],
  totalCost: {
    type: Number,
    required: false,
    min: [0, "Total cost cannot be negative"],
  },
  dateToBuy: {
    type: Date, // Ngày mua hàng
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
}, { timestamps: true });


// Export model
const Task = mongoose.model("Task", taskSchema);

export default Task;

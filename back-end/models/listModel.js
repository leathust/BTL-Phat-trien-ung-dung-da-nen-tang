import mongoose from "mongoose";

// Định nghĩa Schema
const listSchema = new mongoose.Schema({
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
      required: true
    },
    unit: {
      type: String,
      required: true
    },
  }],
  totalCost: {
    type: Number,
    required: false,
    min: [0, "Total cost cannot be negative"],
  },
  dateToBuy: {
    type: Date, // Ngày mua hàng
    required: false,
    trim: true,
  },
}, { timestamps: true });


// Export model
const List = mongoose.model("List", listSchema);

export default List;

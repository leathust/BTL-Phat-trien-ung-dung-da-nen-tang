import mongoose from 'mongoose';

// Định nghĩa Schema cho Dish
const dishSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Đảm bảo có model 'User' để tham chiếu
  },
  dishName: {
    type: String,
    required: true
  },
  ingredients: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,  // Tham chiếu đến model Item
      ref: 'Item',  // Đảm bảo 'Item' là một model hợp lệ
      required: true
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    }
  }],
  instruction: {
    type: String,
    required: true
  },
  dishImage: {
    type: String,
    required: false // URL hoặc đường dẫn đến ảnh
  }
}, { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
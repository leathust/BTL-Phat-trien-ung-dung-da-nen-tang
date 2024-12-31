import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Đảm bảo có model 'User' để tham chiếu
  },
  mealName: {
    type: String,
    required: true
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',  // Mảng tham chiếu đến các món ăn (Dish)
    required: true
  }],
  mealTime: {
    type: Date,
    required: true
  },
}, { timestamps: true });

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;

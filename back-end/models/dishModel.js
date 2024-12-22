import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const dishSchema = new mongoose.Schema({
  dishId: { type: String, default: uuidv4, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  dishName: { type: String, required: true },
  ingredient: { type: String, required: true },
  instruction: { type: String, required: true },
  image: { type: String, required: false }  // URL or path to image
}, { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;

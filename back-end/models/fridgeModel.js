import mongoose from 'mongoose';

const fridgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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
      default: 'kg',
    },
    expiryDate: {
      type: Date,
      required: true
    },
  }],
}, { timestamps: true });

const Fridge = mongoose.model('Fridge', fridgeSchema);

export default Fridge;

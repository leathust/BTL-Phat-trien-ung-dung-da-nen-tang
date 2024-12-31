import Fridge from '../models/fridgeModel.js';
import Item from '../models/itemModel.js';
import Dish from '../models/dishModel.js';



// GET ALL ITEMS IN FRIDGE
export const getAllFridgeItems = async (req, res) => {
  try {
    const { fridgeId } = req.body;

    const fridge = await Fridge.findById(fridgeId).populate('items.item');
    if (!fridge) {
      return res.status(404).json({ message: 'Fridge not found' });
    }

    res.status(200).json({ items: fridge.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ADD ITEM TO FRIDGE
export const addItemToFridge = async (req, res) => {
  try {
    const { fridgeId, itemId, quantity, unit, expiryDate } = req.body;

    // Tìm tủ lạnh theo ID
    const fridge = await Fridge.findById(fridgeId);
    if (!fridge) {
      return res.status(404).json({ message: 'Fridge not found' });
    }

    // Kiểm tra xem item có tồn tại không
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Thêm item vào tủ lạnh
    fridge.items.push({ item: itemId, quantity, unit, expiryDate });
    await fridge.save();

    res.status(201).json({ message: 'Item added to fridge', fridge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// REMOVE ITEM FROM FRIDGE
export const removeItemFromFridge = async (req, res) => {
  try {
    const { fridgeId, itemId } = req.body;

    const fridge = await Fridge.findById(fridgeId);
    if (!fridge) {
      return res.status(404).json({ message: 'Fridge not found' });
    }

    // Lọc bỏ item
    fridge.items = fridge.items.filter((item) => item.item.toString() !== itemId);
    await fridge.save();

    res.status(200).json({ message: 'Item removed from fridge', fridge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ITEMS NEAR EXPIRY
export const getExpiringItems = async (req, res) => {
  try {
    const { fridgeId, days } = req.body;
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + days);

    const fridge = await Fridge.findById(fridgeId).populate('items.item');
    if (!fridge) {
      return res.status(404).json({ message: 'Fridge not found' });
    }

    const expiringItems = fridge.items.filter((item) => item.expiryDate && item.expiryDate <= thresholdDate);

    res.status(200).json({ expiringItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// SUGGEST DISHES BASED ON AVAILABLE ITEMS
export const suggestDishes = async (req, res) => {
  try {
    const { fridgeId } = req.body;

    const fridge = await Fridge.findById(fridgeId).populate('items.item');
    if (!fridge) {
      return res.status(404).json({ message: 'Fridge not found' });
    }

    const availableIngredients = fridge.items.map((i) => i.item._id.toString());

    // Tìm các món ăn phù hợp
    const dishes = await Dish.find({ ingredient: { $all: availableIngredients } });

    res.status(200).json({ suggestedDishes: dishes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

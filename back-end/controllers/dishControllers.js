import Dish from '../models/dishModel.js';

export const createDish = async (req, res) => {
    try {
      const { recipeID, userID, instruction, ingredients } = req.body;
  
      // Validate input
      if (!recipeID || !userID || !instruction || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Construct ingredient string from the array
      const ingredientString = ingredients
        .map(item => `${item.itemID}: ${item.amount}`)
        .join(', ');
  
      // Create new dish entry
      const newDish = new Dish({
        dishId: recipeID,
        dishName: `Recipe_${recipeID}`,
        ingredient: ingredientString,
        instruction: instruction,
      });
  
      await newDish.save();
  
      res.status(200).json({ message: 'Recipe created successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateDish = async (req, res) => {
    try {
      const { recipeID, userID, instruction, ingredients, dishName } = req.body;
  
      // Validate input
      if (!recipeID || !userID || !instruction || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Find the existing dish
      const existingDish = await Dish.findOne({ dishId: recipeID });
      if (!existingDish) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      // Update fields
      if (dishName) {
        existingDish.dishName = dishName;
      }
      existingDish.instruction = instruction;
      existingDish.ingredient = ingredients
        .map(item => `${item.itemID}: ${item.amount}`)
        .join(', ');
  
      await existingDish.save();
  
      res.status(200).json({ message: 'Recipe updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteDish = async (req, res) => {
    try {
      const { recipeID, userID } = req.body;
  
      // Validate input
      if (!recipeID || !userID) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      // Find and delete the dish
      const deletedDish = await Dish.findOneAndDelete({ dishId: recipeID });
      if (!deletedDish) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.status(200).json({ message: 'Recipe deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
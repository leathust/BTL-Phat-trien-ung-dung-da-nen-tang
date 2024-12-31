import List from "../models/listModel.js";

// CREATE A LIST
export const createList = async (req, res) => {
  try {
    const { userID, itemId, dateToBuy, cost } = req.body;

    if (!userID || !itemId || cost === undefined) {
      return res.status(400).json({ message: "UserID, itemId, and cost are required." });
    }

    const newList = new List({
      userId: userID,
      itemId: itemId,
      dateToBuy: dateToBuy ? new Date(dateToBuy) : undefined,
      totalCost: cost,
    });

    await newList.save();

    return res.status(200).json({
      message: "Daily list created successfully.",
      list: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the daily list.",
      error: error.message,
    });
  }
};

// UPDATE A LIST
export const updateList = async (req, res) => {
  try {
    const { userID, listID, dateToBuy, cost } = req.body;

    if (!userID || !listID) {
      return res.status(400).json({ message: "UserID and listID are required." });
    }

    const listToUpdate = await List.findOne({ listId: listID, userId: userID });

    if (!listToUpdate) {
      return res.status(404).json({ message: "List not found." });
    }

    if (dateToBuy) listToUpdate.dateToBuy = new Date(dateToBuy);
    if (cost !== undefined) listToUpdate.totalCost = cost;

    await listToUpdate.save();

    return res.status(200).json({
      message: "Daily list updated successfully.",
      list: listToUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the daily list.",
      error: error.message,
    });
  }
};

// DELETE A LIST
export const deleteList = async (req, res) => {
  try {
    const { userID, listID } = req.body;

    if (!userID || !listID) {
      return res.status(400).json({ message: "UserID and listID are required." });
    }

    const deletedList = await List.findOneAndDelete({ listId: listID, userId: userID });

    if (!deletedList) {
      return res.status(404).json({ message: "List not found." });
    }

    return res.status(200).json({
      message: "Daily list deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the daily list.",
      error: error.message,
    });
  }
};

// GET ALL LISTS
export const getAllLists = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const lists = await List.find({ userId: userID });

    return res.status(200).json({
      message: "Daily lists retrieved successfully.",
      lists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the daily lists.",
      error: error.message,
    });
  }
};

// GET A LIST BY ID
export const getListById = async (req, res) => {
  try {
    const { listID } = req.params;

    if (!listID) {
      return res.status(400).json({ message: "ListID is required." });
    }

    const list = await List.findOne({ listId: listID });

    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    return res.status(200).json({
      message: "Daily list retrieved successfully.",
      list,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the daily list.",
      error: error.message,
    });
  }
};

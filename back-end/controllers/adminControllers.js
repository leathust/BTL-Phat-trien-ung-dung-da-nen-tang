import User from '../models/userModel.js';
import Group from '../models/groupModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// export const getAllUnits = async (req, res) => {
//     try {
//         const units = await Unit.find();
//         res.status(200).json(units);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
//     };
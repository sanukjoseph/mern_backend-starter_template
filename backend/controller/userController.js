// controllers/userController.js
import { UserModel } from '../models/UserModel.js';

// Update user profile
export const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const updates = { name, email };

  if (req.file) {
    updates.profilePicture = req.file.path; // Store the uploaded file path
  }

  try {
    const user = await UserModel.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  res.json(req.user); // Return the authenticated user's data
};

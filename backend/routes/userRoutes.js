// routes/userRoutes.js
import express from 'express';
import { updateProfile, getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/jwtMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import multer from 'multer';

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

const router = express.Router();

// Protected routes
router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, upload.single('profilePicture'), updateProfile); // Handle profile picture upload

// Admin-only route example
router.delete('/delete/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

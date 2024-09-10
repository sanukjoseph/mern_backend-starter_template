// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controller/authController.js';
import { authMiddleware } from '../middlewares/jwtMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth routes');
});
// Public routes
router.post('/register', register);
router.post('/login', login);

// Example of a protected route
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;

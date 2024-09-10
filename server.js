// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/databaseConnection.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('All routes');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

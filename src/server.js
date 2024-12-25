import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js'; // Assuming you have a custom DB connection in config/db.js

// Initialize Express app
const app = express();

// Connect to MongoDB (Replace the connection string here)
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Replace this with your actual MongoDB connection string

// mongoose.connect(mongoURI, { // Using the connection string directly
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log('Failed to connect to MongoDB', err);
//   });

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests

// Routes
import authRoutes from './routes/auth.js'; // Updated import for routes
import rewardRoutes from './routes/reward.js';
import reportRoutes from './routes/report.js';

app.use('/api/auth', authRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/reports', reportRoutes);

await connectDB(); // Awaiting DB connection

// Start the server
const PORT = 5000; // Default port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

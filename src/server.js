const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // Assuming you have a custom DB connection in config/db.js

// Initialize Express app
const app = express();

// Connect to MongoDB (Replace the connection string here)
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Replace this with your actual MongoDB connection string

mongoose.connect(mongoURI, { // Using the connection string directly
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rewards', require('./routes/reward'));
app.use('/api/reports', require('./routes/report'));

// Start the server
const PORT = 5000; // Default port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

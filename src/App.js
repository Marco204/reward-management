import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubmitReward from './pages/SubmitReward';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.success('Reward submitted successfully!');
toast.error('Failed to submit reward.');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-reward" element={<SubmitReward />} />
      </Routes>
    </Router>
  );
};



// server.js
const express = require('express');
const mongoose = require('mongoose');
const rewardRoutes = require('./routes/reward');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

app.use(express.json()); // Parse incoming JSON requests
app.use('/rewards', rewardRoutes); // Use reward routes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link,RouterProvider } from 'react-router-dom'; // Update to use Routes and Route components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SubmitReward from './pages/SubmitReward';
import Register from './pages/Register';

import './pages/styles/dashboard.css'
import './pages/styles/login.css'
import './pages/styles/SubmitReward.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/submit-reward" element={<SubmitReward />} /> {/* Submit Reward Page */}
          <Route path="/Register" element={<Register />} />

      </Routes>
    </Router>
  );
};

export default App;

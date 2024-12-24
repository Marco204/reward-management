import React, { useState } from 'react';
import api from '../services/api';
import './styles/SubmitReward.css';


const SubmitReward = () => {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.post(
        '/rewards',
        { reason, amount },
        { headers: { Authorization: `Bearer ${token}` } }  // Fixed string interpolation
      );
      setMessage('Reward submitted successfully!');
      setReason('');
      setAmount(0);
    } catch (err) {
      setMessage('Failed to submit reward. Please try again.');
    }
  };

  return (
    <div className="submit-reward-container">
      <h2>Submit Reward</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitReward;

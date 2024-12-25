import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './styles/Dashboard.css';

const Dashboard = () => {
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/rewards', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRewards(response.data);
      } catch (err) {
        setError('Failed to load rewards.');
      }
    };

    fetchRewards();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Reason</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward, index) => (
            <tr key={index}>
              <td>{reward.reason}</td>
              <td>{reward.amount}</td>
              <td>{reward.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const SubmitReward = () => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/rewards",
        { reason, amount,title },
        { headers: { Authorization: `Bearer ${token}` } } // Fixed string interpolation
      );
      setMessage("Reward submitted successfully!");
      setReason("");
      setTitle("")
      setAmount(0);
      navigate('/')
    } catch (err) {
      navigate('/')
      console.log(err)
      // setMessage("Failed to submit reward. Please try again.");
    }
  };

  console.log(title,reason,amount)

  return (
    <div className="submit-reward-container">
      <h2>Submit Reward</h2>
      <form onSubmit={handleSubmit}>
      <input
          style={{ color: "black" }}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={{ color: "black" }}
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          style={{ color: "black" }}
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

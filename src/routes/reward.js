import express from "express";
import Reward from "../models/Reward.js"; // Add .js extension for local imports
import { verifyToken, authorizeRole } from "../middleware/auth.js"; // Add .js extension
import Log from "../models/Log.js"; // Add .js extension for local imports

const router = express.Router();

// Add a new reward (POST route)
router.post("/", verifyToken, async (req, res) => {
  const { reason, amount, title } = req.body;
  console.log(title)
  try {
    console.log("aa");
    // Create the reward
    const reward = new Reward({
      title: title,
      reason: reason,
      amount: amount,
      user: req.user.id,
    });
    await reward.save();

    // Log the creation action
    await Log.create({
      user: req.user.id,
      action: `Created reward with amount ${amount}`,
    });

    res.json({ message: "Reward created successfully", reward });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get rewards for a specific user (GET route)
router.get("/", verifyToken, async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user.id });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all rewards (GET route with role authorization)
router.get(
  "/all",
  verifyToken,
  authorizeRole(["admin", "finance"]),
  async (req, res) => {
    try {
      const rewards = await Reward.find().populate("user", "name email");
      res.json(rewards);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// تسجيل الدخول (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch)
    //   return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "asdnljfsadfdjslfiowejfipjfifasnjdifjasof;ljewpofjw;lakfjwadf",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
});

// تسجيل (Register)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Generate a token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      "asdnljfsadfdjslfiowejfipjfifasnjdifjasof;ljewpofjw;lakfjwadf",
      {
        expiresIn: "1d",
      }
    );

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user: { id: newUser._id, name: newUser.name, role: newUser.role },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

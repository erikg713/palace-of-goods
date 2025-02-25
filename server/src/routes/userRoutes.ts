import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, User } from "../models/userModel";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await findUserByEmail(email);

  if (existingUser) return res.status(400).json({ error: "Email already in use" });

  const newUser = await createUser({ username, email, password });
  res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, userId: user.id, username: user.username });
});

export default router;

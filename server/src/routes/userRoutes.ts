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
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [userId]);
    if (!user.rows.length) return res.status(404).json({ error: "User not found" });
    
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
});
import express from "express";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/auth";
import pool from "../utils/db";

const router = express.Router();

// Update user info
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, password } = req.body;

    let updateQuery = "UPDATE users SET";
    let values = [];
    let index = 1;

    if (username) {
      updateQuery += ` username = $${index},`;
      values.push(username);
      index++;
    }

    if (email) {
      updateQuery += ` email = $${index},`;
      values.push(email);
      index++;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ` password = $${index},`;
      values.push(hashedPassword);
      index++;
    }

    updateQuery = updateQuery.slice(0, -1); // Remove last comma
    updateQuery += ` WHERE id = $${index} RETURNING id, username, email`;
    values.push(userId);

    const result = await pool.query(updateQuery, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

export default router;

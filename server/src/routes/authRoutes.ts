import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateJWT } from "../middleware/auth";
import { createUser, findUserByEmail, User } from "../models/User";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ success: false, error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ success: true, message: "User registered", data: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    res.status(500).json({ success: false, error: "Error registering user" });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: "3h" });

    res.json({ success: true, token, userId: user.id, username: user.username });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ success: false, error: "Error logging in" });
  }
});

export default router;

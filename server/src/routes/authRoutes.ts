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
    const existingUser = await findUserByEmail(email);

    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const newUser = await createUser({ username, email, password });
    res.status(201).json({ success: true, message: "User registered", data: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
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
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ success: true, token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

/**
 * @route   GET /api/auth/session
 * @desc    Verify user session
 * @access  Private
 */
router.get("/session", authenticateJWT, async (req: Request, res: Response) => {
  res.json({ success: true, userId: req.user?.id });
});

export default router;

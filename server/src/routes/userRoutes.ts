import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateJWT } from "../middleware/auth";
import upload from "../middleware/uploadMiddleware";
import { createUser, findUserByEmail, User } from "../models/userModel";
import { pool } from "../utils/db"; // Uncomment this if using PostgreSQL

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 * @route   POST /api/users/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password }: { username: string; email: string; password: string } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const newUser = await createUser({ username, email, password });
    res.status(201).json({ success: true, message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("❌ Signup error:", (error as Error).message);
    res.status(500).json({ error: "Error registering user" });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ success: true, token, userId: user.id, username: user.username });
  } catch (error) {
    console.error("❌ Login error:", (error as Error).message);
    res.status(500).json({ error: "Error logging in" });
  }
});

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get("/profile", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Uncomment this if using MongoDB
    const user = await User.findById(userId).select("username email profilePic");

    // Uncomment this if using PostgreSQL
    // const user = await pool.query("SELECT id, username, email, profile_pic FROM users WHERE id = $1", [userId]);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error fetching profile:", (error as Error).message);
    res.status(500).json({ error: "Error fetching user profile" });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile (username, email, password)
 * @access  Private
 */
router.put("/profile", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { username, email, password }: { username: string; email: string; password: string } = req.body;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    let updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // Uncomment this if using MongoDB
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("username email profilePic");

    // Uncomment this if using PostgreSQL
    // const result = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email", [username, email, userId]);

    res.json({ success: true, message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    console.error("❌ Error updating profile:", (error as Error).message);
    res.status(500).json({ error: "Error updating profile" });
  }
});

/**
 * @route   POST /api/users/profile/picture
 * @desc    Upload and update user profile picture
 * @access  Private
 */
router.post("/profile/picture", authenticateJWT, upload.single("profilePic"), async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const profilePicPath = `/uploads/${req.file?.filename}`;

    // Uncomment this if using MongoDB
    await User.findByIdAndUpdate(userId, { profilePic: profilePicPath });

    // Uncomment this if using PostgreSQL
    // await pool.query("UPDATE users SET profile_pic = $1 WHERE id = $2", [profilePicPath, userId]);

    res.json({ success: true, message: "Profile picture updated", profilePic: profilePicPath });
  } catch (error) {
    console.error("❌ Error uploading profile picture:", (error as Error).message);
    res.status(500).json({ error: "Error uploading profile picture" });
  }
});

/**
 * @route   GET /api/users/session
 * @desc    Verify user session
 * @access  Private
 */
router.get("/session", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId).select("id username email profilePic");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error verifying session:", (error as Error).message);
    res.status(500).json({ error: "Error verifying session" });
  }
});

export default router;

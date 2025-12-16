import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateJWT } from "../middleware/auth";
import { createUser, findUserByEmail, User } from "../models/User";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(limiter);

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/signup",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await createUser({ username, email, password: hashedPassword });

      res.status(201).json({ success: true, message: "User registered", data: { id: newUser.id, username: newUser.username } });
    } catch (error) {
      console.error("❌ Signup error:", error.message);
      res.status(500).json({ success: false, error: "Error registering user" });
    }
  }
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

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
  }
);

export default router;
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("User registered successfully!");
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password!");

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

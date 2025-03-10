import express, { Request, Response } from "express";
import { authenticateJWT } from "../middleware/auth";
import User from "../models/User";
import Order from "../models/Order";
import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware";
import { getAllUsers } from "../controllers/adminController";
router.get("/users", protect, adminOnly, getAllUsers);
const router = express.Router();

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

export default router;
const router = express.Router();

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (Admin Only)
 * @access  Private (Admin)
 */
router.get("/users", authenticateJWT, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders (Admin Only)
 * @access  Private (Admin)
 */
router.get("/orders", authenticateJWT, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

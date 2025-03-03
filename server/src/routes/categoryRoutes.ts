import express, { Request, Response } from "express";
import { authenticateJWT } from "../middleware/auth";
import Category from "../models/Category";

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all product categories
 * @access  Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching categories" });
  }
});

export default router;

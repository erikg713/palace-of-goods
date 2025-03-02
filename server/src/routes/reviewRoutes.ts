import express, { Request, Response } from "express";
import { authenticateJWT } from "../middleware/auth";
import Review from "../models/Review";

const router = express.Router();

/**
 * @route   POST /api/reviews/:productId
 * @desc    Add a review for a product
 * @access  Private (Only customers)
 */
router.post("/:productId", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user?.id;
    const productId = req.params.productId;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, error: "Rating must be between 1 and 5" });
    }

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({ success: false, error: "You have already reviewed this product" });
    }

    const newReview = await Review.create({ productId, userId, rating, comment });
    res.status(201).json({ success: true, message: "Review added", data: newReview });
  } catch (error) {
    console.error("❌ Error adding review:", error.message);
    res.status(500).json({ success: false, error: "Error adding review" });
  }
});

export default router;

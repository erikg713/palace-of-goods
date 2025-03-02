import express, { Request, Response } from "express";
import { authenticateJWT } from "../middleware/auth";
import Cart from "../models/Cart";

const router = express.Router();

/**
 * @route   POST /api/cart
 * @desc    Add item to cart
 * @access  Private
 */
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ userId, productId, quantity });
    }

    await cartItem.save();
    const updatedCart = await Cart.find({ userId });
    res.json({ success: true, message: "Cart updated", data: updatedCart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    res.status(500).json({ success: false, error: "Error adding to cart" });
  }
});

export default router;

import { Request, Response } from "express";
import Order from "../models/Order";
import { verifyPiTransaction } from "../services/PiVerification";

/**
 * @desc    Place an order after successful payment
 * @route   POST /api/orders
 * @access  Private
 */
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { products, totalPrice, transactionId } = req.body;
    const userId = req.user?.id;

    // Verify Pi Network transaction before placing order
    const isVerified = await verifyPiTransaction(transactionId);
    if (!isVerified) {
      return res.status(400).json({ success: false, error: "Pi transaction verification failed" });
    }

    const newOrder = await Order.create({
      userId,
      products,
      totalPrice,
      status: "completed",
      transactionId,
    });

    res.status(201).json({ success: true, message: "Order placed", data: newOrder });
  } catch (error: any) {
    console.error("❌ Error placing order:", error.message);
    res.status(500).json({ success: false, error: "Error placing order" });
  }
};

import { Request, Response } from "express";
import { PiNetwork } from "@pinetwork/pi-backend";
import dotenv from "dotenv";

dotenv.config();

const pi = new PiNetwork({
  apiKey: process.env.PI_API_KEY!,
  secretKey: process.env.PI_SECRET_KEY!,
});

/**
 * @desc    Create a Pi Network payment
 * @route   POST /api/payments/create
 * @access  Private
 */
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const payment = await pi.createPayment({
      amount,
      memo: "Purchase from Palace of Goods",
      metadata: { userId },
    });

    res.json({ success: true, message: "Payment initiated", data: payment });
  } catch (error: any) {
    console.error("❌ Pi Payment Creation Error:", error.message);
    res.status(500).json({ success: false, error: "Failed to create payment" });
  }
};

/**
 * @desc    Verify Pi Network payment
 * @route   POST /api/payments/verify
 * @access  Private
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ success: false, error: "Missing required field: paymentId" });
    }

    const payment = await pi.verifyPayment(paymentId);

    if (payment.status === "completed") {
      return res.json({ success: true, message: "Payment successful", data: payment });
    } else {
      return res.status(400).json({ success: false, error: "Payment not completed", data: payment });
    }
  } catch (error: any) {
    console.error("❌ Pi Payment Verification Error:", error.message);
    res.status(500).json({ success: false, error: "Failed to verify payment" });
  }
};

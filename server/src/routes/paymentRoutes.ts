import express, { Request, Response } from "express";
import { PiNetwork } from "@pinetwork/pi-backend";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

if (!process.env.PI_API_KEY || !process.env.PI_SECRET_KEY) {
  console.error("❌ Pi Network API keys missing! Payments won't work.");
  process.exit(1);
}

const pi = new PiNetwork({
  apiKey: process.env.PI_API_KEY!,
  secretKey: process.env.PI_SECRET_KEY!,
});

// 🔹 Create a Pi Payment Request
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { amount, userId } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing required fields: amount or userId" });
    }

    const payment = await pi.createPayment({
      amount,
      memo: "Purchase from Palace of Goods",
      metadata: { userId },
    });

    res.json({ success: true, message: "Payment initiated", data: payment });
  } catch (error: any) {
    console.error("❌ Pi Payment Creation Error:", error);
    res.status(500).json({ success: false, error: "Failed to create payment" });
  }
});

// 🔹 Verify a Pi Payment
router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Missing required field: paymentId" });
    }

    const payment = await pi.verifyPayment(paymentId);

    if (payment.status === "completed") {
      return res.json({ success: true, message: "Payment successful", data: payment });
    } else {
      return res.status(400).json({ success: false, error: "Payment not completed", data: payment });
    }
  } catch (error: any) {
    console.error("❌ Pi Payment Verification Error:", error);
    res.status(500).json({ success: false, error: "Failed to verify payment" });
  }
});

export default router;

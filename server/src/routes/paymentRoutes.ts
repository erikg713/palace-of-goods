import express from "express";
import { PiNetwork } from "@pinetwork/pi-backend";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const pi = new PiNetwork({
  apiKey: process.env.PI_API_KEY,
  secretKey: process.env.PI_SECRET_KEY,
});

// Create a payment request
router.post("/create", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const payment = await pi.createPayment({
      amount,
      memo: "Purchase from Palace of Goods",
      metadata: { userId },
    });

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Payment error" });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const { paymentId } = req.body;
    const payment = await pi.verifyPayment(paymentId);

    if (payment.status === "completed") {
      res.json({ message: "Payment successful" });
    } else {
      res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Verification error" });
  }
});

export default router;

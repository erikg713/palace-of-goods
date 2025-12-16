import express from "express";
import rateLimit from "express-rate-limit";
import { verifyPiTransaction } from "./piPayments";

const app = express();
app.use(express.json());

// Set up rate limiter: max 100 requests per 15 minutes per IP for this endpoint
const verifyPaymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later."
  },
});

app.post("/api/verify-payment", verifyPaymentLimiter, async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ success: false, message: "Missing paymentId" });
  }

  const isVerified = await verifyPiTransaction(paymentId);

  if (isVerified) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

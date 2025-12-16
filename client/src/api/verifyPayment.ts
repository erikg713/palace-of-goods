import express from "express";
import { verifyPiTransaction } from "./piPayments";

const app = express();
app.use(express.json());

app.post("/api/verify-payment", async (req, res) => {
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

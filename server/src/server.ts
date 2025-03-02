import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Config & DB Setup
import { config } from "./config";
import { connectDB } from "./config/db";
import { logger } from "./config/logger";

// Routes
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import { authenticateJWT } from "./middleware/auth";

// Pi Network Payment Processing
import { createPiPayment, verifyPiPayment } from "./config/piPayments";

// Load environment variables
dotenv.config();

const app = express();
const PORT = config.port || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", authenticateJWT, orderRoutes);

// Pi Payment Routes
app.post("/pay", async (req, res) => {
  try {
    const { amount, userUid, metadata } = req.body;
    if (!amount || !userUid) {
      return res.status(400).json({ error: "Invalid payment request" });
    }
    const payment = await createPiPayment(amount, userUid, metadata);
    res.json(payment);
  } catch (error) {
    logger.error("Payment Failed:", error);
    res.status(500).json({ error: "Payment Failed" });
  }
});

app.get("/verify/:paymentId", async (req, res) => {
  try {
    const paymentStatus = await verifyPiPayment(req.params.paymentId);
    res.json(paymentStatus);
  } catch (error) {
    logger.error("Payment Verification Failed:", error);
    res.status(500).json({ error: "Payment Verification Failed" });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => logger.info(`🚀 Palace-of-Goods Server Running on Port ${PORT}`));

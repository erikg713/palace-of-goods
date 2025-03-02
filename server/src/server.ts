import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import { authenticateJWT } from "./middleware/auth";
import { config } from "./config";
import { connectDB } from "./config/db";
import { logger } from "./config/logger";

const app = express();
connectDB();

app.listen(config.port, () => {
  logger.info(`🚀 Palace-of-Goods server running on port ${config.port}`);
});
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); // Only allow frontend access
app.use(helmet());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", authenticateJWT, orderRoutes); // Protect orders with JWT

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

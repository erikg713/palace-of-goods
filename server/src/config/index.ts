import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  appName: "Palace-of-Goods",
  port: process.env.PORT || 5000,
  databaseURL: process.env.DATABASE_URL || "mongodb://localhost:27017/palaceofgoods",
  jwtSecret: process.env.JWT_SECRET || "super_secret_key",
  apiBaseURL: process.env.API_BASE_URL || "http://localhost:5000/api",
  nodeEnv: process.env.NODE_ENV || "development",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
};

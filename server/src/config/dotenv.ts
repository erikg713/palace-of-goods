import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Validate required environment variables
const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "JWT_SECRET",
  "MONGODB_URI",
  "PI_API_KEY",
  "PI_SECRET_KEY",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// Export environment variables for use throughout the app
export const env = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET!,
  MONGODB_URI: process.env.MONGODB_URI!,
  PI_API_KEY: process.env.PI_API_KEY!,
  PI_SECRET_KEY: process.env.PI_SECRET_KEY!,
  PI_APP_ID: process.env.PI_APP_ID || "",
  PIONEX_API_KEY: process.env.PIONEX_API_KEY || "",
  ADMIN_WALLET: process.env.ADMIN_WALLET || "",
  LOGGING_CONTRACT: process.env.LOGGING_CONTRACT || "",
};

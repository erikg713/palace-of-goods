import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  appName: "Palace-of-Goods",
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  dbURL: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/palaceofgoods",
  jwtSecret: process.env.JWT_SECRET || "ultra_secure_secret",
  apiBaseURL: process.env.API_BASE_URL || "http://localhost:5000/api",
  piApiKey: process.env.PI_API_KEY || "", // Pi Network API Key
  piAppId: process.env.PI_APP_ID || "",   // Pi App ID
  logLevel: process.env.LOG_LEVEL || "info",
};

console.log(`⚙️  Loaded config for ${config.appName} in ${config.env} mode`);

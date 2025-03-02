import mongoose from "mongoose";
import { logger } from "./utils/logger";
import app from "./app"; // Import app.ts

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    logger.info("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("❌ Database Connection Failed:", err);
    process.exit(1);
  });

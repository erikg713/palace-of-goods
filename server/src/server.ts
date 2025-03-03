import express from "express";
import path from "path";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { env } from "./config/dotenv";
import app from "./app"; // Import the Express app instance

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // ✅ Connect to Database
    await connectDB();

    // ✅ Serve static files from React frontend
    app.use(express.static(path.join(__dirname, "../client/build")));

    // ✅ Serve the service worker properly
    app.get("/service-worker.js", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build/service-worker.js"));
    });

    // ✅ Start Express Server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

// ✅ Start the server
startServer();

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { env } from "./config/dotenv";
import app from "./app"; // Import your Express App setup

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database (MongoDB or PostgreSQL)
    await connectDB();

    // Serve static files from React build folder
    app.use(express.static(path.join(__dirname, "../client/build")));

    // Explicitly serve service worker
    app.get("/service-worker.js", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build/service-worker.js"));
    });

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

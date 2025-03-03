import express from "express";
import path from "path";
import favicon from "serve-favicon";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";
import { env } from "./config/dotenv";
import app from "./app"; // Import the Express app instance

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // ✅ Connect to Database First
    await connectDB();

    // ✅ Serve the favicon from the "public" folder
    app.use(favicon(path.join(__dirname, "../client/public/favicon.ico")));

    // ✅ Serve static files from React frontend (for development)
    app.use(express.static(path.join(__dirname, "../client/build")));

    // ✅ Handle React App Routing (SPA)
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
    });

    // ✅ Serve the service worker correctly
    app.get("/service-worker.js", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build/service-worker.js"));
    });

    // ✅ Handle missing favicon.ico requests (prevents 404 errors)
    app.get("/favicon.ico", (req, res) => res.status(204).end());

    // ✅ Start Express Server (ONE instance)
    app.listen(PORT, () => {
      logger.info(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

// ✅ Start the server
startServer();

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
    // ✅ Connect to Database
    await connectDB();

    // ✅ Serve the favicon from the "public" folder
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    // ✅ Serve static files (CSS, JS, Images, etc.)
    app.use(express.static(path.join(__dirname, "public")));

    // ✅ Example route
    app.get("/", (req, res) => {
      res.send(`
        <h1>WELCOME 2 PALACE OF GOODS!!!</h1>
        <p>Your favicon should appear in the browser tab.</p>
      `);
    });

    // ✅ Handle missing favicon.ico requests (prevents 404 errors)
    app.get("/favicon.ico", (req, res) => res.status(204).end());

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

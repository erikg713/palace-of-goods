import mongoose from "mongoose";
import { logger } from "./utils/logger";
import app from "./app"; // Import app.ts
import express from 'express';
import path from 'path';
import express from "express";
import { connectDB } from "./config/db";
import { env } from "./config/dotenv";

const app = express();

// Connect to DB
connectDB();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Route to serve the service worker correctly
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/service-worker.js'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
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
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Explicitly serve the service worker correctly
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/service-worker.js'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

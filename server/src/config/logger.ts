import winston from "winston";
import { config } from "./index";

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    ...(config.env === "production"
      ? [new winston.transports.File({ filename: "logs/server.log" })]
      : []),
  ],
});

export { logger };

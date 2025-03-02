import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

// Custom Error Interface
interface CustomError extends Error {
  status?: number;
}

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`🔥 Error: ${err.message} | Route: ${req.method} ${req.originalUrl}`);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    error: message,
  });
};

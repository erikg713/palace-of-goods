import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Extend Request type
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; role: string };
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Role-based middleware
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

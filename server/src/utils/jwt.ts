
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ultra_secure_secret";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

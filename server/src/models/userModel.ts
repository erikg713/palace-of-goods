import pool from "../utils/db";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

// Hash password before saving
export const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.username, user.email, hashedPassword]
  );
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

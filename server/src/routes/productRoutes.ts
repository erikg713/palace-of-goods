import express, { Router, Request, Response } from 'express';
import Product from '../models/Product';
import express from "express";
import pool from "../utils/db";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

export default router;
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// ... other routes (POST, PUT, DELETE)

export default router;
import express from "express";
import pool from "../utils/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

export default router;

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
import express, { Request, Response } from "express";
import Product from "../models/Product";
import { authenticateJWT } from "../middleware/auth";
import { AuthRequest } from "../types/auth"; // Custom request type with `user`
import { Product as ProductType } from "../types/product"; // Product interface

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product (Authenticated Users Only)
 * @access  Private
 */
router.post("/", authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
      sellerId: req.user.id, // Ensure `user` exists in `req`
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product", details: error.message });
  }
});

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products: ProductType[] = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product", details: error.message });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Only Seller Can Delete)
 * @access  Private
 */
router.delete("/:id", authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Ensure only the seller can delete
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", details: error.message });
  }
});

export default router;

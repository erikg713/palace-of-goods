import express, { Request, Response } from "express";
import Product from "../models/Product";
import { authenticateJWT } from "../middleware/auth";
import { AuthRequest } from "../types/auth"; // Custom request type with `user`
import { Product as ProductType } from "../types/product"; // Product interface

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product (Authenticated Users Only)
 * @access  Private (Only Sellers)
 */
router.post("/", authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    // Only allow sellers to create products
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Only sellers can create products" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
      sellerId: req.user.id,
    });

    res.status(201).json({ success: true, message: "Product created", data: newProduct });
  } catch (error: any) {
    console.error("❌ Error creating product:", error.message);
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
    res.json({ success: true, data: products });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.message);
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

    res.json({ success: true, data: product });
  } catch (error: any) {
    console.error("❌ Error fetching product:", error.message);
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
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting product:", error.message);
    res.status(500).json({ error: "Error deleting product", details: error.message });
  }
});

export default router;

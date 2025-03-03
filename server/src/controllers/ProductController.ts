import { Request, Response } from "express";
import Product from "../models/Product";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Sellers Only)
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    if (!req.user || req.user.role !== "seller") {
      return res.status(403).json({ success: false, error: "Only sellers can create products" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
      sellerId: req.user.id,
    });

    res.status(201).json({ success: true, message: "Product created", data: product });
  } catch (error: any) {
    console.error("❌ Error creating product:", error.message);
    res.status(500).json({ success: false, error: "Error creating product" });
  }
};

/**
 * @desc    Get all products with optional search & pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const filter: any = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ success: true, data: products });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ success: false, error: "Error fetching products" });
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    res.json({ success: true, data: product });
  } catch (error: any) {
    console.error("❌ Error fetching product:", error.message);
    res.status(500).json({ success: false, error: "Error fetching product" });
  }
};

/**
 * @desc    Update a product (Sellers Only)
 * @route   PUT /api/products/:id
 * @access  Private (Sellers Only)
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "seller") {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, message: "Product updated", data: product });
  } catch (error: any) {
    console.error("❌ Error updating product:", error.message);
    res.status(500).json({ success: false, error: "Error updating product" });
  }
};

/**
 * @desc    Delete a product (Sellers Only)
 * @route   DELETE /api/products/:id
 * @access  Private (Sellers Only)
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "seller") {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    await product.deleteOne();
    res.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.error("❌ Error deleting product:", error.message);
    res.status(500).json({ success: false, error: "Error deleting product" });
  }
};

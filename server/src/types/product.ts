import express, { Request, Response } from "express";
import Product from "../models/Product";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;
    const sellerId = req.user?.id; // Ensure `user` exists in `req`

    const newProduct = await Product.create({ name, description, price, image, category, sellerId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
});

router.get("/:id", async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "Product not found" });
});

router.delete("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product?.sellerId !== req.user?.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await product?.destroy();
  res.json({ message: "Product deleted" });
});

export default router;

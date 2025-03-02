router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1", [userId]);
    
    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});
import express, { Request, Response } from "express";
import Order from "../models/Order";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

// Create Order after Pi Payment Success
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { products, totalPrice, transactionId } = req.body;
    const userId = req.user?.id;

    const newOrder = await Order.create({
      userId,
      products: JSON.stringify(products),
      totalPrice,
      status: "completed",
      transactionId, // Store Pi transaction ID
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error storing order" });
  }
});

// Get User's Orders
router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  const orders = await Order.findAll({ where: { userId: req.user?.id } });
  res.json(orders);
});

// Get Seller's Orders (Admin/Seller Only)
router.get("/seller", authenticateJWT, async (req: Request, res: Response) => {
  const orders = await Order.findAll();
  res.json(orders);
});

export default router;

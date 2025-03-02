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
import express, { Request, Response } from "express";
import Order from "../models/Order";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

// Get all orders (Admin/Seller Only)
router.get("/admin", authenticateJWT, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin" && req.user?.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }

  const orders = await Order.findAll();
  res.json(orders);
});

// Update Order Status (Admin Only)
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (req.user?.role !== "admin" && req.user?.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }

  order.status = req.body.status;
  await order.save();
  res.json(order);
});

export default router;

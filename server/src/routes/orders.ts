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
import { cancelPionexTrade } from "../services/pionexLogging";

router.post("/cancel/:id", authenticateJWT, async (req: Request, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status !== "pending") {
    return res.status(400).json({ error: "Only pending orders can be canceled" });
  }

  if (order.transactionId) {
    // If order is a Pionex trade, attempt to cancel it
    const tradeCanceled = await cancelPionexTrade(order.transactionId);
    if (!tradeCanceled) return res.status(500).json({ error: "Failed to cancel Pionex trade" });
  }

  // Mark order as canceled
  order.status = "canceled";
  await order.save();

  res.json({ message: "Order canceled" });
});
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
import express, { Request, Response } from "express";
import Order from "../models/Order";
import { authenticateJWT } from "../middleware/auth";
import { verifyPiTransaction, refundPiTransaction } from "../services/piVerification";
import Web3 from "web3";

const router = express.Router();
const web3 = new Web3("https://rpc-mumbai.maticvigil.com");

// Cancel Order & Process Refund
router.post("/cancel/:id", authenticateJWT, async (req: Request, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  // Only allow cancellation for pending orders
  if (order.status !== "pending") {
    return res.status(400).json({ error: "Only pending orders can be canceled" });
  }

  // Verify Pi Network Transaction
  if (order.transactionId && !(await verifyPiTransaction(order.transactionId))) {
    return res.status(400).json({ error: "Pi transaction verification failed" });
  }

  // Refund the user via Pi Network
  const refundSuccess = await refundPiTransaction(order.transactionId);
  if (!refundSuccess) {
    return res.status(500).json({ error: "Failed to refund Pi transaction" });
  }

  // Log cancellation on Web3
  const transaction = await web3.eth.sendTransaction({
    from: process.env.ADMIN_WALLET,
    to: process.env.LOGGING_CONTRACT,
    value: web3.utils.toWei("0.001", "ether"),
    data: web3.utils.utf8ToHex(`Order ${order.id} canceled & refunded on Pi Network`),
  });

  // Mark order as canceled
  order.status = "canceled";
  await order.save();

  res.json({ message: "Order canceled and refunded", txHash: transaction.transactionHash });
});

export default router;
if (order.transactionId) {
  const isVerified = await verifyPiTransaction(order.transactionId);
  if (!isVerified) {
    return res.status(400).json({ error: "Pi transaction verification failed" });
  }
}

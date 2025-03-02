import express, { Request, Response } from "express";
import Order from "../models/Order";
import { authenticateJWT } from "../middleware/auth";
import { verifyPiTransaction, refundPiTransaction } from "../services/piVerification";
import { cancelPionexTrade } from "../services/pionexLogging";
import Web3 from "web3";

const router = express.Router();
const web3 = new Web3("https://rpc-mumbai.maticvigil.com");

// 🔹 Place Order After Pi Payment Success
router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { products, totalPrice, transactionId } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const newOrder = await Order.create({
      userId,
      products: JSON.stringify(products),
      totalPrice,
      status: "completed",
      transactionId, // Store Pi transaction ID
    });

    res.status(201).json({ success: true, message: "Order created", data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error storing order" });
  }
});

// 🔹 Get User's Orders
router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  const orders = await Order.findAll({ where: { userId: req.user?.id } });
  res.json({ success: true, data: orders });
});

// 🔹 Get Seller/Admin Orders
router.get("/seller", authenticateJWT, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin" && req.user?.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }
  const orders = await Order.findAll();
  res.json({ success: true, data: orders });
});

// 🔹 Get All Orders (Admin Only)
router.get("/admin", authenticateJWT, async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  const orders = await Order.findAll();
  res.json({ success: true, data: orders });
});

// 🔹 Cancel Order (Only Pending Orders)
router.post("/cancel/:id", authenticateJWT, async (req: Request, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status !== "pending") {
    return res.status(400).json({ error: "Only pending orders can be canceled" });
  }

  // Handle Pionex Trade Cancellation
  if (order.transactionId && order.status === "pionex") {
    const tradeCanceled = await cancelPionexTrade(order.transactionId);
    if (!tradeCanceled) return res.status(500).json({ error: "Failed to cancel Pionex trade" });
  }

  // Handle Pi Network Refund
  if (order.transactionId) {
    const isVerified = await verifyPiTransaction(order.transactionId);
    if (!isVerified) return res.status(400).json({ error: "Pi transaction verification failed" });

    const refundSuccess = await refundPiTransaction(order.transactionId);
    if (!refundSuccess) {
      return res.status(500).json({ error: "Failed to refund Pi transaction" });
    }
  }

  // Optional: Web3 Logging
  if (process.env.ADMIN_WALLET && process.env.LOGGING_CONTRACT) {
    const transaction = await web3.eth.sendTransaction({
      from: process.env.ADMIN_WALLET,
      to: process.env.LOGGING_CONTRACT,
      value: web3.utils.toWei("0.001", "ether"),
      data: web3.utils.utf8ToHex(`Order ${order.id} canceled & refunded on Pi Network`),
    });

    console.log("Web3 Log:", transaction.transactionHash);
  }

  // Mark order as canceled
  order.status = "canceled";
  await order.save();

  res.json({ success: true, message: "Order canceled & refunded" });
});

// 🔹 Update Order Status (Admin Only)
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (req.user?.role !== "admin" && req.user?.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }

  order.status = req.body.status;
  await order.save();
  res.json({ success: true, message: "Order updated", data: order });
});

export default router;

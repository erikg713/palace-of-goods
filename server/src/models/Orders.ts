import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import express, { Request, Response } from "express";
import Order from "../models/Order";
import { authenticateJWT } from "../middleware/auth";
import { verifyPiTransaction } from "../services/piVerification";
import Web3 from "web3";
import { logPionexTrade } from "../services/pionexLogging";

const router = express.Router();
const web3 = new Web3("https://rpc-mumbai.maticvigil.com"); // Replace with Mainnet RPC if needed
router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (req.user?.role !== "admin" && req.user?.role !== "seller") {
      return res.status(403).json({ error: "Access denied" });
    }

    // If the order is related to Pionex trading, log the trade
    if (order.transactionId) {
      const tradeHash = await logPionexTrade(order.transactionId);
      if (!tradeHash) return res.status(400).json({ error: "Pionex trade verification failed" });
    }

    // Update order and log in Web3
    const transaction = await web3.eth.sendTransaction({
      from: process.env.ADMIN_WALLET,
      to: process.env.LOGGING_CONTRACT,
      value: web3.utils.toWei("0.001", "ether"),
      data: web3.utils.utf8ToHex(`Order ${order.id} completed on Pionex.US`),
    });

    order.status = req.body.status;
    await order.save();
    res.json({ message: "Order updated", txHash: transaction.transactionHash });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
if (!order) return res.status(404).json({ error: "Order not found" });
const updateOrderStatus = async (order: Order, status: string) => {
  order.status = status;
  await order.save();
};
interface OrderAttributes {
  id: string;
  userId: string;
  products: string;
  totalPrice: number;
  status: "pending" | "completed";
  transactionId?: string;
}

class Order extends Model<OrderAttributes> {}

Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    products: { type: DataTypes.TEXT, allowNull: false }, // Store product IDs as a JSON string
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
    transactionId: { type: DataTypes.STRING, allowNull: true }, // Pi transaction ID
  },
  { sequelize, modelName: "Order" }
);

export default Order;

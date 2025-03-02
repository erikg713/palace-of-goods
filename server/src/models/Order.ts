import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

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

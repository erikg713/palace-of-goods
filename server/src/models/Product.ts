import mongoose, { Schema, Document } from 'mongoose';
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
}

class Product extends Model<ProductAttributes> {}

Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    sellerId: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, modelName: "Product" }
);

export default Product;
interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    // ... other properties
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // ... other properties
});

export default mongoose.model<IProduct>('Product', ProductSchema);

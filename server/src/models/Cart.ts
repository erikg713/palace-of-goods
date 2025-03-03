import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true,
});

export const Cart = model('Cart', CartSchema);

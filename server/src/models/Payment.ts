import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, {
  timestamps: true,
});

export const Payment = model('Payment', PaymentSchema);

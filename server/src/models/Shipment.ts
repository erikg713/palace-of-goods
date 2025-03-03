import { Schema, model } from 'mongoose';

const ShipmentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  trackingNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'returned'], default: 'pending' }
}, {
  timestamps: true,
});

export const Shipment = model('Shipment', ShipmentSchema);

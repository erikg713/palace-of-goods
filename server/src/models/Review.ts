import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, {
  timestamps: true,
});

export const Review = model('Review', ReviewSchema);

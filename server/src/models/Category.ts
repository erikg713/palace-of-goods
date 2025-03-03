import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, unique: true, required: true }
}, {
  timestamps: true,
});

export const Category = model('Category', CategorySchema);

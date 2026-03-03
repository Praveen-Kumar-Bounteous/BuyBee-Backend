import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  total_price: { type: Number, required: true }
}, { _id: false });

const cartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [itemSchema]
}, { timestamps: true });

export const Cart = model('Cart', cartSchema);
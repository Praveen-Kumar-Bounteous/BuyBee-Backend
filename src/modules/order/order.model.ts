// schema

import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  payment_method: { type: String, required: true },
  expected_delivery: { type: Date, required: true },
  shipping_address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  items: [orderItemSchema]
}, { timestamps: true });

export const Order = model('Order', orderSchema);
import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  product_img: String,
  price: { type: Number, required: true },
  seller_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Product = model('Product', ProductSchema);
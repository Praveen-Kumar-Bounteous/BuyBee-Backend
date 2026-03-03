import { Types } from 'mongoose';

export interface ICartItem {
  product_id: Types.ObjectId | string;
  quantity: number;
  total_price: number;
}

export interface ICart {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId | string;
  items: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
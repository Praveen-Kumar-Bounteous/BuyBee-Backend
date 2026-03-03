import { Types } from 'mongoose';
import type { IAddress } from '../auth/auth.interface.js';
import type { ICartItem } from '../cart/cart.interface.js';

export interface IOrder {
  _id?: Types.ObjectId;
  user_id: Types.ObjectId | string;
  items: ICartItem[];
  payment_method: string;
  expected_delivery: string | Date;
  shipping_address: IAddress; // Snapshot of the address at time of order
  createdAt?: Date;
  updatedAt?: Date;
}
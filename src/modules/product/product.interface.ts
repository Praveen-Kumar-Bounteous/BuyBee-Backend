import { Types } from 'mongoose';

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  description?: string | null;
  product_img?: string | null; 
  price: number;
  seller_id: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
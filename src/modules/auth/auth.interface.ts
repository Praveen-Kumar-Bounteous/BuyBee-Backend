// auth.interface.ts

import { Types } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: 'seller' | 'buyer';
  addresses: IAddress[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  id: string;
  role: string;
}
// src/modules/user/user.model.ts

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Hide password by default
  role: { type: String, enum: ['seller', 'buyer'], default: 'buyer' },
  addresses: [{
    street: String, city: String, state: String, country: String, pincode: String
  }]
}, { timestamps: true });

export const User = model('User', userSchema);
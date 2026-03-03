//token.model.ts

import { Schema, model, Types } from 'mongoose';

const refreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Auto-delete after 7 days
});

export const RefreshToken = model('RefreshToken', refreshTokenSchema);
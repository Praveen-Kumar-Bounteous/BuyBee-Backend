import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import { RefreshToken } from './token.model.js';
import type { IUser, ILoginResponse } from './auth.interface.js';

export class AuthService {
  // Create User - Using IUser interface
  static async registerUser(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    // Returning the result as IUser
    const result = await User.create({ ...userData, password: hashedPassword });
    return result as unknown as IUser;
  }

  // Login Logic - Using ILoginResponse interface
  static async login(email: string, pass: string): Promise<ILoginResponse> {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_ACCESS_SECRET!, 
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_REFRESH_SECRET!, 
      { expiresIn: '7d' }
    );

    // Store Refresh Token in separate collection
    await RefreshToken.create({ userId: user._id, token: refreshToken });

    // Ensure return matches ILoginResponse exactly
    return { 
        user: user as unknown as IUser, 
        accessToken, 
        refreshToken 
    };
  }

  // Logout Logic
  static async logout(token: string) {
    return await RefreshToken.findOneAndDelete({ token });
  }
}
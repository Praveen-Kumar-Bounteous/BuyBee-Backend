import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import type { ILoginResponse } from './auth.interface.js';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      // Passes req.body directly to service which is now type-checked
      const user = await AuthService.registerUser(req.body);
      res.status(201).json({ 
        message: "User created successfully", 
        data: {
            name: user.name,
            email: user.email,
            role: user.role
        }
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response: ILoginResponse = await AuthService.login(email, password);

      // Send RT in a secure cookie
    //   ensure that your cookies are only sent over HTTPS when the app is live.
      res.cookie('refreshToken', response.refreshToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send AT and user details in body
      res.status(200).json({ 
        accessToken: response.accessToken, 
        user: {
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            addresses: response.user.addresses
        }
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      // Check both body and cookies for the refresh token
      const token = req.body.refreshToken || req.cookies.refreshToken;
      
      if (token) {
        await AuthService.logout(token);
      }
      
      res.clearCookie('refreshToken');
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Logout failed" });
    }
  }
}
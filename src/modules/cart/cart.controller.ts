// Handles the request and ensures only the Buyer role interacts with their own cart.

import type { Request, Response } from 'express';
import { CartService } from './cart.service.js';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export class CartController {
  static async getCart(req: AuthRequest, res: Response) {
    try {
      const cart = await CartService.getCartByUserId(req.user!.id);
      res.status(200).json({ success: true, data: cart || { items: [] } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async addItem(req: AuthRequest, res: Response) {
    try {
        console.log("BODY:", req.body);
console.log("USER:", req.user);
      const { product_id, quantity } = req.body;
      const cart = await CartService.addToCart(req.user!.id, product_id, quantity || 1);
      res.status(200).json({ success: true, data: cart });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async clear(req: AuthRequest, res: Response) {
    try {
      await CartService.clearCart(req.user!.id);
      res.status(200).json({ message: "Cart cleared" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
// Handles the checkout request and user verification.

import type { Request, Response } from 'express';
import { OrderService } from './order.service.js';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export class OrderController {
  static async checkout(req: AuthRequest, res: Response) {
    try {
      const { payment_method, shipping_address } = req.body;
      
      if (!payment_method || !shipping_address) {
        return res.status(400).json({ message: "Missing payment method or shipping address" });
      }

      const order = await OrderService.placeOrder(
        req.user!.id, 
        payment_method, 
        shipping_address
      );

      res.status(201).json({ success: true, data: order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const orders = await OrderService.getOrderHistory(req.user!.id);
      res.status(200).json({ success: true, data: orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
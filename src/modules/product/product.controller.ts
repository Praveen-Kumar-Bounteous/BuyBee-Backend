// src/modules/product/product.controller.ts

import type { Request, Response } from 'express';
import { ProductService } from './product.service.js';

// Corporate standard: Use Generics to define the URL parameters strictly
// Request<{ id: string }> ensures req.params.id is always a string
interface AuthRequest extends Request<{ id: string }> {
  user?: {
    id: string;
    role: string;
  };
}

export class ProductController {
  static async create(req: AuthRequest, res: Response) {
    try {
      // req.user!.id is safe because of 'authenticate' middleware
      const product = await ProductService.createProduct(req.body, req.user!.id);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      // Because of Request<{ id: string }>, req.params.id is now strictly a string
      const result = await ProductService.updateProduct(req.params.id, req.user!.id, req.body);
      
      if (!result) return res.status(404).json({ message: "Product not found or unauthorized" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const result = await ProductService.deleteProduct(req.params.id, req.user!.id);
      
      if (!result) return res.status(404).json({ message: "Product not found or unauthorized" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  static async listAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}